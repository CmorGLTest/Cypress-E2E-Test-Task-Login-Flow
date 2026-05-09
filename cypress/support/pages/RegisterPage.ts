/**
 * Page Object Model for the Registration Page
 * Manages interactions with the registration form including password validation
 * Handles page-specific popups and overlays that appear on initial load
 */
class RegisterPage {

  /**
   * Navigate to the registration page and close welcome tour elements
   * Changes language to English and removes modal overlays that block form interaction
   */
  visit() {
    // Visit the login page first, because direct register URL redirects back to login
    cy.visit('/parking/login')

    // Wait for the page to settle and close any initial popups
    cy.wait(1200)
    cy.changeLanguageToEnglish()
    this.closeWelcomeTour()

    // Navigate to the registration form via the Register link
    cy.contains('Register').click({ force: true })

    // Wait for registration form to appear
    cy.wait(1200)
  }

  /**
   * Close welcome tour modals and overlays that appear on the registration page
   * Removes CDK overlay containers and Shepherd tour components
   */
  private closeWelcomeTour() {
    cy.get('body').then(($body) => {
      // Remove overlays that may block the form
      if ($body.find('.cdk-overlay-container').length) {
        cy.wrap($body.find('.cdk-overlay-container')).invoke('remove')
      }

      if ($body.find('.cdk-overlay-pane').length) {
        cy.wrap($body.find('.cdk-overlay-pane')).invoke('remove')
      }

      if ($body.find('.shepherd-footer').length) {
        cy.wrap($body.find('.shepherd-footer')).invoke('remove')
      }

      if ($body.find('.shepherd-container').length) {
        cy.wrap($body.find('.shepherd-container')).invoke('remove')
      }

      if ($body.find('dialog').length) {
        cy.wrap($body.find('dialog')).invoke('remove')
      }

      if ($body.find('svg').length) {
        cy.wrap($body.find('svg')).invoke('remove')
      }
    })

    cy.wait(300)
  }

  /**
   * Fill the name/email field in the registration form
   * @param {string} name - The email or name value to enter
   */
  fillName(name: string) {
    cy.get('input[formcontrolname="name"]').clear({ force: true }).type(name, { force: true })
  }

  /**
   * Fill the password field in the registration form
   * Triggers password validation display on the page
   * @param {string} password - The password to enter
   */
  fillPassword(password: string) {
    cy.get('input[formcontrolname="pass"]').clear({ force: true }).type(password, { force: true })
  }

  /**
   * Submit the registration form by clicking the submit button
   */
  submit() {
    cy.get('button[type="submit"]').click({ force: true })
  }
}

export default new RegisterPage()