class LoginPage {

    visit() {
      cy.visit(
        'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'
      )
  
      cy.get('input[name="username"]', {
        timeout: 10000
      }).should('be.visible')
    }
  
    usernameField() {
      return cy.get('input[name="username"]')
    }
  
    passwordField() {
      return cy.get('input[name="password"]')
    }
  
    loginButton() {
      return cy.get('button[type="submit"]')
    }
  
    forgotPasswordLink() {
      return cy.contains('Forgot your password?')
    }
  
    inputUsername(username) {
      this.usernameField()
        .should('be.visible')
        .clear()
        .type(username)
    }
  
    inputPassword(password) {
      this.passwordField()
        .should('be.visible')
        .clear()
        .type(password)
    }
  
    clickLogin() {
      this.loginButton()
        .should('be.visible')
        .click()
    }
  
    login(username, password) {
      this.inputUsername(username)
      this.inputPassword(password)
      this.clickLogin()
    }
  
    loginWithEnter(username, password) {
      this.inputUsername(username)
      this.inputPassword(password + '{enter}')
    }
  
    verifyInvalidCredentials() {
      cy.get('body', {
        timeout: 10000
      }).should('contain.text', 'Invalid credentials')
    }
  
    clickForgotPassword() {
      this.forgotPasswordLink()
        .should('be.visible')
        .click()
    }
  }
  
  export default new LoginPage()