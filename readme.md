# Todo IST Automation Framework

Automation framework for [ToDo Ist](https://todoist.com/) web page
The automation was made in Playwrigth and Javascript.

## Autor

**Jared Salinas**  
[GitHub profile](https://github.com/Rin94)  
[email](mailto:jared.salinas@wizeline.com)

## Tools

[Node.js](https://nodejs.org/en) Download Node.js

[Playwright.dev](https://playwright.dev/docs/intro) Install Playwright

>npm init playwright@latest

## Pre requisites

Run in the terminal, to install another dependencies

>np install

Create a <b>.env</b> file in the project folder with this data:

```
email = emailuser.
password = password.
webhook = webhook url if slack notfications are desired.
```

## Execute Local All test in all browsers

Run in the terminal the following line 

>npx playwright test

## Execute Local All test with a specific browser

Run in the terminal the line with one of this options

<ul><b>chromium</b> for Chrome</ul>
<ul><b>firefox</b> for Firefox</ul>
<ul><b>webkit</b> for Safari</ul>

>npx playwright test --project=<b>browsername</b>

## Execute Local Headed

Run in terminal with one of these options:

>npx playwright test <b>--headed</b>

<br/>

>npx playwright test --project=browsername <b>--headed</b>

## Execute in Browser stack

Create a <b>browserstack.yml</b> file in the project folded

Add these lines as an example in the yml file.

```
userName: YOUR USER NAME
accessKey: YOUR ACCESS KEY

buildName: TodoIst build 

buildIdentifier: '#${BUILD_NUMBER}' # Supports strings along with either/both ${expression}

platforms:
  - os: OS X
    osVersion: Big Sur
    browserName: Chrome
    browserVersion: latest 

parallelsPerPlatform: 1

debug: false # <boolean> # Set to true if you need screenshots for every selenium command ran
networkLogs: false # <boolean> Set to true to enable HAR logs capturing
consoleLogs: errors # <string> Remote browser's console debug levels to be printed (Default: errors)

testObservability: true
```

Then execute with this command.

>npx browserstack-node-sdk playwright test

## Check the report
Run in terminal the following line

> npx playwright show-report