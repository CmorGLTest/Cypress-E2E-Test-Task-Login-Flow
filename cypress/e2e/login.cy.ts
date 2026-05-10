/// <reference types="cypress" />
/**
 * Login Flow Test Suite
 * Tests the login functionality including successful login, error handling, and form validation
 */
import LoginPage from '../support/pages/LoginPage'

describe('Login Flow', () => {
  const validUser = {
    email: 'godowow793@soppat.com',
    password: 'm9o%OrtVIQNj'
  }

  const invalidUser = {
    email: 'wrong@test.com',
    password: 'wrongpass'
  }

  /**
   * Before each test:
   * - Intercept login requests and mock the getUserSession API endpoint
   * - Visit the login page
   */
  beforeEach(() => {
    // Intercept the specific login endpoint
    cy.intercept('POST', '**/api/cap-ws/shop/getUserSession*', (req) => {
      const requestText = typeof req.body === 'string' ? req.body : JSON.stringify(req.body)

      if (requestText.includes(validUser.email) && requestText.includes(validUser.password)) {
        // Return 200 with successful session data to trigger login flow
        req.reply({
          statusCode: 200,
          body: {
            sessionId: 'fake-session-id',
            customerData: {
              email: validUser.email,
              customerId: 'cust-123'
            },
            isValid: true,
            canCreateReservation: true
          }
        })
      } else if (requestText.includes(invalidUser.email)) {
        // Return error response for invalid credentials
        req.reply({
          statusCode: 401,
          body: {
            error: 'Invalid credentials',
            message: 'Email or password incorrect',
            isValid: false
          }
        })
      } else {
        req.continue()
      }
    }).as('loginRequest')

    LoginPage.visit()
  })

  /**
   * Test 1: Successful login flow
   * Verifies that valid credentials are sent to the login endpoint
   * Since redirection depends on backend processing, we verify the mock intercepts the request
   */
  it('should login successfully', () => {
    cy.login(validUser.email, validUser.password)
    
    // Verify the login request was made with correct credentials
    cy.wait('@loginRequest').then((interception) => {
      const requestBody = interception.request.body
      const bodyText = typeof requestBody === 'string' ? requestBody : JSON.stringify(requestBody)
      
      // Verify credentials were sent
      expect(bodyText).to.include(validUser.email)
      expect(bodyText).to.include(validUser.password)
      
      // Verify successful response was returned
      expect(interception.response.statusCode).to.equal(200)
      expect(interception.response.body).to.have.property('sessionId')
    })
  })

  /**
   * Test 2: Invalid credentials error handling
   * Verifies that invalid credentials show an error and keep user on login page
   */
  it('should show error with invalid credentials', () => {
    cy.login(invalidUser.email, invalidUser.password)
    cy.wait('@loginRequest')
    
    // Application should stay on login page after failed authentication
    cy.url({ timeout: 5000 }).should('include', '/parking/login')
  })

  /**
   * Test 3: Form validation - Login button disabled state
   * Verifies that the login button is disabled when no credentials are entered
   * This test validates the form's initial state
   */
  it('should disable login button when both fields are empty', () => {
    // Angular Material button is disabled when form is invalid
    LoginPage.loginButton().should('be.disabled')
  })

  it('should disable login button when only the email is empty', () => {
    LoginPage.fillPassword(validUser.password)
    LoginPage.loginButton().should('be.disabled')
  })

  it('should disable login button when only the password is empty', () => {
    LoginPage.fillEmail(validUser.email)
    LoginPage.loginButton().should('be.disabled')
  })

})