# Cypress E2E Test Task — Allianz Parking Login Flow

A comprehensive end-to-end test suite for the Allianz Parking demo website using Cypress and TypeScript. This project tests login and registration flows with proper page object models, custom commands, and API mocking.

## 📋 Overview

This project automates testing of the parking reservation website's authentication flows:
- **Login Tests**: Valid/invalid credentials, form validation
- **Registration Tests**: Password complexity validation
- **Multi-language Support**: Tests run with automatic language switching to English
- **Popup Handling**: Automatically closes welcome tour popups

## 🛠️ Tech Stack

- **Cypress** (15.14.2) - Modern E2E testing framework
- **TypeScript** (6.0.3) - Type-safe test automation
- **Angular Material** - Components tested in the SPA

## ✨ Key Features

### Test Scenarios
- ✅ Successful login with valid credentials
- ✅ Login failure with invalid credentials  
- ✅ Form validation (disabled button when empty)
- ✅ Password complexity validation on registration

### Testing Best Practices
- 📄 **Page Object Model (POM)**: Separation of test logic from page interactions
- 🔧 **Custom Commands**: Reusable `changeLanguageToEnglish()`, `closeWelcomeTourPopups()`, `login()`
- 📦 **Fixtures**: User credentials stored in `cypress/fixtures/users.json`
- 🎭 **API Mocking**: Uses `cy.intercept()` to mock authentication endpoints
- 💬 **Comprehensive Comments**: All code documented with JSDoc comments

### Multi-Language Support
- Tests automatically change the application language to English
- Handles both German ("Einloggen") and English ("Log in") button text

### Popup & Modal Handling
- Automatically closes welcome tour popups on page load
- Removes CDK overlays that block form interaction
- Cleans Shepherd tour components

## 📁 Project Structure

```
cypress-e2e-test-task-login-flow/
├── cypress/
│   ├── e2e/                    # Test files
│   │   ├── login.cy.ts         # Login flow tests
│   │   └── register.cy.ts      # Registration tests
│   ├── fixtures/               # Test data
│   │   └── users.json          # User credentials for tests
│   ├── screenshots/            # Failed test screenshots
│   └── support/                # Test utilities
│       ├── commands.ts         # Custom Cypress commands
│       ├── e2e.ts             # Global test configuration
│       └── pages/              # Page objects
│           ├── LoginPage.ts    # Login page interactions
│           └── RegisterPage.ts # Registration page interactions
├── cypress.config.ts           # Cypress configuration
├── package.json
├── tsconfig.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
```

### Configuration

#### Environment Variables
Create a `.env` file in the project root (or use system environment variables):

```bash
CYPRESS_EMAIL=your_test_email@example.com
CYPRESS_PASSWORD=your_test_password
CYPRESS_REGISTER_EMAIL=your_registration_email@example.com
```

The application already includes test credentials in `cypress/fixtures/users.json`:
- **Valid User**: `godowow793@soppat.com` / `m9o%OrtVIQNj`
- **Invalid User**: `wrong@test.com` / `wrongpass`

## 📝 Running Tests

### Interactive Mode (Cypress GUI)
```bash
npm run cypress:open
```
This opens the Cypress test runner where you can see tests execute in real-time.

### Headless Mode (CI/CD)
```bash
npm run test
# or
npm run cypress:run
```
Runs all tests in headless Chrome browser and generates reports.

### Run Specific Test File
```bash
npx cypress run --spec "cypress/e2e/login.cy.ts"
```

## 🧪 Test Details

### Login Flow Tests (`cypress/e2e/login.cy.ts`)

**Test 1: Successful Login**
- Enters valid credentials
- Mocks successful API response (200)
- Verifies redirect to `/parking/map`
- Displays map page for 3 seconds for visual verification

**Test 2: Invalid Credentials**
- Enters invalid credentials
- Mocks failed API response (401)
- Verifies user stays on login page

**Test 3: Form Validation**
- Verifies login button is disabled when form is empty

### Registration Tests (`cypress/e2e/register.cy.ts`)

**Test: Password Validation**
- Enters weak password
- Verifies all password requirements are displayed:
  - 8-100 characters
  - Lowercase letter
  - Uppercase letter
  - Digit (number)
  - Special character

## 🔍 Understanding the Selectors

The application uses **Angular Reactive Forms** with `formcontrolname` attributes instead of standard HTML `name` attributes.

### Form Field Selectors
- Email input: `input[formcontrolname="name"]`
- Password input: `input[formcontrolname="pass"]`
- Login button: `button` containing "Log in" or "Einloggen"

### Why These Selectors?
Angular's reactive forms use `formcontrolname` to bind form controls. This is more reliable than `name` attributes for modern SPAs.

## 🛠️ Custom Commands

### changeLanguageToEnglish()
```typescript
// Automatically switches UI language to English
cy.changeLanguageToEnglish()
```

### closeWelcomeTourPopups()
```typescript
// Closes modal overlays and welcome tour elements
cy.closeWelcomeTourPopups()
```

### login(email, password)
```typescript
// Fills form and submits login
cy.login('user@example.com', 'password123')
```

## 📊 Test Output

After running tests, Cypress generates:
- **Screenshots**: Saved in `cypress/screenshots/` for failed tests
- **Console Output**: Shows test results with pass/fail status
- **Video**: (If configured) Saved in `cypress/videos/`

## 🐛 Troubleshooting

### Tests Fail Due to Language
The tests automatically handle both German and English. If you see "Einloggen" instead of "Log in", the language switch may have failed. Check network connectivity to the demo site.

### Popup Not Closing
If welcome tour popups block tests:
1. Check browser console for errors
2. The `closeWelcomeTourPopups()` command removes CDK overlays
3. Add additional wait time: `cy.wait(1000)`

### Selectors Not Found
If tests fail with "element not found":
1. The page structure may have changed
2. Check current selectors by inspecting the page in Cypress GUI
3. Update selectors in `cypress/support/pages/*.ts`

## 📚 Resources

- [Cypress Documentation](https://docs.cypress.io)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Page Object Model Pattern](https://docs.cypress.io/guides/core-concepts/interacting-with-elements#Querying-Elements)
- [Angular Reactive Forms](https://angular.io/guide/reactive-forms)

## 📄 License

ISC

## 👤 Author

Created as part of Cypress E2E testing automation project.

---

**Last Updated**: May 2026  
**Status**: ✅ Fully functional with multi-language support and comprehensive documentation
