const { test, expect } = require("@playwright/test");
const {POManager} = require('../pageobjects/POManager');
const {DateUtils} = require('../utils/DateUtils');
const {SlackNotificationUtils} = require('../utils/SlackNotificationsUtils');
const data = JSON.parse(JSON.stringify(require('../dataset/logInDataset.json')));
import dotenv from 'dotenv';
dotenv.config();
let mainPage = null;

test.beforeEach(async ({ page }) => {
    const poManager = new POManager(page);
    mainPage = poManager.getMainPage();
    await mainPage.goTo(process.env.url);
  });

test('Login into application successfully', async({page})=>{;
    const loginPage = (await mainPage.goToLogInPage(page));
    const dashboardPage = (await loginPage.logIn(process.env.email, process.env.password, page));
    const isVisible = (await dashboardPage.isDashboardVisible(process.env.email));
    expect(isVisible, data[4].errorMessage);
});

test('Check Invalid Password error message', async({page})=>{
    const loginPage = (await mainPage.goToLogInPage(page));
    await loginPage.logIn(data[2].email, data[2].password, page);
    const isVisible = (await loginPage.isNotAValidPasswordTextIsDisplayed());
    expect(isVisible, data[2].errorMessage);
});

test('Check Email Address is not valid error message', async({page})=>{
    const loginPage = (await mainPage.goToLogInPage(page));
    await loginPage.logIn(data[1].email, data[1].password, page);
    const isVisible = (await loginPage.isEnterAValidEmailAddressDisplayed());
    expect(isVisible, data[1].errorMessage);

});

test('Log in with wrong user data throws an error message', async({page})=>{
    const loginPage = (await mainPage.goToLogInPage(page));
    await loginPage.logIn(data[0].email, data[0].password, page);
    const isVisible = (await loginPage.isWrongEmailOrPasswordTextIsDisplayed());
    expect(isVisible, data[0].errorMessage);
});

test('Log in with blank data throws an error message', async({page})=>{
    const loginPage = (await mainPage.goToLogInPage(page));
    await loginPage.logIn(data[3].email, data[3].password, page);
    const isVisible = (await loginPage.isWrongEmailOrPasswordTextIsDisplayed());
    expect(isVisible, data[3].errorMessage);
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