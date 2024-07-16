describe('Sidebar Navigation', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/');
    });

    it('Links are working', () => {

        cy.get('[data-cy="nav-dashboard"]').click()

        cy.url().should('eq', 'http://localhost:5173/');

        cy.get('[data-cy="nav-newAudit"]').click()

        cy.url().should('eq', 'http://localhost:5173/newAudit');

        cy.get('[data-cy="nav-performAudit"]').click()

        cy.url().should('eq', 'http://localhost:5173/performAudit');

        cy.get('[data-cy="nav-evaluation"]').click()

        cy.url().should('eq', 'http://localhost:5173/evaluation');


    });
});
  