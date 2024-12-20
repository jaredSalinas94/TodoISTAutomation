const { test, expect } = require("@playwright/test");
const {POManager} = require('../pageobjects/POManager');
const {DateUtils} = require('../utils/DateUtils');
const loginData = JSON.parse(JSON.stringify(require('../dataset/logInDataset.json')));
const taskData = JSON.parse(JSON.stringify(require('../dataset/taskDataset.json')));
const {SlackNotificationUtils} = require('../utils/SlackNotificationsUtils');
import dotenv from 'dotenv';
dotenv.config();
let mainPage = null;

test.beforeEach(async ({ page }) => {
    const poManager = new POManager(page);
    mainPage = poManager.getMainPage();
    await mainPage.goTo(process.env.url);
});

test('Create a new task', async({page})=>{
    const loginPage = (await mainPage.goToLogInPage(page));
    const dashboardPage = (await loginPage.logIn(process.env.email, process.env.password, page));
    await dashboardPage.isDashboardVisible(process.env.email);
    //the data is creating dinamically with the actual date.
    const taskname = taskData[0].name + DateUtils.getFormattedDate();
    const taskDescription = taskData[0].description + DateUtils.getFormattedDate();
    const isTaskVisible = (await dashboardPage.createNewTask(taskname, taskDescription));
    expect(isTaskVisible, taskData[0].errorMessage);
    await dashboardPage.deleteTask(taskname);
    await dashboardPage.isDashboardVisible(process.env.email);
});

test('Create 10 tasks', async({page})=>{
    const loginPage = (await mainPage.goToLogInPage(page));
    const dashboardPage = (await loginPage.logIn(process.env.email, process.env.password, page));
    await dashboardPage.isDashboardVisible(process.env.email);
    //the data is creating dinamically with the actual date.
    for (let index = 0; index < 10; index++) {
        console.log(`Task with Index: ${index}`);
        var taskname = index + taskData[0].name + DateUtils.getFormattedDate();
        var taskDescription = taskData[0].description + DateUtils.getFormattedDate();
        var isTaskVisible = (await dashboardPage.createNewTask(taskname, taskDescription));
        expect(isTaskVisible, taskData[0].errorMessage);
        await dashboardPage.deleteTask(taskname);
    }
});

test.afterEach(async ({page}, testInfo) => {
    const testName = testInfo.title;
    const status = testInfo.status; // 'passed', 'failed', 'skipped'
    console.log(status);
    let message = `The test "${testName}" has ${status}. :smile: ✅`;
    if (status === 'failed') {
      message = `Warning!, the test "${testName}" has FAILED. :sad: ❌`;
    }
    await SlackNotificationUtils.sendSlackNotification(message);
});