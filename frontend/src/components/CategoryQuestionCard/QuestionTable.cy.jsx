import React from 'react'
import QuestionTable from "./QuestionTable.jsx";

describe('<QuestionTable />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-react
        cy.mount(<QuestionTable/>)
    })

    it('should render table', () => {
        cy.mount(<QuestionTable questions={[]}/>)
        cy.get('[data-cy="question-table"]').should('exist')
    })

    it('should render table with questions', () => {
        cy.mount(<QuestionTable questions={[{id: 1, name: "question"}, {id: 2, name: "question2"}]}/>)
        cy.get('[data-cy="question-table-row"]').should('have.length', 2)
    })

    it('should call onNew when new is clicked', () => {
        const onNew = cy.stub()
        cy.mount(<QuestionTable questions={[]} onNew={onNew}/>)
        cy.get('[data-cy="question-table-new-button"]').click()
        cy.wrap(onNew).should('have.been.calledOnce')
    })

    it('should call onDelete when delete is clicked', () => {
        const onDelete = cy.stub()
        cy.mount(<QuestionTable questions={[{id: 1, name: "question"}]} onDelete={onDelete}/>)
        cy.get('[data-cy="question-table-delete-button"]').click()
        cy.wrap(onDelete).should('have.been.calledOnce')
    })
})