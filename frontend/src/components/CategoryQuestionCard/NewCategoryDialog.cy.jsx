import React from 'react'
import NewCategoryDialog from "./NewCategoryDialog.jsx";

describe('<NewCategoryDialog />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-react
        cy.mount(<NewCategoryDialog/>)
    })

    it('should have title', () => {
        cy.mount(<NewCategoryDialog open={true}/>)
        cy.get('[data-cy="base-dialog-title"]').should('have.text', "Neue Kategorie anlegen")
    })

    it('should have an input field for the category name', () => {
        cy.mount(<NewCategoryDialog open={true}/>)
        cy.get('[data-cy="category-form-category-name"] > div > textarea').should('exist')
        cy.get('[data-cy="category-form-category-name"] > div > textarea').should('have.value', '')
    })

    it('should call onSubmit with the correct object when form is submitted', () => {
      const onSubmit = cy.stub()
        cy.mount(<NewCategoryDialog open={true} onSubmit={onSubmit} />)
        cy.get('[data-cy="category-form-category-name"]').type('New Category')
        cy.get('[data-cy="category-form-submit-button"]').click()
        cy.wrap(onSubmit).should('have.been.calledOnce')
        cy.wrap(onSubmit).should('have.been.calledWith', {name: 'New Category'})
    })
})