describe("NewAudit Page Tests", () => {

  // Test when backend is available
  context("Backend is available", () => {
    beforeEach(() => {
      cy.intercept("GET", "/api/v1/categories", (req) => {
        req.reply({
          statusCode: 200,
          body: [
            { id: 1, name: "Category 1" },
            { id: 2, name: "Category 2" },
          ],
        });
      }).as("getCategories");

      cy.visit("http://localhost:5173/newAudit");
    });

    it("Categories are fetched and displayed correctly", () => {
      cy.get(".cursor-grab").should("have.length", 2);
      cy.get(".cursor-grab").first().should("contain", "Category 1");
      cy.get(".cursor-grab").last().should("contain", "Category 2");
    });

    it("Search input and next button are visible", () => {
      cy.get('input[type="text"]').should("be.visible");
      cy.get('label').contains('Audit Name').should('exist').and('be.visible');
      cy.get("button").contains("Audit erstellen").should("be.visible");
    });
  });

  context("Backend is not available", () => {
    beforeEach(() => {
      cy.intercept("GET", "/api/v1/categories", {
        statusCode: 500,
        body: { error: "Backend not available" },
      }).as("getCategoriesError");

      cy.visit("http://localhost:5173/newAudit");
    });

    it("should display error message when backend is not available", () => {
      cy.contains("Fehler: Request failed with status code 500").should(
        "be.visible",
      );
    });
  });
});
describe('New Audit Creation', () => {
  beforeEach(() => {
    
    cy.visit('http://localhost:5173/newAudit');
  });

  it('should create a new audit and navigate to perform audit page', () => {
    cy.intercept('POST', '/performAudit/', {
      statusCode: 201,
      body: { id: '12345' } 
    }).as('createAudit');

    cy.get('[data-cy="NewAudit"]').should('exist');

    cy.get('[data-cy="NewAudit"]').type('Test Audit');

    cy.get('button').contains('Audit erstellen').click();
    

    cy.url().should('include', '/performAudit/');
  });
});
