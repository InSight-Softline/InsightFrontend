describe('Dashboard Navigation Tests', () => {

    //TODO change all URLs to relative paths

    it('Links of the sidebar working', () => {

        cy.visit('http://localhost:5173');

        cy.get('[data-cy="nav-dashboard"]').click()

        cy.url().should('eq', 'http://localhost:5173/');

    });

    // Test when backend is available
    context('Backend is available', () => {
        beforeEach(() => {
            cy.intercept('GET', '/api/v1/audits', (req) => {
                req.reply({
                    statusCode: 200,
                    body: [{ id: 1, name: 'Audit 1' }, { id: 2, name: 'Audit 2' }],
                });
            }).as('getAudits');
            
            cy.visit('http://localhost:5173');
        });

        it('Names and links of fetched data work as expected', () => {
            
            cy.get('[data-cy="data-buttons"]').should('have.length', 2);
            cy.get('[data-cy="data-buttons"]').first().should('contain', 'Audit 1');
            cy.get('[data-cy="data-buttons"]').last().should('contain', 'Audit 2');
        });

        it('Plus button is visible and navigates correctly', () => {
            // Check if the plus icon box is visible
            cy.get('[data-cy="new-audit-button"]').should('be.visible');
            cy.get('[data-cy="new-audit-button"]').click();
            cy.url().should('include', '/newAudit');
        });

    });

    // Test when backend is not available
    context('Backend is not available', () => {
        beforeEach(() => {
            cy.intercept('GET', '/api/v1/audits', {
                statusCode: 500,
                body: { error: "Backend not available" },
            }).as('getAuditsError');
            
            cy.visit('http://localhost:5173');
        });

        it('Plus button is visible and navigates correctly', () => {
            // Check if the plus icon box is visible
            cy.get('[data-cy="new-audit-button"]').should('be.visible');
            cy.get('[data-cy="new-audit-button"]').click();
            cy.url().should('include', '/newAudit');
        });

        it('No data buttons are visible when backend fails', () => {
            
            cy.get('[data-cy="data-buttons"]').should('not.exist'); // No data buttons should be visible
        });
    });
});
