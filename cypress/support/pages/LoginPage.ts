/**
 * Page Object Model for the Login Page
 * Manages interactions with the login form including email, password, and submit button
 * Note: The application uses Angular FormControl with formcontrolname attributes instead of name attributes
 */
class LoginPage {

  /**
   * Navigate to the login page
   * Also closes any welcome tour popups that appear on initial page load
   */
  visit() {
    cy.visit('/parking/login')
    
    // Change language to English for consistency
    cy.changeLanguageToEnglish()
    
    // Close any welcome/tour popups
    cy.closeWelcomeTourPopups()
    
    // Wait for page to be fully loaded
    cy.wait(500)
  }

  /**
   * Get the email input field
   * Uses formcontrolname selector for Angular reactive forms
   */
  emailInput() {
    return cy.get('input[formcontrolname="name"]')
  }

  /**
   * Get the password input field
   * Uses formcontrolname selector for Angular reactive forms
   */
  passwordInput() {
    return cy.get('input[formcontrolname="pass"]')
  }

  /**
   * Get the login submit button
   * Matches button containing "Log in" or "Einloggen" text for multi-language support
   */
  loginButton() {
    return cy.get('button').contains(/Log in|Einloggen/)
  }

  /**
   * Fill the email field with a value
   * @param {string} email - The email address to enter
   */
  fillEmail(email: string) {
    this.emailInput().clear().type(email, { force: true })
  }

  /**
   * Fill the password field with a value
   * @param {string} password - The password to enter
   */
  fillPassword(password: string) {
    this.passwordInput().clear().type(password, { force: true })
  }

  /**
   * Submit the login form by clicking the login button
   */
  submit() {
    this.loginButton().click({ force: true })
  }
}

export default new LoginPage()