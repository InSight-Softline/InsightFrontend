describe('Sidebar Navigation', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/');
    });

    it('Links are working', () => {

        cy.get('[data-cy="nav-dashboard"]').click()

        cy.url().should('eq', 'http://localhost:5173/');



    });
});
  