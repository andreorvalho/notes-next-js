describe('User Registration and Login', () => {
  const email = 'andreorvalho@example.com';
  const password = 'Password123!';

  it('should register a new user, redirect to the login page, and login with the new user', () => {
    // Visit the registration page
    cy.visit('/register');

    // Fill in the registration form
    cy.get('input[id="name"]').type('Jane Doe');
    cy.get('input[id="email"]').type(email);
    cy.get('input[id="password"]').type(password);

    // Submit the registration form
    cy.get('button[type="submit"]').click();

    // Check if the user is redirected to the login page
    cy.url().should('eq', `${Cypress.config().baseUrl}/login`);

    // Check if the login page contains the login form
    cy.contains('Login').should('be.visible');

    // Fill in the login form
    cy.get('input[id="email"]').type(email);
    cy.get('input[id="password"]').type(password);

    // Submit the login form
    cy.get('button[type="submit"]').click();

    // Check if the user is redirected to the home page
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);

    // Check if the user's name is displayed on the home page
    cy.contains('Welcome, Jane Doe').should('be.visible');
  });

  afterEach(() => {
    // Delete the user after the test
    cy.request('DELETE', '/api/auth/delete', { email });
  });
});
