describe('<Header />', () => {
  it("Visits InSight (Localhost)", () => {
    cy.visit("http://localhost:5173/#");
    cy.url().should("include", "localhost:5173");
  });

  it('Looks for the heading "InSight"', () => {
    cy.visit("http://localhost:5173/#");
    cy.contains("InSight").should("be.visible");
  });

  it("Renders the logo image", () => {
    cy.visit("http://localhost:5173/#");
    cy.get('img[alt="InSight Logo"]')
      .should("be.visible")
      .and("have.attr", "src")
      .and("include", "logo-insight.png");
    cy.get('img[alt="InSight Logo"]').should("have.attr", "alt", "InSight Logo");
  });
});
