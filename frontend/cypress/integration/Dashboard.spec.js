describe('Dashboard Component', () => {
    beforeEach(() => {
      cy.visit('/dashboard'); // Besuche die Dashboard-Seite vor jedem Test
    });
  
    it('should display the title "Dashboard"', () => {
      cy.get('h1').should('contain', 'Dashboard'); // Überprüfe, ob der Titel "Dashboard" angezeigt wird
    });
  
    it('should contain links to different routes', () => {
      cy.get('a[href="/newAudit"]').should('exist'); // Überprüfe, ob ein Link zur Route "/newAudit" existiert
      cy.get('a[href="/"]').should('have.length', 9); // Überprüfe, ob insgesamt 9 Links vorhanden sind
    });
  
    it('should navigate to "/newAudit" when the "Add" link is clicked', () => {
      cy.get('a[href="/newAudit"]').click(); // Klicke auf den "Add" Link
      cy.url().should('include', '/newAudit'); // Überprüfe, ob die URL die Route "/newAudit" enthält
    });
  
    // Weitere Tests können hier hinzugefügt werden, um verschiedene Interaktionen und Funktionen der Dashboard-Komponente zu überprüfen
  });
  