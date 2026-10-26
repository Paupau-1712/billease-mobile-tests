const selectors = require('../selectors');

class SignUpPage {
  get title() {
    return $(selectors.signUp.title);
  }
}

module.exports = new SignUpPage();
