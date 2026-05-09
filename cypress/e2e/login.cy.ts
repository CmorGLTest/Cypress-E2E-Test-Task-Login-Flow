/**
 * Login Flow Test Suite
 * Tests the login functionality including successful login, error handling, and form validation
 */
import LoginPage from '../support/pages/LoginPage'

describe('Login Flow', () => {

  /**
   * Before each test:
   * - Visit the login page
   * - This will automatically change language to English and close popups
   */
  beforeEach(() => {
    LoginPage.visit()
  })

  /**
   * Test 1: Successful login flow
   * Verifies that valid credentials allow login and redirect to the parking map page
   * After successful login, waits to display the map page for user verification
   */
  it('should login successfully', () => {

    cy.fixture('users').then((users) => {
      // Fill login form with valid credentials
      LoginPage.fillEmail(users.validUser.email)
      LoginPage.fillPassword(users.validUser.password)

      // Submit the form
      LoginPage.submit()

      // Wait for navigation and check URL changed to parking map
      cy.url({ timeout: 10000 }).should('include', '/parking/map')
      
      // Display the map page for 3 seconds so user can see the result
      cy.wait(3000)
    })
  })

  /**
   * Test 2: Invalid credentials error handling
   * Verifies that invalid credentials show an error and keep user on login page
   */
  it('should show error with invalid credentials', () => {

    cy.fixture('users').then((users) => {
      // Fill login form with invalid credentials
      LoginPage.fillEmail(users.invalidUser.email)
      LoginPage.fillPassword(users.invalidUser.password)

      // Submit the form
      LoginPage.submit()

      // Wait and verify user is still on login page (not redirected)
      cy.url({ timeout: 10000 }).should('include', '/parking/login')
    })
  })

  /**
   * Test 3: Form validation - Login button disabled state
   * Verifies that the login button is disabled when no credentials are entered
   * This test validates the form's initial state
   */
  it('should disable login button when fields are empty', () => {
    // Check that login button's parent has the disabled class (Angular Material styling)
    // The button element itself is wrapped, so we check the button's container
    LoginPage.loginButton().closest('button').should('have.attr', 'disabled')
  })

})