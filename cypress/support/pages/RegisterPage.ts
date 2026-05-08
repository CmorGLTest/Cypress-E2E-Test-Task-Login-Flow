class LoginPage {

  visit() {
    cy.visit('/parking/login')
  }

  fillEmail(email: string) {
    cy.get('input[name="email"]').type(email)
  }

  fillPassword(password: string) {
    cy.get('input[name="password"]').type(password)
  }

  submit() {
    cy.get('button[type="submit"]').click()
  }
}

export default new LoginPage()