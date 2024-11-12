const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');

async function testLoginIncognito(email, password, attempt,isCredentialCorrect) {

    // Set up Chrome options for incognito mode
    let options = new chrome.Options();
    options.addArguments('--incognito');

    // Initialize the browser in incognito mode
    let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
    let no=0;
    try {
        // Navigate to the login page
        await driver.get('http://localhost:3000'); // Replace with the actual login page URL
        driver.sleep(10000);
        // Wait and select the email/username field
        let usernameField = await driver.wait(until.elementLocated(By.id('identifier'), 5000)); // Replace with correct selector
        await usernameField.sendKeys(email);
         // Use email from array
        driver.sleep(10000);
        let loginButton = await driver.wait(until.elementLocated(By.xpath("//button[contains(text(), 'Continue')]")), 5000); // Replace with correct selector
        await loginButton.click();
        takeSShot(driver, attempt,++no,isCredentialCorrect);
        driver.sleep(10000);
        // Wait and select the password field
        let passwordField = await driver.wait(until.elementLocated(By.id('password')), 5000); // Replace with correct selector
        await passwordField.sendKeys(password); // Use password from array
        driver.sleep(10000);

        // Wait and select the submit/login button again
        loginButton = await driver.wait(until.elementLocated(By.xpath("//button[contains(text(), 'Login')]")), 5000); // Replace with correct selector
        await loginButton.click();
        takeSShot(driver,  attempt,++no,isCredentialCorrect);
        await driver.sleep(5000);
        takeSShot(driver,  attempt,++no,isCredentialCorrect);
        // Check the current URL to verify login success
        let newUrl = await driver.getCurrentUrl();
        console.log(`Attempt ${attempt}: Logged in, current URL:`, newUrl);

        if (newUrl.includes('profile')) { // Adjust based on expected post-login URL
            console.log(`Attempt ${attempt}: Login was successful.`);
            takeSShot(driver, attempt,++no,isCredentialCorrect);
        } else {
            console.log(`Attempt ${attempt}: Login failed.`);
            takeSShot(driver, attempt,++no,isCredentialCorrect);
        }

    } catch (error) {
        console.error(`Attempt ${attempt}: Error during login test:`, error);
    } finally {
        // Quit the browser session
        await driver.quit();
    }
}

async function takeSShot(driver, attempt, no,isCredentialCorrect) {
     let screenshot = await driver.takeScreenshot();
     if(isCredentialCorrect){
     fs.writeFileSync(`./ss/login_attempt_${attempt}_${no}_correctcredential.png`, screenshot, 'base64'); }
     else{
        fs.writeFileSync(`./ss/login_attempt_${attempt}_${no}_wrongcredential.png`, screenshot, 'base64');
     }
}

async function runLoginTests() {
    let j=0;
    // Array of email-password combinations to test
    const credentials = [
        { email: 'priyanshu9836@gmail.com', password: '123456' ,isCredentialCorrect: true},
        { email: 'priyanshu9836@gmail.com', password: '123' ,isCredentialCorrect: false},
        // Add more combinations as needed
    ];

    // Loop through each credential set and perform the test
    for (let i = 0; i < credentials.length; i++) {
        const { email, password ,isCredentialCorrect} = credentials[i];
        await testLoginIncognito(email, password, i + 1,isCredentialCorrect); // Pass email, password, and attempt number
    }
}

runLoginTests();
