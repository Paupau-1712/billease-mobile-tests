const loginPage = require('../pages/LoginPage');
const signUpPage = require('../pages/SignUpPage');

describe('Sign Up', () => {
  it('opens the sign-up screen without submitting registration details', async () => {
    await loginPage.open();
    await expect(loginPage.title).toBeDisplayed();
    await loginPage.openSignUp();
    await expect(signUpPage.title).toBeDisplayed();
  });
});
