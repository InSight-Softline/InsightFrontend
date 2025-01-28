import React from 'react'
import ExpandableCard from "./ExpandableCard.jsx";

describe('<CategoryQuestionCard />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-react
        cy.mount(<ExpandableCard  />)
    })

    it('should render title', ()=>{
        cy.mount(<ExpandableCard title="Hello" />)
        cy.get('[data-cy="expandable-card-title"]').should('have.text', 'Hello')
    })

    it('should expand when clicked', ()=>{
        const onExpandChange = cy.stub()
        cy.mount(<ExpandableCard title="Hello" onExpandChange={onExpandChange}/>)
        cy.get('[data-cy="expandable-card-button"]').click()
        cy.wrap(onExpandChange).should('have.been.calledOnce')
    })

    it('should render children when expanded', ()=>{
        cy.mount(<ExpandableCard title="Hello"><div data-cy="child">Child</div></ExpandableCard>)
        cy.get('[data-cy="child"]').should('not.exist')
        cy.get('[data-cy="expandable-card-button"]').click()
        cy.get('[data-cy="child"]').should('exist')
    })

})