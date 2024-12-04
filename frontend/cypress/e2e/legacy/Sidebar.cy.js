describe('Sidebar Navigation', () => {
    beforeEach(() => {
        cy.intercept('GET', '/api/v1/audits', (req) => {
            req.reply({
                statusCode: 200,
                body: [{ id: 1, name: 'Audit 1' }, { id: 2, name: 'Audit 2' }],
            });
          }).as('getAudits');
        cy.visit('http://localhost:5173/#/');
    });

    it('Links are working', () => {

        cy.get('[data-cy="nav-dashboard"]').click()

        cy.url().should('eq', 'http://localhost:5173/#/');
  
    });
});
  