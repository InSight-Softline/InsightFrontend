describe('Evaluation Page Tests', () => {
    beforeEach(() => {
        // Visit the Evaluation page
        cy.visit('http://localhost:5173/evaluation/1');
    });

    it('Links are working', () => {
        cy.get('[data-cy="nav-dashboard"]').click();
        cy.url().should('eq', 'http://localhost:5173/');
    });

    it('should display ratings for audit ID 1', () => {
        // Setup intercept for the ratings API call
        cy.intercept('GET', 'http://localhost:8080/api/v1/audits/1/ratings', {
            body: [
                {
                    category: {name: 'baum', id: 1},
                    comment: 'irrelevant',
                    na: false,
                    points: 0,
                    question: 'Erste Frage',
                },
                {
                    category: {name: 'baum', id: 1},
                    comment: 'irrelevant',
                    na: false,
                    points: 3,
                    question: 'Zweite Frage',
                },
                {
                    category: {name: 'nicht baum', id: 2},
                    comment: 'irrelevant',
                    na: false,
                    points: 5,
                    question: 'Dritte Frage',
                },
            ],
        }).as('getRatings');
    });
});


