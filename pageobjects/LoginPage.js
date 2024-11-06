const {DashboardPage} = require('../pageobjects/DashboardPage');

class LoginPage {

    constructor(page) {
        this.page = page;
        this.emailInput = page.locator("//input[@type='email']");
        this.passwordInput = page.locator("//input[@type='password']");
        this.signUpButton = page.locator("button[type='submit']");
        this.signUpLink = page.locator("//a[normalize-space()='Sign up']");
        this.wrongEmailPasswordText = page.locator("//div[contains(text(),'Wrong email or password.')]");
        this.passwordErrorText = page.locator("//p[contains(text(),'Passwords must be at least 8 characters long.')]");
        this.enterValidEmailText = page.locator("//div[contains(text(),'Please enter a valid email address.')]");
    }

    /**
     * Create a new user in the ToDo Ist
     * @param {*} username email address  
     * @param {*} password password
     * @param {*} page the page instance
     * @returns A dashboardPage instance
     */
    async signUp(username, password, page){
        await this.signUpLink.click();
        await this.emailInput.fill(username);
        await this.passwordInput.fill(password);
        await this.signUpButton.click();
        return new DashboardPage(page); 
    }

    /**
     * Login in the ToDo Ist page
     * @param {*} username 
     * @param {*} password 
     * @param {*} page 
     * @returns A dashboardPage instance
     */
    async logIn(username, password, page){
        await this.emailInput.fill(username);
        await this.passwordInput.fill(password);
        await this.signUpButton.click(); 
        return new DashboardPage(page);    
    }

    /**
     * Check that 'Wrong email or password.' error message is displayed
     * @returns A boolean value true if the message is visible, false if its not
     */
    async isWrongEmailOrPasswordTextIsDisplayed(){
        const visible = ( await this.wrongEmailPasswordText.isVisible());
        return visible
    }

    /**
     * Check that 'Passwords must be at least 8 characters long.' error message is displayed
     * @returns A boolean value true if the message is visible, false if its not
     */
    async isNotAValidPasswordTextIsDisplayed(){
        const visible = ( await this.passwordErrorText.isVisible());
        return visible;
    }

    /**
     * Check that 'Please enter a valid email address.' error message is displayed
     * @returns A boolean value true if the message is visible, false if its not
     */
    async isEnterAValidEmailAddressDisplayed(){
        const visible = ( await this.enterValidEmailText.isVisible());
        return visible;
    }
}

module.exports = {LoginPage};