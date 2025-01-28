import React from 'react'
import NewQuestionDialog from "./NewQuestionDialog.jsx";

describe('<NewQuestionDialog />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-react
        cy.mount(<NewQuestionDialog/>)
    })

    it('should have title', () => {
        cy.mount(<NewQuestionDialog open={true}/>)
        cy.get('[data-cy="base-dialog-title"]').should('have.text', "Neue Frage anlegen")
    })

    it('should have an input field for the question name and select for category', () => {
      cy.mount(<NewQuestionDialog open={true}/>)
        cy.get('[data-cy="question-form-question-name"] > div > textarea').should('exist')
        cy.get('[data-cy="question-form-question-name"] > div > textarea').should('have.value', '')
        cy.get('[data-cy="question-form-category-select"]').should('exist')
        cy.get('[data-cy="question-form-category-select"]').should('have.value', '')
    })

    it('should call onSubmit with the correct object when form is submitted', () => {
          const onSubmit = cy.stub()
        cy.mount(<NewQuestionDialog open={true} onSubmit={onSubmit} availableCategories={[{id: 1, name: "Test Category"}]}/>)
        cy.get('[data-cy="question-form-question-name"]').type('New Question')
        cy.get('[data-cy="question-form-category-select"]').click()
        cy.get('[data-cy="question-form-category-item"]').first().click()
        cy.get('[data-cy="question-form-submit-button"]').click()
        cy.wrap(onSubmit).should('have.been.calledOnce')
        cy.wrap(onSubmit).should('have.been.calledWith', {name: 'New Question', category: 1})   })
})