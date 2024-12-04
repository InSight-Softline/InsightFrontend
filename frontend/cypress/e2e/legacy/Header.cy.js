describe("Header Test", () => {
  it("Visits InSight (Localhost)", () => {
    cy.visit("http://localhost:5173/#");
  });

  it('look for the heading "InSight"', () => {
    cy.visit("http://localhost:5173/#");
    cy.contains("InSight");
  });

  it("renders the logo image", () => {
    cy.visit("http://localhost:5173");
    cy.get('img[alt="InSight Logo"]')
      .should("have.attr", "src")
      .should("include", "logo-insight.png");
    cy.get('img[alt="InSight Logo"]').should(
      "have.attr",
      "alt",
      "InSight Logo",
    );
  });
});
