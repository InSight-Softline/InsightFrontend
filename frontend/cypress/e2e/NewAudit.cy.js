describe("NewAudit Page Tests", () => {
  // TODO: change all URLs to relative paths

  it("Links of the sidebar working", () => {
    cy.visit("http://localhost:5173");

    cy.get('[data-cy="nav-dashboard"]').click();
    cy.url().should("eq", "http://localhost:5173/");
  });

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
      cy.get('input[type="text"]').should("have.attr", "placeholder", "Name");
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
    

  it('should create a new audit and navigate to perform audit page', () => {
    cy.intercept('POST', '/api/v1/audits/new', {
      statusCode: 201,
      body: { id: '12345' } 
    }).as('createAudit');

    cy.get('input[placeholder="Name"]').type('Test Audit');

    cy.get('[data-cy="NewAudit"]').click();
    
    cy.wait('@createAudit').then((interception) => {
      expect(interception.response.statusCode).to.eq(201);
      cy.url().should('include', '/performAudit/12345'); 
    });
  });
});
