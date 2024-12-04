/**
 * Evaluation Page Snapshot Tests
 *
 * This test suite verifies the snapshot rendering of key components on the Evaluation page.
 * The page displays overall progress, as well as progress and ratings across multiple categories.
 * Snapshot tests ensure the visual consistency of the components when changes are made to the code.
 */

describe('Evaluation Page Snapshot Tests', () => {

    /**
     * beforeEach Hook
     *
     * Sets up the state before each test by intercepting a mock API call and visiting the page.
     *
     * 1. The API response for progress data (`/v1/audits/1/progress`) is intercepted and populated with data:
     *    - Overall progress: 85%
     *    - Progress by category:
     *      - Customer Service: 70%
     *      - Product Quality: 90%
     *      - Compliance: 100%
     *      - Safety Standards: 80%
     *      - Employee Satisfaction: 60%
     *    - Question count by rating:
     *      - 0 points: 2 questions
     *      - 1 point: 1 question
     *      - 2 points: 3 questions
     *      - 3 points: 5 questions
     *      - 4 points: 2 questions
     *      - 5 points: 7 questions
     *      - "Not applicable" (n.a.): 3 questions
     *
     * 2. The page is then loaded (`/evaluation/1`), and Cypress waits for the mock API call (`@getProgress`) to complete,
     *    ensuring that all components render with the provided mock data.
     */

    beforeEach(() => {
        cy.intercept('GET', 'http://localhost:8080/api/v1/audits/1/progress', {
            body: {
                overallProgress: 85,
                categoryProgress: {
                    "Customer Service": 70,
                    "Product Quality": 90,
                    "Compliance": 100,
                    "Safety Standards": 80,
                    "Employee Satisfaction": 60,
                },
                questionCountByRating: {
                    0: 2,  // Two questions with 0 points
                    1: 1,  // One question with 1 point
                    2: 3,  // Three questions with 2 points
                    3: 5,  // Five questions with 3 points
                    4: 2,  // Two questions with 4 points
                    5: 7,  // Seven questions with 5 points
                    na: 3  // Three questions marked as "not applicable"
                },
            },
        }).as('getProgress');

        // Visit the Evaluation page and wait for the mock API response
        cy.visit('http://localhost:5173/#/evaluation/1');
        cy.wait('@getProgress');
    });

    /**
     * Snapshot Tests
     *
     * Each test below captures a snapshot of a specific component on the Evaluation page.
     * These snapshots are compared to previously saved snapshots to detect unintended visual changes.
     */

    it('should match snapshot for ProgressBar', () => {
        // Capture snapshot of the overall progress bar component
        cy.compareSnapshot("ProgressBar");
    });

});
