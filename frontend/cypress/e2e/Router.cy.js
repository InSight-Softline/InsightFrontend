describe('Router', () => {
  it('Visits sides', () => {
    cy.visit('http://localhost:5173/')

    cy.contains('Dashboard').click()

    cy.contains('NewAudit').click()

    cy.contains('PerformAudit').click()

    cy.contains('Evaluation').click()

    

   
    
  })
})