describe('NewAudit Component', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/newAudit');
    });
  
    it('should render the search input and button', () => {
      cy.get('input[type="search"]').should('be.visible');
      cy.get('button').should('be.visible');
      cy.get('button').find('svg').should('exist');
    });
  
    it('should render the cards in the correct columns', () => {
      cy.contains('Verfügbar kategorien')
        .parent()
        .should('be.visible');
  
      cy.contains('Ausgewählte kategorien')
        .parent()
        .should('be.visible');
    });
  
    it('should render the columns with correct titles', () => {
      cy.contains('Verfügbar kategorien').should('be.visible');
      cy.contains('Ausgewählte kategorien').should('be.visible');
    });
  
    it('should drag and drop a card from Verfügbar kategorien to Ausgewählte kategorien', () => {
     
        cy.contains('Ausgewählte kategorien')
        .should('be.visible')
        .trigger('dragover')
        .trigger('drop', { dataTransfer: new DataTransfer() });
  
        cy.wait(1000); // Wait for the drop event to be processed 
    });
  });