const {LoginPage} = require('../pageobjects/LoginPage');

class MainPage {

    constructor (page) {
        this.page = page;
        this.linkLoginLocator = page.locator("//li//a[contains(.,'Log in')]");
    }

    /**
     * Go to landing page
     */
    async goTo(url) {
        await this.page.goto(url);
    }

    /**
     * Go to Login page
     * @param {*} page 
     * @returns an instance for LoginPage
     */
    async goToLogInPage(page) {
        await this.linkLoginLocator.click();
        return new LoginPage(page);
    }

    /**
     * Retrieve a string with the web page's title
     * @returns the title of the web page
     */
    async getTitle() {
        return this.page.title();
    }
}

module.exports = {MainPage};