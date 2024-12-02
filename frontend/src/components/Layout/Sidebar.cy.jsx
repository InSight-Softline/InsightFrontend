describe('Sidebar Navigation', () => {
    beforeEach(() => {
      // Die Anwendung oder Seite laden, wo die Sidebar sichtbar ist
      cy.mount(<Sidebar />);
    });
  
    it('should open and close the sidebar when the hamburger icon is clicked', () => {
      // Sidebar sollte initial geschlossen sein
      cy.get('.MuiDrawer-root').should('not.exist');
      
      // Hamburger-Menü-Icon anklicken
      cy.get('button[aria-label="menu"]').click();
  
      // Überprüfen, ob sich die Sidebar geöffnet hat
      cy.get('.MuiDrawer-root').should('be.visible');
  
      // Close-Icon in der Sidebar anklicken
      cy.get('.MuiDrawer-root')
        .find('button[aria-label="menu"]')
        .click();
  
      // Sidebar sollte wieder geschlossen sein
      cy.get('.MuiDrawer-root').should('not.exist');
    });
  });