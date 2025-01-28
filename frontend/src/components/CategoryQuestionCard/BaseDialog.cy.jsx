import React from 'react'
import {BaseDialog} from "./BaseDialog.jsx";

describe('<BaseDialog />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-react
        cy.mount(<BaseDialog  />)
    })

    it('can be closed', ()=>{
        cy.mount(<BaseDialog open={false}/>)
        cy.get('[data-cy="base-dialog"]').should('not.exist')
    })

    it('can be open', ()=>{
        cy.mount(<BaseDialog open={true}/>)
        cy.get('[data-cy="base-dialog"]').should('be.visible')
    })

    it('can be open with title', ()=>{
        cy.mount(<BaseDialog open={true} title="test title"/>)
        cy.get('[data-cy="base-dialog-title"]').should('have.text', 'test title')
    })

    it('should be closable', ()=>{
        const onClose = cy.stub()
        cy.mount(<BaseDialog open={true} onClose={onClose}/>)
        cy.get('[data-cy="base-dialog-close-button"]').click()
        cy.wrap(onClose).should('have.been.calledOnce')
    })

})