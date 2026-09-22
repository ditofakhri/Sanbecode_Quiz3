describe('OrangeHRM Login - Intercept', () => {

  const loginPage =
    'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'


  // INT-001
  it('INT-001 - Login dengan username dan password valid', () => {

    cy.intercept('POST', '**').as('loginValid')

    cy.visit(loginPage)

    cy.get('input[name="username"]')
      .should('be.visible')
      .type('Admin')

    cy.get('input[name="password"]')
      .type('admin123')

    cy.get('button[type="submit"]')
      .click()

    cy.wait('@loginValid')

    cy.url()
      .should('include', '/dashboard')
  })


  // INT-002
  it('INT-002 - Login dengan username tidak valid', () => {

    cy.intercept('POST', '**').as('invalidUsername')

    cy.visit(loginPage)

    cy.get('input[name="username"]')
      .type('Dito')

    cy.get('input[name="password"]')
      .type('admin123')

    cy.get('button[type="submit"]')
      .click()

    cy.wait('@invalidUsername')
      .then((interception) => {

        expect(interception.request.body)
          .to.contain('username=Dito')

      })

    cy.get('.oxd-alert-content-text')
      .should('contain', 'Invalid credentials')
  })


  // INT-003
  it('INT-003 - Login dengan password tidak valid', () => {

    cy.intercept('POST', '**').as('invalidPassword')

    cy.visit(loginPage)

    cy.get('input[name="username"]')
      .type('Admin')

    cy.get('input[name="password"]')
      .type('password123')

    cy.get('button[type="submit"]')
      .click()

    cy.wait('@invalidPassword')
      .then((interception) => {

        expect(interception.request.body)
          .to.contain('password=password123')

      })

    cy.get('.oxd-alert-content-text')
      .should('contain', 'Invalid credentials')
  })


  // INT-004
  it('INT-004 - Login dengan username dan password tidak valid', () => {

    cy.intercept('POST', '**').as('invalidBoth')

    cy.visit(loginPage)

    cy.get('input[name="username"]')
      .type('admin123')

    cy.get('input[name="password"]')
      .type('wrongpassword')

    cy.get('button[type="submit"]')
      .click()

    cy.wait('@invalidBoth')
      .then((interception) => {

        expect(interception.request.body)
          .to.contain('username=admin123')

        expect(interception.request.body)
          .to.contain('password=wrongpassword')

      })

    cy.get('.oxd-alert-content-text')
      .should('contain', 'Invalid credentials')
  })


  // INT-005
  it('INT-005 - Login dengan username mengandung spasi', () => {

    cy.intercept('POST', '**').as('usernameSpace')

    cy.visit(loginPage)

    cy.get('input[name="username"]')
      .type('A d m i n')

    cy.get('input[name="password"]')
      .type('admin123')

    cy.get('button[type="submit"]')
      .click()

    cy.wait('@usernameSpace')
      .then((interception) => {

        expect(interception.request.body)
          .to.contain('username=A+d+m+i+n')

      })

    cy.get('.oxd-alert-content-text')
      .should('contain', 'Invalid credentials')
  })


  // INT-006
  it('INT-006 - Login dengan password mengandung spasi', () => {

    cy.intercept('POST', '**').as('passwordSpace')

    cy.visit(loginPage)

    cy.get('input[name="username"]')
      .type('Admin')

    cy.get('input[name="password"]')
      .type('a d m i n 1 2 3')

    cy.get('button[type="submit"]')
      .click()

    cy.wait('@passwordSpace')
      .then((interception) => {

        expect(interception.request.body)
          .to.contain('password=a+d+m+i+n+1+2+3')

      })

    cy.get('.oxd-alert-content-text')
      .should('contain', 'Invalid credentials')
  })


  // INT-007
  it('INT-007 - Login menggunakan tombol Enter', () => {

    cy.intercept('POST', '**').as('loginEnter')

    cy.visit(loginPage)

    cy.get('input[name="username"]')
      .type('Admin')

    cy.get('input[name="password"]')
      .type('admin123{enter}')

    cy.wait('@loginEnter')

    cy.url()
      .should('include', '/dashboard')
  })


  // INT-008
  it('INT-008 - Mengakses Forgot Password', () => {

    cy.intercept(
      'GET',
      '**/requestPasswordResetCode'
    ).as('forgotPassword')

    cy.visit(loginPage)

    cy.contains('Forgot your password?')
      .click()

    cy.wait('@forgotPassword')

    cy.url()
      .should('include', '/requestPasswordResetCode')
  })

})