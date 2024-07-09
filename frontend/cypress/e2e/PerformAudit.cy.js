describe('PerformAudit Component', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/v1/audits/1/ratings', {
      statusCode: 200,
      body: [
        { id: 1, question: "Frage 1", points: null, comment: '', na: null },
        { id: 2, question: "Frage 2", points: null, comment: '', na: null },
        { id: 3, question: "Frage 3", points: null, comment: '', na: null }
      ]
    }).as('questions');
    cy.visit('http://localhost:5173/performAudit/1');
  });

  it('should allow typing in all textareas', () => {
    cy.get('[data-cy="commentTextarea"]').each((textarea) => {
      cy.wrap(textarea).click().type('Test');
      cy.wrap(textarea).should('have.value', 'Test');
    });
  });

  it('click all checkboxes', () => {
    cy.get('[type="checkbox"]').check().should('be.checked');
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

describe('PerformAudit Component with fetched data', () => {
  it('presents requested data as expected', () => {
    cy.intercept('GET', '/api/v1/audits/1/ratings', {
      statusCode: 200,
      body: [
        { id: 1, question: "Frage 1", points: 2, comment: 'okay', na: false },
        { id: 2, question: "Frage 2", points: null, comment: 'nachholen', na: null },
        { id: 3, question: "Frage 3", points: null, comment: '', na: true }
      ]
    }).as('questions');
    cy.visit('http://localhost:5173/performAudit/1');
    cy.get('input[type="checkbox"]').eq(0).should('not.be.checked');
    cy.get('input[type="checkbox"]').eq(1).should('not.be.checked');
    cy.get('input[type="checkbox"]').eq(2).should('be.checked');
    cy.get('input[type="checkbox"]').eq(3).should('not.be.checked');
    cy.get('input[type="checkbox"]').eq(4).should('not.be.checked');
    cy.get('input[type="checkbox"]').eq(5).should('not.be.checked');
    cy.get('input[type="checkbox"]').eq(6).should('not.be.checked');
    cy.get('[data-cy=commentTextarea]').should('have.value', 'okay');
  });
});
