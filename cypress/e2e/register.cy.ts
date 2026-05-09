/**
 * Registration Page Test Suite
 * Tests the registration form including password validation requirements
 * Verifies that the form properly validates password complexity rules
 */
import RegisterPage from '../support/pages/RegisterPage'

describe('Register Password Validation', () => {

  /**
   * Before each test:
   * - Visit the registration page
   * - This will automatically change language to English and close popups
   */
  beforeEach(() => {
    RegisterPage.visit()
  })

  /**
   * Test: Password validation requirements
   * Verifies that weak passwords trigger validation messages
   * Validates that all password complexity requirements are properly shown to the user
   * 
   * Password must contain:
   * - 8-100 characters
   * - lowercase letter
   * - uppercase letter  
   * - digit (number)
   * - special character
   */
  it('should validate password requirements', () => {

    // Enter a weak password that fails all validation criteria
    RegisterPage.fillPassword('abc')

    // Verify that all password requirement validation messages are displayed
    cy.contains('8-100 characters')
    cy.contains('lowercase')
    cy.contains('uppercase')
    cy.contains('digit')
    cy.contains('special character')
  })

})