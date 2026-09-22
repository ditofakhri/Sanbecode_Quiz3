import LoginPage from './pages/LoginPage'

describe('OrangeHRM Login - Page Object Model', () => {

  // TC-001
  it('TC-001 - Login dengan username dan password valid', () => {
    LoginPage.visit()

    LoginPage.login('Admin', 'admin123')

    cy.url().should('include', '/dashboard')
  })


  // TC-002
  it('TC-002 - Login dengan username tidak valid', () => {
    LoginPage.visit()

    LoginPage.login('Dito', 'admin123')

    LoginPage.verifyInvalidCredentials()
  })


  // TC-003
  it('TC-003 - Login dengan password tidak valid', () => {
    LoginPage.visit()

    LoginPage.login('Admin', 'password123')

    LoginPage.verifyInvalidCredentials()
  })


  // TC-004
  it('TC-004 - Login dengan username dan password tidak valid', () => {
    LoginPage.visit()

    LoginPage.login('admin123', 'wrongpassword')

    LoginPage.verifyInvalidCredentials()
  })


  // TC-005
  it('TC-005 - Login dengan username mengandung spasi', () => {
    LoginPage.visit()

    LoginPage.login('A d m i n', 'admin123')

    LoginPage.verifyInvalidCredentials()
  })


  // TC-006
  it('TC-006 - Login dengan password mengandung spasi', () => {
    LoginPage.visit()

    LoginPage.login('Admin', 'a d m i n 1 2 3')

    LoginPage.verifyInvalidCredentials()
  })


  // TC-007
  it('TC-007 - Login menggunakan tombol Enter', () => {
    LoginPage.visit()

    LoginPage.loginWithEnter('Admin', 'admin123')

    cy.url().should('include', '/dashboard')
  })


  // TC-008
  it('TC-008 - Mengakses Forgot Password', () => {
    LoginPage.visit()

    LoginPage.clickForgotPassword()

    cy.url().should('include', '/requestPasswordResetCode')
  })

})