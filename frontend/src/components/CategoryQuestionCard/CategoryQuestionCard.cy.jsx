import React from 'react'
import CategoryQuestionCard from "./CategoryQuestionCard.jsx";

describe('<CategoryQuestionCard />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-react
        cy.mount(<CategoryQuestionCard/>)
    })

    it('can render category name', () => {
        cy.mount(<CategoryQuestionCard category={{name: "Hello"}}/>)
        cy.get('[data-cy="expandable-card-title"]').should('have.text', 'Hello')
    })

    it('can render show children when expanded', () => {
        cy.mount(<CategoryQuestionCard category={{name: "Hello"}}>
            <div data-cy="child">Child</div>
        </CategoryQuestionCard>)
        cy.get('[data-cy="child"]').should('not.exist')
        cy.get('[data-cy="expandable-card-button"]').click()
        cy.get('[data-cy="child"]').should('exist')
    })

    it('should render question table when no children are provided', () => {
        cy.mount(<CategoryQuestionCard category={{name: "Hello"}} questions={[]}/>)
        cy.get('[data-cy="question-table"]').should('not.exist')
        cy.get('[data-cy="expandable-card-button"]').click()
        cy.get('[data-cy="question-table"]').should('exist')
    })

    it('should call onOpen when expanded', () => {
        const onOpen = cy.stub()
        cy.mount(<CategoryQuestionCard category={{name: "Hello"}} questions={[]} onOpen={onOpen}/>)
        cy.get('[data-cy="expandable-card-button"]').click()
        cy.wrap(onOpen).should('have.been.calledOnce')
    })

    it('should call onAddQuestion when new is clicked', () => {
        const onAddQuestion = cy.stub()
        cy.mount(<CategoryQuestionCard category={{name: "Hello"}} questions={[]} onAddQuestion={onAddQuestion}/>)
        cy.get('[data-cy="expandable-card-button"]').click()
        cy.get('[data-cy="question-table-new-button"]').click()
        cy.wrap(onAddQuestion).should('have.been.calledOnce')
    })

    it('should call onDeleteQuestion when delete is clicked', () => {
      const onDeleteQuestion = cy.stub()
      cy.mount(<CategoryQuestionCard category={{name: "Hello"}} questions={[{id: 1, name: "question"}]} onDeleteQuestion={onDeleteQuestion}/>)
        cy.get('[data-cy="expandable-card-button"]').click()
        cy.get('[data-cy="question-table-delete-button"]').click()
        cy.wrap(onDeleteQuestion).should('have.been.calledOnce')
    })

})