describe('Evaluation Page Tests', () => {
    beforeEach(() => {
        // Visit the Evaluation page
        cy.visit('http://localhost:5173/#/evaluation/1');
    });

    it('should display ratings for audit ID 1 and render components correctly', () => {
        // Mock API response for ratings
        cy.intercept('GET', 'http://localhost:8080/api/v1/audits/1/ratings', {
            body: [
                {
                    category: { name: 'baum', id: 1 },
                    comment: 'irrelevant',
                    na: false,
                    points: 0,
                    question: 'Erste Frage',
                },
                {
                    category: { name: 'baum', id: 1 },
                    comment: 'irrelevant',
                    na: false,
                    points: 3,
                    question: 'Zweite Frage',
                },
                {
                    category: { name: 'nicht baum', id: 2 },
                    comment: 'irrelevant',
                    na: false,
                    points: 5,
                    question: 'Dritte Frage',
                },
            ],
        }).as('getRatings');

        // Mock API response for progress data
        cy.intercept('GET', 'http://localhost:8080/api/v1/audits/1/progress', {
            body: {
                overallProgress: 75,
                categoryProgress: {
                    baum: 50,
                    'nicht baum': 100,
                },
                questionCountByRating: {
                    0: 1,
                    3: 1,
                    5: 1,
                },
            },
        }).as('getProgress');

        // Wait for the mock API calls
        cy.wait('@getRatings');
        cy.wait('@getProgress');

        // Check if the overall progress bar displays correctly
        cy.get('#result').within(() => {
            cy.get('div').contains('Gesamtfortschritt'); // Check for label
            cy.get('.MuiLinearProgress-bar').should('exist'); // Check for progress bar
        });

        // Check if circular progress charts for categories are rendered
        cy.get('.w-full').within(() => {
            cy.contains('baum').should('exist'); // Check for category name
            cy.contains('nicht baum').should('exist'); // Check for another category
        });

        // Check if the bar chart displays the correct data
        cy.get('.max-w-full').within(() => {
            cy.get('canvas').should('exist'); // Ensure the chart is rendered
        });

        // Verify specific text values
        cy.contains('Evaluation').should('exist'); // Title check
        cy.contains('Gesamtfortschritt').should('exist'); // Overall progress
        cy.contains('75%').should('exist'); // Overall progress percentage
    });
});
