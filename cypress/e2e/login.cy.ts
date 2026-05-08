describe('Login - Success', () => {

  it('should login successfully and redirect to map', () => {

    cy.intercept('POST', '**/login', {
      statusCode: 200,
      body: {
        token: 'fake-token'
      }
    }).as('loginRequest')

    cy.visit('/parking/login')

    cy.get('input[name="email"]').type('godowow793@soppat.com')
    cy.get('input[name="password"]').type('m9o%OrtVIQNj')

    cy.get('button[type="submit"]').click()

    cy.wait('@loginRequest')

    cy.url().should('include', '/parking/map')
  })

})

describe('Login - Invalid', () => {

  it('should show error on wrong credentials', () => {

    cy.intercept('POST', '**/login', {
      statusCode: 401,
      body: {
        message: 'Invalid credentials'
      }
    }).as('loginFail')

    cy.visit('/parking/login')

    cy.get('input[name="email"]').type('wrong@test.com')
    cy.get('input[name="password"]').type('wrongpass')

    cy.get('button[type="submit"]').click()

    cy.wait('@loginFail')

    cy.contains('Invalid').should('be.visible')

    cy.url().should('include', '/parking/login')
  })

})

describe('Login - Validation', () => {

  it('should disable login button when fields are empty', () => {

    cy.visit('/parking/login')

    cy.get('button[type="submit"]').should('be.disabled')
  })

})
