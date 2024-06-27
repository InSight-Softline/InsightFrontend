describe('PerformAudit Component', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5174/performAudit'); // Annahme: Die Anwendung läuft auf localhost:3000
    });
  
    it('should display questions with checkboxes and textarea', () => {
      cy.contains('Audit durchführen').should('exist');
      cy.contains('Frage 1').should('exist');
      cy.contains('Frage 2').should('exist');
      cy.contains('Frage 3').should('exist');
      cy.get('input[type="checkbox"]').should('have.length', 21); // 7 checkboxes per question
      cy.get('textarea').should('have.length', 3); // 3 Textareas
    });
  
    it('should allow typing in the textarea', () => {
      cy.get('textarea').first().type('Test Kommentar');
      cy.get('textarea').first().should('have.value', 'Test Kommentar');
    });
  
    it('should save comment on button click', () => {
      cy.get('textarea').first().type('Test Kommentar');
      cy.contains('Kommentar speichern').first().click();
      cy.get('textarea').first().should('have.value', 'Test Kommentar');
    });
  
    it('should select only one checkbox at a time per question', () => {
      cy.get('input[type="checkbox"]').eq(0).check({ force: true }).should('be.checked');
      cy.get('input[type="checkbox"]').eq(1).check({ force: true }).should('be.checked');
      cy.get('input[type="checkbox"]').eq(0).should('not.be.checked');
    });
  
    it('should mark NA checkbox and disable other checkboxes', () => {
      cy.get('input[type="checkbox"]').eq(6).check({ force: true }).should('be.checked'); // N/A for question 1
      cy.get('input[type="checkbox"]').eq(0).should('not.be.checked');
      cy.get('input[type="checkbox"]').eq(1).should('not.be.checked');
      cy.get('input[type="checkbox"]').eq(2).should('not.be.checked');
      cy.get('input[type="checkbox"]').eq(3).should('not.be.checked');
      cy.get('input[type="checkbox"]').eq(4).should('not.be.checked');
      cy.get('input[type="checkbox"]').eq(5).should('not.be.checked');
    });
  });