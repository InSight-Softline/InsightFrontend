import React from 'react';

/**
 * Evaluation Page Tests
 *
 * This test suite verifies the correct rendering of the Evaluation page components,
 * including the progress bar and radar chart, with mock API responses.
 */

describe('Evaluation Page Tests', () => {
    /**
     * Sets up the state before each test by intercepting a mock API call and visiting the page.
     * Mock API provides:
     * - Current audit progress
     * - Category progress details
     */
    beforeEach(() => {
        cy.intercept('GET', '/api/v1/audits/1/progress', {
            body: {
                currentAuditProgress: 85,
                categoryProgress: [
                    { categoryName: "Customer Service", currentCategoryProgress: 70 },
                    { categoryName: "Product Quality", currentCategoryProgress: 90 },
                    { categoryName: "Compliance", currentCategoryProgress: 100 },
                    { categoryName: "Safety Standards", currentCategoryProgress: 80 },
                    { categoryName: "Employee Satisfaction", currentCategoryProgress: 60 },
                ],
            },
        }).as('getProgress');

        // Visit the Evaluation page and wait for the mock API response
        cy.visit('http://localhost:5173/#/evaluation/1');
        cy.wait('@getProgress');
    });

    /**
     * Verifies that the ProgressBar displays the correct data.
     */
    it('sollte den korrekten Fortschritt im Fortschrittsbalken anzeigen', () => {
        cy.get('[data-cy="CurrentProgressBar"]').should('be.visible');
        cy.get('[data-cy="CurrentProgressBar"]').contains('85%').should('be.visible');
    });


    /**
     * Verifies that the RadarChart exists.
     */
    it('sollte das RadarChart anzeigen', () => {
        cy.get('[data-cy="RadarChart"]').should('be.visible');
    });

});
