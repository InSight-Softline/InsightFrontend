Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

describe('Dashboard Navigation Tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173');
        cy.wait(5000); // Wartezeit von 5 Sekunden nach dem Besuch der Seite
    });

    afterEach(() => {
        cy.screenshot(); // Screenshot nach jedem Test
    });

    it('should find and click the main links to the subpages', () => {
        cy.contains('Dashboard', { timeout: 10000 }).should('be.visible').click();
        cy.url().should('include', 'http://localhost:5173').then((url) => {
            cy.log('Current URL:', url);
        });

        cy.contains('NewAudit', { timeout: 10000 }).should('be.visible').click();
        cy.url().should('include', '/newAudit').then((url) => {
            cy.log('Current URL:', url);
        });

        cy.contains('PerformAudit', { timeout: 10000 }).should('be.visible').click();
        cy.url().should('include', '/performAudit').then((url) => {
            cy.log('Current URL:', url);
        });

        cy.contains('Evaluation', { timeout: 10000 }).should('be.visible').click();
        cy.url().should('include', '/evaluation').then((url) => {
            cy.log('Current URL:', url);
        });
    });

    it('should navigate to the New Audit page when the first box is clicked', () => {
        cy.get('a[href="/newAudit"]', { timeout: 10000 }).should('be.visible').first().click();
        cy.url().should('include', '/newAudit').then((url) => {
            cy.log('Current URL:', url);
        });
    });

    it('should stay on the same page when other boxes are clicked', () => {
        for (let i = 1; i <= 9; i++) {
            cy.get(`a[href="/"]`, { timeout: 10000 }).eq(i).should('be.visible').click();
            cy.url().should('eq', 'http://localhost:5173/').then((url) => {
                cy.log(`Clicked link ${i}, Current URL:`, url);
            });
        }
    });
});