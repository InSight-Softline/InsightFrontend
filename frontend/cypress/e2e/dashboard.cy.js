describe('Dashboard Navigation Tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173');
    });

    it('should find and click the main links to the subpages', () => {
        cy.contains('Dashboard').click();
        cy.url().should('include', 'http://localhost:5173');

        cy.contains('NewAudit').click();
        cy.url().should('include', '/newAudit');

        cy.contains('PerformAudit').click();
        cy.url().should('include', '/performAudit');

        cy.contains('Evaluation').click();
        cy.url().should('include', '/evaluation');
    });

    it('should navigate to the New Audit page when the first box is clicked', () => {
        cy.get('a[href="/newAudit"]').first().click();
        cy.url().should('include', '/newAudit');
    });
    
});

