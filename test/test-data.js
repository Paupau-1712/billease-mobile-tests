module.exports = {
  login: {
    validCredentials: {
      email: '09481938474',
      password: ''
    },
    unregisteredCredentials: {
      email: 'unregistered-user@example.invalid',
      password: 'TestOnlyPassword123!'
    },
    invalidEmailCredentials: {
      email: 'invalid-email-format',
      password: 'TestOnlyPassword123!'
    },
    incorrectPassword: '',
    emptyEmailPassword: 'TestOnlyPassword123!',
    emptyPasswordEmail: 'unregistered-user@example.invalid',
    passwordVisibility: 'TestOnlyPassword123!',
    expected: {
      serverErrorBannerText: 'Our server has issues'
    }
  },
  forgotPassword: {
    contact: '',
    validationMessage: 'Please enter a valid email or mobile number.'
  }
};
