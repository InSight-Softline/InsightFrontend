describe('ManageCategoriesAndQuestions Page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/#/manage-categories-and-questions');
    });

    it('should display the page title correctly', () => {
        cy.get('h4').should('contain.text', 'Kategorien und Fragen verwalten').should('be.visible');
    });

    it('should display export and import buttons', () => {
        cy.get('[data-cy="ExportQuestionsButton"]').should('be.visible').and('contain', 'Daten exportieren');
        cy.get('[data-cy="ImportQuestionsButton"]').should('be.visible').and('contain', 'Daten importieren');
    });

    it('should trigger export functionality and handle success response', () => {
        cy.get('[data-cy="ExportQuestionsButton"]').click();

        const downloadsFolder = Cypress.config('downloadsFolder');
        cy.readFile(`${downloadsFolder}/DatabaseExport.csv`).should('exist');

    });

    // ToDo: Add tests for import button
    it('should trigger import functionality', () => {
        cy.get('[data-cy="ImportQuestionsButton"]').click();
    });
});