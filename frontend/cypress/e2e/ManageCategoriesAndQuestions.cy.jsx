describe('ManageCategoriesAndQuestions Page', () => {
    beforeEach(() => {
        cy.intercept('GET', '/api/v1/categories', {
            statusCode: 200,
            body: [
                {
                    id: 1,
                    name: 'Category 1',
                },
                {
                    id: 2,
                    name: 'Category 2',
                },
                {
                    id: 3,
                    name: 'Category 3',
                },
            ],
        }).as('getCategories');
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

    describe('Import functionality', () => {
        it('should show file input when clicking the "Daten importieren" button', () => {
            cy.get('[data-cy="ImportQuestionsButton"]').click();
            cy.get('input[type="file"]').should('be.visible');
            cy.get('[data-cy="ImportQuestionsButton"]').should('have.text', "Hochladen");

        });

        it('should allow selecting a CSV file', () => {
            cy.get('[data-cy="ImportQuestionsButton"]').click();

            cy.get('input[type="file"]').attachFile('sample.csv');
            cy.get('input[type="file"]').then((input) => {
                expect(input[0].files[0].name).to.equal('sample.csv');
            });
        });

        it('should trigger file upload and handle a successful response', () => {
            cy.get('[data-cy="ImportQuestionsButton"]').click();

            cy.intercept('POST', '/api/v1/database/import', {
                statusCode: 200,
            }).as('fileUpload');

            cy.get('input[type="file"]').attachFile('sample.csv');
            cy.get('[data-cy="ImportQuestionsButton"]').click();

            cy.wait('@fileUpload').its('response.statusCode').should('eq', 200);

            cy.contains('Upload erfolgreich!').should('be.visible');
        });

        it('should handle file upload errors gracefully', () => {
            cy.get('[data-cy="ImportQuestionsButton"]').click();

            cy.intercept('POST', `/api/v1/database/import`, {
                statusCode: 500,
                body: { message: 'Server error' },
            }).as('fileUploadError');

            cy.get('input[type="file"]').attachFile('sample.csv');
            cy.get('[data-cy="ImportQuestionsButton"]').click();

            cy.wait('@fileUploadError').its('response.statusCode').should('eq', 500);

            cy.contains('Upload fehlgeschlagen.').should('be.visible');
        });
    });
});