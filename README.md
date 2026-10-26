# BillEase Mobile Testing

Appium + WebdriverIO JavaScript starter for the BillEase login, forgot-password,
and sign-up assessment on Android and iOS. Tests use the Page Object Model.

Login tests use synthetic inputs for negative and empty-field cases. The
successful-login case is skipped until authorized test-account data is supplied
in `test/test-data.js`; never commit real credentials. The sign-up test only
opens the screen and does not submit registration details. Do not create a real
account for this assessment.

## Platform status

Android is the only platform with verified UI-test results in this project.
The Android app was available on the test emulator, and its selectors were
inspected against that app.

iOS is not included in the verified results because an authorized iOS app build
was not available to install or launch in the simulator during testing. The
configured bundle ID was not installed, no simulator-compatible iOS build is
included in this project, and the iOS accessibility selectors have not been
inspected or verified. Therefore, Appium could not start an iOS session and
could not execute the iOS test steps. This is an environment and test-app
availability limitation, not a claim that the tests can never support iOS.

To add verified iOS coverage, obtain an authorized iOS app build compatible
with the chosen simulator or device, configure `IOS_APP` or the installed
app's actual `IOS_BUNDLE_ID`, inspect its accessibility tree, and set the
corresponding iOS selectors. Until then, treat iOS results as **not run**.

## Latest Android run

The expanded login suite was run on 2026-10-26 with per-case screenshots and
screen recordings enabled:

| Result | Cases |
| --- | --- |
| Passed | TC_LOG_05, TC_LOG_06, TC_LOG_13 |
| Failed | TC_LOG_07 — strict selector matched two required-field elements; TC_LOG_11 — strict selector matched two recovery-title elements |
| Skipped | TC_LOG_01, TC_LOG_02, TC_LOG_03, TC_LOG_04, TC_LOG_08, TC_LOG_09, TC_LOG_10, TC_LOG_12 |

Skipped cases need authorized test-account data or app-specific selectors
before they can run. Do not use real credentials or submit real registrations.

## Mac prerequisites

Install:

- Node.js LTS
- Appium 3 (installed locally with this project's npm dependencies)
- Android Studio and Android SDK/Platform Tools for Android
- Xcode and an iOS Simulator runtime for iOS
- Java 17 or newer for Android SDK/Appium tooling

If Java is installed with Homebrew but not discoverable by macOS, set it for
your terminal session:

```sh
export JAVA_HOME="$(brew --prefix openjdk@21)/libexec/openjdk.jdk/Contents/Home"
export PATH="$JAVA_HOME/bin:$PATH"
```

From Android Studio's SDK Manager, install Platform Tools and an emulator
system image, then create and start an emulator. For an Android phone, enable
Developer Options and USB debugging, connect it, and accept the computer prompt.

Install Xcode from the Mac App Store, launch it once, and finish its first-run
setup. In Xcode, install an iOS Simulator runtime and start a simulator. A
physical iPhone can also be used, but Appium's WebDriverAgent may require
developer signing.

An App Store iOS app is generally not a simulator-compatible app build. For iOS
Simulator automation, obtain a simulator-compatible `.app`; for a physical
iPhone, use an app build/package supported by that device. If neither is
available, record the iOS blocker and the manual testing that was possible in
the assessment results.

## Install

From this project directory:

```sh
npm install
cp .env.example .env
```

Edit `.env` for the device and app you will test. Keep `.env` local; it is
ignored by Git. Use only app builds and test data you are authorized to use.

### Android configuration

Choose one app launch method in `.env`:

- `ANDROID_APP`: absolute or project-relative path to an APK; or
- both `ANDROID_APP_PACKAGE` and `ANDROID_APP_ACTIVITY` for an app installed
  on the device.

Set `ANDROID_DEVICE_NAME` and, if needed, `ANDROID_UDID`. List connected
devices with:

```sh
adb devices -l
```

On this Mac, the configured emulator is `medium_phone`. Start it with:

```sh
"$HOME/Library/Android/sdk/emulator/emulator" -avd medium_phone
```

For an APK install, point `ANDROID_APP` at its path. Do not add app binaries to
the repository; the `apps/` directory is ignored.

### iOS configuration

Choose one app launch method in `.env`:

- `IOS_APP`: path to a simulator-compatible `.app`/`.ipa`; or
- `IOS_BUNDLE_ID`: bundle identifier of an app installed on the device.

Set `IOS_DEVICE_NAME` to the exact simulator name, or `IOS_UDID` to target a
specific simulator/device. `IOS_PLATFORM_VERSION` is optional but can help the
XCUITest driver select the intended simulator runtime. List available
simulators with:

```sh
xcrun simctl list devices available
```

## Inspect and configure selectors

The default selectors in `test/selectors.js` and `.env.example` were checked
against the installed Android app. They use Android UiAutomator resource IDs and
visible validation text. Inspect the app with Appium Inspector on iOS and map
those controls separately in `.env`. For example:

```dotenv
LOGIN_TITLE_SELECTOR=~actual.login.accessibilityId
LOGIN_EMAIL_SELECTOR=~actual.email.accessibilityId
LOGIN_PASSWORD_SELECTOR=~actual.password.accessibilityId
LOGIN_SUBMIT_SELECTOR=~actual.loginButton.accessibilityId
LOGIN_REQUIRED_ERROR_SELECTOR=~actual.validationMessage.accessibilityId
```

The `~` prefix means accessibility ID. Use the selector strategy supported by
the inspected app; the Android defaults use
`android=new UiSelector().resourceId("...")`. If Android and iOS need different
locators, use platform-specific `.env` files or update the selector mapping to
branch on `PLATFORM`; do not assume the apps share IDs. Never store real
credentials or personal information in selector/config files.

## Run

Install the Appium drivers once for this local Appium server:

```sh
npx appium driver install uiautomator2
npx appium driver install xcuitest
```

Start the Appium server in one terminal:

```sh
export JAVA_HOME="$(brew --prefix openjdk@21)/libexec/openjdk.jdk/Contents/Home"
export ANDROID_HOME="$HOME/Library/Android/sdk"
export ANDROID_SDK_ROOT="$ANDROID_HOME"
export PATH="$JAVA_HOME/bin:$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator:$PATH"
export DEVELOPER_DIR="/Applications/Xcode.app/Contents/Developer"
npm run appium
```

In another terminal, run the platform suite:

```sh
npm run test:android
npm run test:ios
```

Keep device-specific settings in your ignored local `.env`; never publish it.

The server binds only to `127.0.0.1` and the runner connects to
`http://127.0.0.1:4723/` by default. Override `APPIUM_HOST`, `APPIUM_PORT`, or
`APPIUM_PATH` if your Appium server uses a different address.

## Test cases and results

The Login spec covers TC_LOG_01 through TC_LOG_13. Cases requiring a registered
account or unverified app controls are skipped until their test data or selector
is configured. Put non-secret scenario inputs in `test/test-data.js`; do not
commit real account credentials. Configure app-specific selectors in `.env`
using the variables listed in `.env.example`.

The expanded Login suite results are summarized under [Latest Android run](#latest-android-run).
Record manual outcomes separately if required by the assessment.

The Login spec saves one screenshot per case to `screenshots/login/` and one
screen recording per case to `recordings/login/`. The Forgot Password spec
saves its screenshots to `screenshots/`. Screenshots and recordings are kept
local and excluded from the public repository. Recordings may contain sensitive
on-screen information; review them before sharing.

## Troubleshooting

- **No Android device:** start the emulator or reconnect the phone, then check
  `adb devices -l`.
- **No iOS simulator:** install a runtime in Xcode and verify it with
  `xcrun simctl list devices available`.
- **Appium driver missing:** install the matching driver using the commands
  above, then restart the Appium server.
- **App or screen not found:** check `.env`, confirm the app launches manually,
  and inspect its accessible names/IDs with Appium Inspector.
- **iOS app cannot launch in Simulator:** an App Store build may not support
  Simulator; document the limitation instead of attempting account creation.
