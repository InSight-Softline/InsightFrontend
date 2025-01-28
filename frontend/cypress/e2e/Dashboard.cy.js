describe('Dashboard Navigation Tests', () => {
    context('Backend is available', () => {
        beforeEach(() => {
            // Intercept für die initiale Datenabfrage
            cy.intercept(
                'GET',
                '/api/v1/audits?sortBy=createdAt&sortDirection=desc',
                {
                    statusCode: 200,
                    body: [
                        { id: 1, name: 'Audit 1' },
                        { id: 2, name: 'Audit 2' },
                        { id: 3, name: 'Example Audit' },
                        { id: 4, name: 'Failed Audit' },
                    ],
                }
            ).as('getAudits');

            // Intercept für die gefilterte Suche
            cy.intercept(
                'GET',
                '/api/v1/audits?search=Example+Audit&sortBy=createdAt&sortDirection=desc',
                {
                    statusCode: 200,
                    body: [{ id: 3, name: 'Example Audit' }],
                }
            ).as('getFilteredAudits');

            // Seite besuchen
            cy.visit('http://localhost:5173/#');
        });

        it('Names and links of fetched data work as expected', () => {
            cy.wait('@getAudits'); // Warte auf die initiale Datenabfrage

            // Überprüfen, dass alle Audits angezeigt werden
            cy.get('[data-cy="data-buttons"]').should('have.length', 4);
            cy.get('[data-cy="data-buttons"]').eq(0).should('contain', 'Audit 1');
            cy.get('[data-cy="data-buttons"]').eq(1).should('contain', 'Audit 2');
            cy.get('[data-cy="data-buttons"]').eq(2).should('contain', 'Example Audit');
            cy.get('[data-cy="data-buttons"]').eq(3).should('contain', 'Failed Audit');
        });

        it('Search field exists and works correctly', () => {
            cy.wait('@getAudits'); // Warte auf die initiale Datenabfrage

            // Suchfeld überprüfen
            cy.get('[data-cy="dashboard-search-field"]').should('exist').should('be.visible');
            cy.get('[data-cy="dashboard-search-field"]').type('Example Audit'); // Suchtext eingeben

            // Warte auf die gefilterte Anfrage
            cy.wait('@getFilteredAudits', { timeout: 10000 });

            // Überprüfen, dass nur "Example Audit" angezeigt wird
            cy.get('[data-cy="data-buttons"]').should('have.length', 1);
            cy.get('[data-cy="data-buttons"]').first().should('contain', 'Example Audit');
        });
    });

    context('Backend is not available', () => {
        beforeEach(() => {
            // Intercept für Backend-Fehler
            cy.intercept(
                'GET',
                '/api/v1/audits?sortBy=createdAt&sortDirection=desc',
                {
                    statusCode: 500,
                    body: { error: "Backend not available" },
                }
            ).as('getAuditsError');

            // Seite besuchen
            cy.visit('http://localhost:5173/#');
        });

        it('Plus button is visible and navigates correctly', () => {
            // Plus-Button überprüfen
            cy.get('[data-cy="new-audit-button"]').should('be.visible');
            cy.get('[data-cy="new-audit-button"]').click();
            cy.url().should('include', '/new-audit');
        });

        it('No data buttons are visible when backend fails', () => {
            cy.wait('@getAuditsError'); // Warte auf Backend-Fehler

            // Sicherstellen, dass keine Daten angezeigt werden
            cy.get('[data-cy="data-buttons"]').should('not.exist');
        });

        it('should display error correctly if GET request fails', () => {
            cy.wait('@getAuditsError'); // Warte auf Backend-Fehler

            // Fehleranzeige überprüfen
            cy.contains('Fehler').should('be.visible');
        });
    });
});
