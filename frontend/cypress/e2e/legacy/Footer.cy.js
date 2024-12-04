describe('Footer test', () => {
  it('Visits InSight (Localhost)', () => {
    cy.visit('http://localhost:5173/#/')
    cy.get('footer')
    cy.get('.text-sm') 
  })

 
  

})

