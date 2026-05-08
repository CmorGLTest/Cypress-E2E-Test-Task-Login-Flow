describe('Register - Password validation', () => {

  it('should validate password rules', () => {

    cy.visit('/parking/register')

    cy.get('input[name="password"]').type('Short1!')

    cy.contains('8-100 characters')
    cy.contains('lowercase letter')
    cy.contains('uppercase letter')
    cy.contains('digit')
    cy.contains('special character')

  })

})