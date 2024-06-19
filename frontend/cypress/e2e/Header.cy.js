describe('Header Test', () => {

  it('Visits InSight (Localhost)', () => {
    cy.visit('http://localhost:5173')
  })

  it('look for the heading "InSight"', () => {
    cy.visit('http://localhost:5173')
    cy.contains('InSight')
  })

  it('Logo loaded correctly', () => {
    cy.visit('http://localhost:5173');
    cy.get('img#softline-logo') 
      .should('be.visible')
      .and(($img) => {
        // Prüfe, ob das Bild eine natürliche Breite und Höhe hat
        expect($img[0].naturalWidth).to.be.greaterThan(0);
        expect($img[0].naturalHeight).to.be.greaterThan(0);
      });
  });
  
})