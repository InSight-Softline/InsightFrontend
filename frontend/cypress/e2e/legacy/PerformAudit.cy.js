export const interceptGET = (points, na, comment) => {
  cy.intercept('GET', '/api/v1/audits/1/ratings', {
    statusCode: 200,
    body: [
      { id: 1, question: "Frage 1", points: points, comment: comment, na: na },
    ]
  }).as('questions');
};

export const interceptPATCH = (points, na, comment) => {
  cy.intercept('PATCH', '/v1/ratings/0', {
    statusCode: 200,
    body: [{ id: 1, question: "Frage 1", points: points, comment: comment, na: na}]
  });
};

describe('PerformAudit Component', () => {
  beforeEach(() => {
    interceptGET(null, null, '');
    cy.visit('http://localhost:5173/#/performAudit/1');
  });

  it('should allow typing in all textareas', () => {
    interceptPATCH(null, null, 'Test');
    cy.get('[data-cy="commentTextarea"]').first().click().type('Test');
    cy.get('[data-cy="commentTextarea"]').first().should('have.value', 'Test');
  });

  it('click all checkboxes', () => {
    cy.get('[type="checkbox"]').check({ force: true }).should('be.checked');
  });

  it('should select only one checkbox at a time per question', () => {
    cy.get('input[type="checkbox"]').eq(0).check().should('be.checked');
    cy.get('input[type="checkbox"]').eq(1).check().should('be.checked');
    cy.get('input[type="checkbox"]').eq(0).should('not.be.checked');
  });

  it('should mark NA checkbox and disable other checkboxes', () => {
    cy.get('input[type="checkbox"]').eq(6).check().should('be.checked'); // N/A for question 1
    cy.get('input[type="checkbox"]').eq(0).should('not.be.checked');
    cy.get('input[type="checkbox"]').eq(1).should('not.be.checked');
    cy.get('input[type="checkbox"]').eq(2).should('not.be.checked');
    cy.get('input[type="checkbox"]').eq(3).should('not.be.checked');
    cy.get('input[type="checkbox"]').eq(4).should('not.be.checked');
    cy.get('input[type="checkbox"]').eq(5).should('not.be.checked');
  });

  it('should have a button that navigates to the evaluation page', () => {
    cy.get('button').contains('Bewertung anzeigen').should('be.visible').click();
    cy.url().should('include', '/evaluation/1');
  });
});

describe('PerformAudit Component with fetched data', () => {
  it('presents requested data as expected', () => {
    interceptGET(2, false, 'okay');
    cy.visit('http://localhost:5173/#/performAudit/1');
    
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

describe('PATCH request', () => {
  beforeEach(() => {
    interceptGET(null, null, '');
    cy.visit('http://localhost:5173/#/performAudit/1');
    });
  
  it('Rating: null/null -> 3/false -> null/null', () => {
    interceptPATCH(3, false, '');
    cy.get('input[type="checkbox"]').eq(3).check().should('be.checked');

    cy.get('input[type="checkbox"]').eq(0).should('not.be.checked');
    cy.get('input[type="checkbox"]').eq(1).should('not.be.checked');
    cy.get('input[type="checkbox"]').eq(2).should('not.be.checked');
    cy.get('input[type="checkbox"]').eq(3).should('be.checked');
    cy.get('input[type="checkbox"]').eq(4).should('not.be.checked');
    cy.get('input[type="checkbox"]').eq(5).should('not.be.checked');
    cy.get('input[type="checkbox"]').eq(6).should('not.be.checked');

    cy.get('input[type="checkbox"]').eq(3).uncheck().should('not.be.checked');
    interceptPATCH(null, null, '');
    cy.get('input[type="checkbox"]').eq(3).should('not.be.checked');
    cy.get('input[type="checkbox"]').eq(6).should('not.be.checked');
  });

  it('Rating: null/null -> null/true -> null/null', () => {
    cy.get('input[type="checkbox"]').eq(6).check().should('be.checked');
    interceptPATCH(null, true, '');

    cy.get('input[type="checkbox"]').eq(0).should('not.be.checked');
    cy.get('input[type="checkbox"]').eq(1).should('not.be.checked');
    cy.get('input[type="checkbox"]').eq(2).should('not.be.checked');
    cy.get('input[type="checkbox"]').eq(3).should('not.be.checked');
    cy.get('input[type="checkbox"]').eq(4).should('not.be.checked');
    cy.get('input[type="checkbox"]').eq(5).should('not.be.checked');
    cy.get('input[type="checkbox"]').eq(6).should('be.checked');

    cy.get('input[type="checkbox"]').eq(6).uncheck().should('not.be.checked');
    interceptPATCH(null, null, '');
    cy.get('input[type="checkbox"]').eq(6).should('not.be.checked');
  });

  it('Rating: 3/false -> null/true -> 3/false', () => {
    interceptPATCH(3, false, '');
    cy.get('input[type="checkbox"]').eq(3).check().should('be.checked');

    interceptPATCH(null, true, '');
    cy.get('input[type="checkbox"]').eq(6).check().should('be.checked');
    
    cy.get('input[type="checkbox"]').eq(0).should('not.be.checked');
    cy.get('input[type="checkbox"]').eq(1).should('not.be.checked');
    cy.get('input[type="checkbox"]').eq(2).should('not.be.checked');
    cy.get('input[type="checkbox"]').eq(3).should('not.be.checked');
    cy.get('input[type="checkbox"]').eq(4).should('not.be.checked');
    cy.get('input[type="checkbox"]').eq(5).should('not.be.checked');
    cy.get('input[type="checkbox"]').eq(6).should('be.checked');

    interceptPATCH(3, false, '');
    cy.get('input[type="checkbox"]').eq(3).check().should('be.checked');
   
    cy.get('input[type="checkbox"]').eq(3).should('be.checked');
    cy.get('input[type="checkbox"]').eq(6).should('not.be.checked');
  });

  it('Rating: type comment', () => {
    interceptPATCH(3, false, '');
    cy.get('[data-cy="commentTextarea"]').first().click().type('a');
    cy.get('[data-cy="commentTextarea"]').should('have.value', 'a');
    });

  it('should have a button that navigates to the evaluation page', () => {
    cy.get('button').contains('Bewertung anzeigen').should('be.visible').click();
    cy.url().should('include', '/evaluation/1');
  });
});
