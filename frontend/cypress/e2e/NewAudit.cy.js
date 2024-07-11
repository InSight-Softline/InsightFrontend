describe('New Audit Creation', () => {
  beforeEach(() => {
    // Besuche die Seite für die Erstellung eines neuen Audits
    cy.visit('http://localhost:5173/newAudit');
  });

  it('should create a new audit and navigate to perform audit page', () => {
    // Mock für die POST-Anfrage an /v1/audits/new
    cy.intercept('POST', '/v1/audits/new', {
      statusCode: 201,
      body: { id: '12345' } // Beispiel-ID für das neue Audit
    }).as('createAudit');

    cy.get('input[type="text"][placeholder="Name"]')
      .should('exist');

    // Eingabe des Audit-Namens
    cy.get('input[type="text"][placeholder="Name"]').type('Test Audit');

    // Verschiebe eine Kategorie zu "Ausgewählte Kategorien"
    // Hier wird angenommen, dass Kategorien per Drag-and-Drop verschoben werden
    // Du musst den genauen Selector und Drag-and-Drop-Logik anpassen
    cy.get('[data-column="Verfügbare Kategorien"] .card').first().trigger('dragstart');
    cy.get('[data-column="Ausgewählte Kategorien"]').trigger('drop');

    // Klicke auf den Button zum Erstellen eines neuen Audits
    cy.get('button').contains('Audit erstellen').click();

    // Warten auf den Mock-Request und Überprüfen der Weiterleitung
    cy.wait('@createAudit').its('request.body').should('include', {
      name: 'Test Audit'
    });
    
    // Überprüfen der Navigation zur neuen Audit-Seite
    cy.url().should('include', '/performAudit/12345');
  });
});

describe("NewAudit Page Tests", () => {
  // TODO: change all URLs to relative paths

  it("Links of the sidebar working", () => {
    cy.visit("http://localhost:5173");

    cy.get('[data-cy="nav-dashboard"]').click();
    cy.url().should("eq", "http://localhost:5173/");

    cy.get('[data-cy="nav-newAudit"]').click();
    cy.url().should("eq", "http://localhost:5173/newAudit");

    cy.get('[data-cy="nav-performAudit"]').click();
    cy.url().should("eq", "http://localhost:5173/performAudit");

    cy.get('[data-cy="nav-evaluation"]').click();
    cy.url().should("eq", "http://localhost:5173/evaluation");
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
