describe('User Login and Logout', () => {
  it('should login and display the user name', () => {
    // Visit the login page
    cy.visit('/login');

    // Fill in the login form
    cy.get('input').should('have.length', 2);
    cy.get('input[id="email"]').type('john@example.com');
    cy.get('input[id="password"]').type('password123!');

    // Submit the login form
    cy.get('button[type="submit"]').click();

    // Check if the user is redirected to the home page
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);

    // Check if the user's name is displayed on the home page
    cy.contains('Welcome, John Doe').should('be.visible');

    // Click the logout button
    cy.get('button').contains('Logout').click();

    // Check if the user is redirected to the login page
    cy.url().should('eq', `${Cypress.config().baseUrl}/login`);
  });
});
