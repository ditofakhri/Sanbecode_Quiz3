describe('Login OrangeHRM', () => {

    // TC-001
    it('TC-001 - Login menggunakan username dan password valid', () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/')
  
      cy.get('input[name="username"]')
        .type('Admin')
  
      cy.get('input[name="password"]')
        .type('admin123')
  
      cy.get('button[type="submit"]')
        .click()
  
      cy.url()
        .should('include', '/dashboard')
    })
  
  
    // TC-002
    it('TC-002 - Login menggunakan username tidak valid', () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/')
  
      cy.get('input[name="username"]')
        .type('dito')
  
      cy.get('input[name="password"]')
        .type('admin123')
  
      cy.get('button[type="submit"]')
        .click()
  
      cy.get('.oxd-alert-content-text')
        .should('contain', 'Invalid credentials')
    })
  
  
    // TC-003
    it('TC-003 - Login menggunakan password tidak valid', () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/')
  
      cy.get('input[name="username"]')
        .type('Admin')
  
      cy.get('input[name="password"]')
        .type('dito')
  
      cy.get('button[type="submit"]')
        .click()
  
      cy.get('.oxd-alert-content-text')
        .should('contain', 'Invalid credentials')
    })
  
  
    // TC-004
    it('TC-004 - Login menggunakan username dan password tidak valid', () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/')
  
      cy.get('input[name="username"]')
        .type('admin')
  
      cy.get('input[name="password"]')
        .type('admin1234')
  
      cy.get('button[type="submit"]')
        .click()
  
      cy.get('.oxd-alert-content-text')
        .should('contain', 'Invalid credentials')
    })
  
  
    // TC-005
    it('TC-005 - Login menggunakan username dan password kosong', () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/')
  
      cy.get('button[type="submit"]')
        .click()
  
      cy.get('.oxd-input-field-error-message')
        .should('contain', 'Required')
  
      cy.get('.oxd-input-field-error-message')
        .should('have.length', 2)
    })
  
  
    // TC-006
    it('TC-006 - Login tanpa mengisi username', () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/')
  
      cy.get('input[name="password"]')
        .type('admin123')
  
      cy.get('button[type="submit"]')
        .click()
  
      cy.get('.oxd-input-field-error-message')
        .first()
        .should('contain', 'Required')
    })
  
  
    // TC-007
    it('TC-007 - Login tanpa mengisi password', () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/')
  
      cy.get('input[name="username"]')
        .type('Admin')
  
      cy.get('button[type="submit"]')
        .click()
  
      cy.get('.oxd-input-field-error-message')
        .last()
        .should('contain', 'Required')
    })
  
  
    // TC-008
    it('TC-008 - Memastikan Password terenkripsi saat diketik', () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/')
  
      cy.get('input[name="password"]')
        .type('admin123')
  
      cy.get('input[name="password"]')
        .should('have.attr', 'type', 'password')
    })
  
  
    // TC-009
    it('TC-009 - Login dengan Username mengandung spasi', () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/')
  
      cy.get('input[name="username"]')
        .type('A d m i n')
  
      cy.get('input[name="password"]')
        .type('admin123')
  
      cy.get('button[type="submit"]')
        .click()
  
      cy.get('.oxd-alert-content-text')
        .should('contain', 'Invalid credentials')
    })
  
  
    // TC-010
    it('TC-010 - Login dengan password mengandung spasi', () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/')
  
      cy.get('input[name="username"]')
        .type('Admin')
  
      cy.get('input[name="password"]')
        .type('a d m i n 1 2 3')
  
      cy.get('button[type="submit"]')
        .click()
  
      cy.get('.oxd-alert-content-text')
        .should('contain', 'Invalid credentials')
    })
  
  
    // TC-011
    it('TC-011 - Login menggunakan tombol Enter', () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/')
  
      cy.get('input[name="username"]')
        .type('Admin')
  
      cy.get('input[name="password"]')
        .type('admin123{enter}')
  
      cy.url()
        .should('include', '/dashboard')
    })
  
  
    // TC-012
    it('TC-012 - Mengakses fitur forgot your password', () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/')
  
      cy.contains('Forgot your password?')
        .click()
  
      cy.url()
        .should('include', '/requestPasswordResetCode')
    })
  
  })