const { DashboardPage } = require("./DashboardPage");
const { LoginPage } = require("./LoginPage");
const { MainPage } = require("./MainPage");

class POManager{

    constructor(page){
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.mainPage = new MainPage(page);
        this.dashboardPage = new DashboardPage(page);
    }

    getLoginPage(){
        return this.loginPage;
    }

    getMainPage(){
        return this.mainPage;
    }

    getDashboardPage(){
        return this.dashboardPage;
    }

}

module.exports = {POManager};