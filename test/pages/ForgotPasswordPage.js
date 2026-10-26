const selectors = require('../selectors');

class ForgotPasswordPage {
  get title() {
    return $(selectors.forgotPassword.title);
  }

  get contact() {
    return $(selectors.forgotPassword.contact);
  }

  get submitButton() {
    return $(selectors.forgotPassword.submit);
  }

  get validationError() {
    return $(selectors.forgotPassword.validationError);
  }

  async submitEmptyForm() {
    await this.submitButton.click();
  }
}

module.exports = new ForgotPasswordPage();
