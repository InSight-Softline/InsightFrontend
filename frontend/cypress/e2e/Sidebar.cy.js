describe('Sidebar Navigation', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/');
    });

    it('Links are working', () => {

      cy.getBySel('nav-dashboard').click()

      cy.url().should('eq', 'http://localhost:5173/');

      cy.getBySel('nav-newAudit').click()

      cy.url().should('eq', 'http://localhost:5173/newAudit');

      cy.getBySel('nav-performAudit').click()

      cy.url().should('eq', 'http://localhost:5173/performAudit');

      cy.getBySel('nav-evaluation').click()

      cy.url().should('eq', 'http://localhost:5173/evaluation');
  
      
    });
  });
  