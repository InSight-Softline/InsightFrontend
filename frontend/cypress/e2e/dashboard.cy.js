describe('Dashboard Navigation Tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173');
    });

    //TODO change all URLs to relative paths

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

    it('names and links of fetched data works as expected', () => {

        cy.intercept('GET', 'http://localhost:8080/api/v1/audits', {
            statusCode: 200,
            body: [{id: 1, name: 'Maggy'}, {id: 2, name: 'Joan'}]
        }).as('getAudits');

        // Verify buttons with fetched data
        cy.get('[data-cy="data-buttons"]').should('have.length', 2);
        cy.get('[data-cy="data-buttons"]').first().should('contain', 'Maggy');
        cy.get('[data-cy="data-buttons"]').last().should('contain', 'Joan');

        //plus-button
        cy.get('[data-cy="new-audit-button"]').click();
        cy.url().should('eq', 'http://localhost:5173/newAudit');
        cy.go('back');  // Navigate back to the dashboard


    });

});

