const selectors = require('../selectors');

class LoginPage {
  get homeLoginButton() {
    return $(selectors.login.homeLogin);
  }

  get title() {
    return $(selectors.login.title);
  }

  get email() {
    return $(selectors.login.email);
  }

  get password() {
    return $(selectors.login.password);
  }

  get submitButton() {
    return $(selectors.login.submit);
  }

  get requiredError() {
    return $(selectors.login.requiredError);
  }

  get invalidEmailError() {
    return $(selectors.login.invalidEmailError);
  }

  get credentialsError() {
    return $(selectors.login.credentialsError);
  }

  get successDestination() {
    return $(selectors.login.successDestination);
  }

  get passwordVisibilityToggle() {
    return $(selectors.login.passwordVisibilityToggle);
  }

  get serverErrorBanner() {
    return $(selectors.login.serverErrorBanner);
  }

  get serverErrorIcon() {
    return $(selectors.login.serverErrorIcon);
  }

  get dismissServerErrorBanner() {
    return $(selectors.login.dismissServerErrorBanner);
  }

  get forgotPasswordLink() {
    return $(selectors.login.forgotPassword);
  }

  get liveChatLink() {
    return $(selectors.login.liveChat);
  }

  get liveChatDestination() {
    return $(selectors.login.liveChatDestination);
  }

  get signUpLink() {
    return $(selectors.login.signUp);
  }

  async open() {
    const backButton = $(selectors.backButton);

    for (let attempt = 0; attempt < 3; attempt += 1) {
      if (await this.email.isDisplayed()) {
        return;
      }
      if (await this.homeLoginButton.isDisplayed()) {
        await this.homeLoginButton.click();
        await expect(this.title).toBeDisplayed();
        return;
      }
      if (!(await backButton.isDisplayed())) {
        break;
      }
      await backButton.click();
    }

    await expect(this.title).toBeDisplayed();
  }

  async submitEmptyForm() {
    await this.submitButton.click();
  }

  async enterCredentials(email, password) {
    await this.email.setValue(email);
    await this.password.setValue(password);
  }

  async openForgotPassword() {
    await this.forgotPasswordLink.click();
  }

  async openSignUp() {
    await this.signUpLink.click();
  }
}

module.exports = new LoginPage();
