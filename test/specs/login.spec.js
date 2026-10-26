const selectors = require('../selectors');
const fs = require('node:fs');
const path = require('node:path');
const loginPage = require('../pages/LoginPage');
const forgotPasswordPage = require('../pages/ForgotPasswordPage');
const signUpPage = require('../pages/SignUpPage');
const testData = require('../test-data');

function skipIfMissing(context, ...values) {
  if (values.some((value) => !value)) {
    context.skip();
  }
}

describe('Login', () => {
  afterEach(async function () {
    const testCaseId = this.currentTest?.title.match(/^TC_LOG_\d{2}/)?.[0];
    if (!testCaseId || !browser.sessionId) {
      return;
    }

    const screenshotsDir = path.resolve(__dirname, '../../screenshots/login');
    fs.mkdirSync(screenshotsDir, { recursive: true });
    await browser.saveScreenshot(path.join(screenshotsDir, `${testCaseId}.png`));
  });

  beforeEach(async () => {
    await loginPage.open();
  });

  it('TC_LOG_02: rejects an unregistered email', async function () {
    skipIfMissing(this, selectors.login.credentialsError);

    await loginPage.enterCredentials(
      testData.login.unregisteredCredentials.email,
      testData.login.unregisteredCredentials.password
    );
    await loginPage.submitButton.click();
    await expect(loginPage.credentialsError).toBeDisplayed();
  });

  it('TC_LOG_03: validates an incorrectly formatted email', async function () {
    skipIfMissing(this, selectors.login.invalidEmailError);

    await loginPage.enterCredentials(
      testData.login.invalidEmailCredentials.email,
      testData.login.invalidEmailCredentials.password
    );
    await loginPage.submitButton.click();
    await expect(loginPage.invalidEmailError).toBeDisplayed();
  });

  it('TC_LOG_04: rejects an incorrect password for a registered email', async function () {
    const { email } = testData.login.validCredentials;
    const { incorrectPassword } = testData.login;
    skipIfMissing(this, email, incorrectPassword, selectors.login.credentialsError);

    await loginPage.enterCredentials(email, incorrectPassword);
    await loginPage.submitButton.click();
    await expect(loginPage.credentialsError).toBeDisplayed();
  });

  it('TC_LOG_05: requires an email when the email field is empty', async () => {
    await loginPage.enterCredentials('', testData.login.emptyEmailPassword);
    await loginPage.submitButton.click();
    await expect(loginPage.requiredError).toBeDisplayed();
  });

  it('TC_LOG_06: requires a password when the password field is empty', async () => {
    await loginPage.enterCredentials(testData.login.emptyPasswordEmail, '');
    await loginPage.submitButton.click();
    await expect(loginPage.requiredError).toBeDisplayed();
  });

  it('TC_LOG_07: shows required validation for both empty fields', async () => {
    await loginPage.enterCredentials('', '');
    await loginPage.submitButton.click();
    await expect(loginPage.requiredError).toBeDisplayed();

    const requiredErrorCount = (await $$(selectors.login.requiredError)).length;
    expect(requiredErrorCount).toBeGreaterThanOrEqual(2);
  });

  it('TC_LOG_08: toggles password masking and visibility', async function () {
    skipIfMissing(this, selectors.login.passwordVisibilityToggle);

    await loginPage.password.setValue(testData.login.passwordVisibility);
    await expect(loginPage.password).toHaveAttribute('password', 'true');
    await loginPage.passwordVisibilityToggle.click();
    await expect(loginPage.password).toHaveAttribute('password', 'false');
    await loginPage.passwordVisibilityToggle.click();
    await expect(loginPage.password).toHaveAttribute('password', 'true');
  });

  it('TC_LOG_09: displays the server error banner, icon, and close control', async function () {
    skipIfMissing(
      this,
      selectors.login.serverErrorBanner,
      selectors.login.serverErrorIcon,
      selectors.login.dismissServerErrorBanner
    );

    await expect(loginPage.serverErrorBanner).toBeDisplayed();
    await expect(loginPage.serverErrorBanner).toHaveTextContaining(
      testData.login.expected.serverErrorBannerText
    );
    await expect(loginPage.serverErrorIcon).toBeDisplayed();
    await expect(loginPage.dismissServerErrorBanner).toBeDisplayed();
  });

  it('TC_LOG_10: dismisses the server error banner', async function () {
    skipIfMissing(
      this,
      selectors.login.serverErrorBanner,
      selectors.login.dismissServerErrorBanner
    );
    await expect(loginPage.serverErrorBanner).toBeDisplayed();

    await loginPage.dismissServerErrorBanner.click();
    await expect(loginPage.serverErrorBanner).not.toBeDisplayed();
  });

  it('TC_LOG_11: navigates to Forgot Password', async () => {
    await loginPage.openForgotPassword();
    await expect(forgotPasswordPage.title).toBeDisplayed();
  });

  it('TC_LOG_12: navigates to Live Chat', async function () {
    skipIfMissing(this, selectors.login.liveChat, selectors.login.liveChatDestination);

    await loginPage.liveChatLink.click();
    await expect(loginPage.liveChatDestination).toBeDisplayed();
  });

  it('TC_LOG_13: navigates to Sign Up', async () => {
    await loginPage.openSignUp();
    await expect(signUpPage.title).toBeDisplayed();
  });

  it('TC_LOG_01: logs in with valid registered credentials', async function () {
    const { email, password } = testData.login.validCredentials;
    skipIfMissing(this, email, password, selectors.login.successDestination);

    await loginPage.enterCredentials(email, password);
    await loginPage.submitButton.click();
    await expect(loginPage.successDestination).toBeDisplayed();
  });
});
