describe('OrangeHRM Login - Intercept', () => {

  const loginPage =
    'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'

  it('INT-001 - Login dengan username dan password valid', () => {

    cy.intercept('POST', '**', (req) => {
      expect(req.body).to.contain('username=Admin')
    }).as('loginValid')

    cy.visit(loginPage)

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.wait('@loginValid')

    cy.url().should('include', '/dashboard')
  })

  it('INT-002 - Login dengan username tidak valid', () => {

    cy.intercept('POST', '**', (req) => {
      expect(req.body).to.contain('username=Dito')
    }).as('invalidUsername')

    cy.visit(loginPage)

    cy.get('input[name="username"]').type('Dito')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.wait('@invalidUsername')

    cy.get('.oxd-alert-content-text')
      .should('contain', 'Invalid credentials')
  })

  it('INT-003 - Login dengan password tidak valid', () => {

    cy.intercept('POST', '**', (req) => {
      expect(req.body).to.contain('password=password123')
    }).as('invalidPassword')

    cy.visit(loginPage)

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('password123')
    cy.get('button[type="submit"]').click()

    cy.wait('@invalidPassword')

    cy.get('.oxd-alert-content-text')
      .should('contain', 'Invalid credentials')
  })

  it('INT-004 - Login dengan username dan password tidak valid', () => {

    cy.intercept('POST', '**', (req) => {
      expect(req.body)
        .to.contain('username=admin123')

      expect(req.body)
        .to.contain('password=wrongpassword')
    }).as('invalidBoth')

    cy.visit(loginPage)

    cy.get('input[name="username"]').type('admin123')
    cy.get('input[name="password"]').type('wrongpassword')
    cy.get('button[type="submit"]').click()

    cy.wait('@invalidBoth')

    cy.get('.oxd-alert-content-text')
      .should('contain', 'Invalid credentials')
  })

  it('INT-005 - Login dengan username mengandung spasi', () => {

    cy.intercept('POST', '**', (req) => {
      expect(req.body)
        .to.contain('username=A+d+m+i+n')
    }).as('usernameSpace')

    cy.visit(loginPage)

    cy.get('input[name="username"]').type('A d m i n')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.wait('@usernameSpace')

    cy.get('.oxd-alert-content-text')
      .should('contain', 'Invalid credentials')
  })


  it('INT-006 - Login dengan password mengandung spasi', () => {

    cy.intercept('POST', '**', (req) => {
      expect(req.body)
        .to.contain('password=a+d+m+i+n+1+2+3')
    }).as('passwordSpace')

    cy.visit(loginPage)

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('a d m i n 1 2 3')
    cy.get('button[type="submit"]').click()

    cy.wait('@passwordSpace')

    cy.get('.oxd-alert-content-text')
      .should('contain', 'Invalid credentials')
  })

  it('INT-007 - Login menggunakan tombol Enter', () => {

    cy.intercept('POST', '**', (req) => {
      expect(req.method).to.eq('POST')
    }).as('loginEnter')

    cy.visit(loginPage)

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123{enter}')

    cy.wait('@loginEnter')

    cy.url().should('include', '/dashboard')
  })

  it('INT-008 - Mengakses Forgot Password', () => {

    cy.intercept('GET', '**/requestPasswordResetCode', (req) => {
      expect(req.method).to.eq('GET')
    }).as('forgotPassword')

    cy.visit(loginPage)

    cy.contains('Forgot your password?').click()

    cy.wait('@forgotPassword')

    cy.url()
      .should('include', '/requestPasswordResetCode')
  })

})