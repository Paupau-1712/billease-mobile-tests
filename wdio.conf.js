const path = require('node:path');
const fs = require('node:fs');
require('dotenv').config();

const platform = (process.env.PLATFORM || 'android').toLowerCase();
const capabilities = {
  platformName: platform === 'ios' ? 'iOS' : 'Android',
  'appium:automationName': platform === 'ios' ? 'XCUITest' : 'UiAutomator2',
  'appium:newCommandTimeout': 120,
  'appium:noReset': true
};

if (platform === 'android') {
  if (!process.env.ANDROID_DEVICE_NAME && !process.env.ANDROID_UDID) {
    throw new Error('Set ANDROID_DEVICE_NAME or ANDROID_UDID in .env.');
  }
  if (process.env.ANDROID_DEVICE_NAME) {
    capabilities['appium:deviceName'] = process.env.ANDROID_DEVICE_NAME;
  }
  if (process.env.ANDROID_UDID) {
    capabilities['appium:udid'] = process.env.ANDROID_UDID;
  }
  if (process.env.ANDROID_APP) {
    const appPath = path.resolve(process.env.ANDROID_APP);
    if (!fs.existsSync(appPath)) {
      throw new Error(`ANDROID_APP does not exist: ${appPath}`);
    }
    capabilities['appium:app'] = appPath;
  } else if (process.env.ANDROID_APP_PACKAGE && process.env.ANDROID_APP_ACTIVITY) {
    capabilities['appium:appPackage'] = process.env.ANDROID_APP_PACKAGE;
    capabilities['appium:appActivity'] = process.env.ANDROID_APP_ACTIVITY;
  } else {
    throw new Error(
      'Configure ANDROID_APP or both ANDROID_APP_PACKAGE and ANDROID_APP_ACTIVITY in .env.'
    );
  }
} else if (platform === 'ios') {
  if (!process.env.IOS_DEVICE_NAME && !process.env.IOS_UDID) {
    throw new Error('Set IOS_DEVICE_NAME or IOS_UDID in .env.');
  }
  if (process.env.IOS_DEVICE_NAME) {
    capabilities['appium:deviceName'] = process.env.IOS_DEVICE_NAME;
  }
  if (process.env.IOS_UDID) {
    capabilities['appium:udid'] = process.env.IOS_UDID;
  }
  if (process.env.IOS_PLATFORM_VERSION) {
    capabilities['appium:platformVersion'] = process.env.IOS_PLATFORM_VERSION;
  }
  if (process.env.IOS_APP) {
    const appPath = path.resolve(process.env.IOS_APP);
    if (!fs.existsSync(appPath)) {
      throw new Error(`IOS_APP does not exist: ${appPath}`);
    }
    capabilities['appium:app'] = appPath;
  } else if (process.env.IOS_BUNDLE_ID) {
    capabilities['appium:bundleId'] = process.env.IOS_BUNDLE_ID;
  } else {
    throw new Error('Configure IOS_APP or IOS_BUNDLE_ID in .env.');
  }
} else {
  throw new Error(`Unsupported PLATFORM "${platform}". Use "android" or "ios".`);
}

exports.config = {
  runner: 'local',
  specs: ['./test/specs/**/*.spec.js'],
  maxInstances: 1,
  logLevel: 'info',
  framework: 'mocha',
  reporters: ['spec'],
  services: [],
  hostname: process.env.APPIUM_HOST || '127.0.0.1',
  port: Number(process.env.APPIUM_PORT || 4723),
  path: process.env.APPIUM_PATH || '/',
  connectionRetryTimeout: 120000,
  connectionRetryCount: 1,
  waitforTimeout: 10000,
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000
  },
  capabilities: [capabilities]
};
