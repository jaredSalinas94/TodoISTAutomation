const { test, expect } = require("@playwright/test");
const {POManager} = require('../pageobjects/POManager');
const {DateUtils} = require('../utils/DateUtils');
const data = JSON.parse(JSON.stringify(require('../dataset/logInDataset.json')));
import dotenv from 'dotenv';
let mainPage = null;
dotenv.config();

test.beforeEach(async ({ page }) => {
    const poManager = new POManager(page);
    mainPage = poManager.getMainPage();
    await mainPage.goTo();
  });

test.skip('Sign Up', async ({page})=>{
    const title = (await mainPage.getTitle());
    console.log(title);
    expect("Todoist | A To-Do List to Organize Your Work & Life",title);
    const username = "test" + DateUtils.getFormattedDate() + "@test.com";
    const password = "Admin12345!";
    const loginPage = (await mainPage.goToLogInPage(page));
    const dashboardPage = (await loginPage.signUp(username, password, page));
    const isVisible = (await dashboardPage.isDashboardVisible(username));
    console.log(isVisible);
});

test('Login into application successfully', async({page})=>{
    await mainPage.goTo();
    const loginPage = (await mainPage.goToLogInPage(page));
    const dashboardPage = (await loginPage.logIn(process.env.email, process.env.password, page));
    const isVisible = (await dashboardPage.isDashboardVisible(process.env.email));
    expect(isVisible,"ERROR: the dashboard page is not visible");
});

test('Invalid Password', async({page})=>{
    await mainPage.goTo();
    const loginPage = (await mainPage.goToLogInPage(page));
    await loginPage.logIn(data[2].email, data[2].password, page);
    const isVisible = (await loginPage.isNotAValidPasswordTextIsDisplayed());
    expect(isVisible,"ERROR: 'Passwords must be at least 8 characters long.' message is not displayed");

});

test('Email Address is not valid', async({page})=>{
    await mainPage.goTo();
    const loginPage = (await mainPage.goToLogInPage(page));
    await loginPage.logIn(data[1].email, data[1].password, page);
    const isVisible = (await loginPage.isEnterAValidEmailAddressDisplayed());
    expect(isVisible,"ERROR: 'Please enter a valid email address.' message is not displayed");

});

test('Log in with wrong user data', async({page})=>{
    await mainPage.goTo();
    const loginPage = (await mainPage.goToLogInPage(page));
    await loginPage.logIn(data[0].email, data[0].password, page);
    const isVisible = (await loginPage.isWrongEmailOrPasswordTextIsDisplayed());
    expect(isVisible,"ERROR: 'Wrong email or password.' message is not displayed");
});

test('Log in with blank data', async({page})=>{
    await mainPage.goTo();
    const loginPage = (await mainPage.goToLogInPage(page));
    await loginPage.logIn(data[3].email, data[3].password, page);
    const isVisible = (await loginPage.isWrongEmailOrPasswordTextIsDisplayed());
    expect(isVisible,"ERROR: 'Wrong email or password.' message is not displayed");
});