const fs = require('node:fs');
const path = require('node:path');
const loginPage = require('../pages/LoginPage');
const forgotPasswordPage = require('../pages/ForgotPasswordPage');
const testData = require('../test-data');

describe('Forgot Password', () => {
  it('opens the recovery screen and validates an empty submission', async () => {
    const screenshotsDir = path.resolve(__dirname, '../../screenshots');
    fs.mkdirSync(screenshotsDir, { recursive: true });

    await loginPage.open();
    await expect(loginPage.title).toBeDisplayed();
    await browser.saveScreenshot(path.join(screenshotsDir, 'forgot-password-login-screen.png'));
    await loginPage.openForgotPassword();
    await expect(forgotPasswordPage.title).toBeDisplayed();
    await expect(forgotPasswordPage.contact).toBeDisplayed();
    await browser.saveScreenshot(path.join(screenshotsDir, 'forgot-password-screen.png'));

    await expect(forgotPasswordPage.contact).toHaveValue(testData.forgotPassword.contact);
    await forgotPasswordPage.submitEmptyForm();

    await expect(forgotPasswordPage.validationError).toBeDisplayed();
    await expect(forgotPasswordPage.validationError).toHaveText(
      testData.forgotPassword.validationMessage
    );
    await browser.saveScreenshot(path.join(screenshotsDir, 'forgot-password-validation.png'));
  });
});
