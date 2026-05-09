/**
 * Change the application language to English
 * Clicks on the language dropdown and selects "Englisch" (English)
 */
Cypress.Commands.add('changeLanguageToEnglish', () => {
  // Try to find and click the language selector dropdown
  // The language selector is typically found near the bottom left of the page
  cy.get('[role="combobox"]').first().click({ force: true })
  
  // Wait a moment for the dropdown to open
  cy.wait(500)
  
  // Click on the English/Englisch option in the dropdown
  cy.get('[role="option"]').contains(/Englisch|English/).click({ force: true })
  
  // Wait for language to change
  cy.wait(1000)
})

/**
 * Close welcome tour popups that appear on page load
 * Handles both the initial popup and any shepherd/CDK overlays
 */
Cypress.Commands.add('closeWelcomeTourPopups', () => {
  // Try to close the CDK overlay (modal) if present
  cy.get('body').then(($body) => {
    // Look for close button in the dialog
    if ($body.find('dialog button, [role="dialog"] button').length) {
      cy.get('dialog button, [role="dialog"] button').first().click({ force: true })
    }
    
    // Remove overlays that might be blocking interaction
    if ($body.find('.cdk-overlay-pane').length) {
      cy.get('.cdk-overlay-pane').invoke('remove')
    }
    
    // Remove shepherd tour overlays
    if ($body.find('.shepherd-container').length) {
      cy.get('.shepherd-container').invoke('remove')
    }
  })
  
  cy.wait(300)
})

/**
 * Custom login command using corrected form field selectors
 * The form uses Angular's formcontrolname attributes instead of name attributes
 */
Cypress.Commands.add('login', (email: string, password: string) => {
  // Fill email field using formcontrolname attribute
  cy.get('input[formcontrolname="name"]').clear().type(email, { force: true })
  
  // Fill password field using formcontrolname attribute
  cy.get('input[formcontrolname="pass"]').clear().type(password, { force: true })
  
  // Click the login button
  cy.get('button').contains(/Log in|Einloggen/).click({ force: true })
})