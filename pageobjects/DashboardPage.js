class DashboardPage {

    constructor(page){
        this.page = page;
        this.usernameText = "//span[contains(text(),'USERNAME')]";
        this.addTaskLink = page.locator("//span[text()='Add task']");
        this.taskName = page.locator("//div[@aria-label='Task name']");
        this.taskDescription = page.locator("//p[@data-placeholder='Description']");
        this.addTaskButton = page.locator("//button[contains(@data-testid,'task')]");
        this.taskNameText = "//div[@class='task_content' and text()='TASKNAME']";
        this.moreActionsButton = page.locator("//div[@data-testid='button-container']//button[@aria-label='More actions']");
        this.deleteTaskLink = page.locator("//div[contains(text(),'Delete')]");
        this.confirmDeleteButton = page.locator("//button//span[contains(text(),'Delete')]");

    }

    /**
     * Verify if the username is displayed in the dashboard page, if the user name is displayed is because the login was successfully.
     * @param {*} username expected in the dashboard.
     * @returns true if username is displayed false if its not.
     */
    async isDashboardVisible(username){
        username = username.split('@')[0];
        this.usernameText = this.usernameText.replace("USERNAME", username);
        console.log(this.usernameText);
        await this.page.waitForSelector(this.usernameText, { timeout: 60000 });
        const visible = ( await this.page.locator(this.usernameText).isVisible());
        return visible
    }

    /**
     * @param {*} taskName name for the task
     * @param {*} taskDescription description for the task
     * @returns true if the task was created successfully and the task is displayed on the dasboard, false if its not.
     */
    async createNewTask(taskName, taskDescription){
        await this.addTaskLink.click();
        await this.taskName.fill(taskName);
        await this.taskDescription.fill(taskDescription);
        await this.addTaskButton.click();
        this.taskNameText = this.taskNameText.replace("TASKNAME", taskName);
        await this.page.waitForTimeout(1000);
        const visible = ( await this.page.locator(this.taskNameText).isVisible());
        return visible 
    }

    /**
     * Delete a taks by task name
     * @param {*} taskName name of the task
     */
    async deleteTask(taskName){
        this.taskNameText = this.taskNameText.replace("TASKNAME", taskName);
        await this.page.waitForSelector(this.taskNameText, { state: 'visible' });
        await this.page.click(this.taskNameText);
        await this.moreActionsButton.waitFor({state: 'visible'});
        await this.page.waitForTimeout(1000);
        await this.moreActionsButton.click();
        await this.deleteTaskLink.waitFor({state: 'visible'});
        await this.deleteTaskLink.click();
        await this.confirmDeleteButton.waitFor({state: 'visible'});
        await this.confirmDeleteButton.click();
        this.taskNameText = this.taskNameText.replace(taskName, "TASKNAME");
    }

}

module.exports = {DashboardPage};