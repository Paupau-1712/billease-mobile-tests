function selector(name, fallback) {
  return process.env[name] || fallback;
}

function androidId(id) {
  return `android=new UiSelector().resourceId("${id}")`;
}

function androidText(text) {
  return `android=new UiSelector().text("${text}")`;
}

module.exports = {
  backButton: selector('BACK_BUTTON_SELECTOR', androidId('back_btn')),
  login: {
    homeLogin: selector('HOME_LOGIN_BUTTON_SELECTOR', androidId('btn_log_in')),
    title: selector('LOGIN_TITLE_SELECTOR', androidId('ComposeHost_LogInScreen_title')),
    email: selector('LOGIN_EMAIL_SELECTOR', androidId('login_input_email_or_phone')),
    password: selector('LOGIN_PASSWORD_SELECTOR', androidId('login_input_password')),
    submit: selector('LOGIN_SUBMIT_SELECTOR', androidId('btn_log_in')),
    requiredError: selector('LOGIN_REQUIRED_ERROR_SELECTOR', androidText('This field is required')),
    invalidEmailError: selector('LOGIN_INVALID_EMAIL_ERROR_SELECTOR', ''),
    credentialsError: selector('LOGIN_CREDENTIALS_ERROR_SELECTOR', ''),
    successDestination: selector('LOGIN_SUCCESS_DESTINATION_SELECTOR', ''),
    passwordVisibilityToggle: selector('LOGIN_PASSWORD_VISIBILITY_TOGGLE_SELECTOR', ''),
    serverErrorBanner: selector('LOGIN_SERVER_ERROR_BANNER_SELECTOR', ''),
    serverErrorIcon: selector('LOGIN_SERVER_ERROR_ICON_SELECTOR', ''),
    dismissServerErrorBanner: selector('LOGIN_DISMISS_SERVER_ERROR_BANNER_SELECTOR', ''),
    forgotPassword: selector('FORGOT_PASSWORD_LINK_SELECTOR', androidId('login_link_forgot_password')),
    liveChat: selector('LOGIN_LIVE_CHAT_SELECTOR', ''),
    liveChatDestination: selector('LOGIN_LIVE_CHAT_DESTINATION_SELECTOR', ''),
    signUp: selector('SIGN_UP_LINK_SELECTOR', androidId('login_link_sign_up'))
  },
  forgotPassword: {
    title: selector('FORGOT_TITLE_SELECTOR', androidId('ComposeHost_ResetPassword_title')),
    contact: selector('FORGOT_CONTACT_SELECTOR', androidId('text_field_contact_to_reset')),
    submit: selector('FORGOT_SUBMIT_SELECTOR', androidId('btn_reset')),
    validationError: selector(
      'FORGOT_VALIDATION_ERROR_SELECTOR',
      androidText('Please enter a valid email or mobile number.')
    )
  },
  signUp: {
    title: selector('SIGN_UP_TITLE_SELECTOR', androidText('Let’s get started'))
  }
};
