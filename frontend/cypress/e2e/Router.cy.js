describe('Router', () => {

  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('Visits sides', () => {

    cy.contains('Dashboard').click()

    cy.contains('New Audit').click()

    cy.contains('Perform Audit').click()

    cy.contains('Evaluation').click()

    

   
    
  })
})