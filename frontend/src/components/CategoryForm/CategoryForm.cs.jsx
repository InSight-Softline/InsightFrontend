import React from 'react'
import {CategoryForm} from "./CategoryForm.jsx";

describe('<MyExampleComponent />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-react
        cy.mount(<CategoryForm value={{name: ""}} />)
    })

    it('can render category name', ()=>{
        cy.mount(<CategoryForm value={{name: "Hello"}} />)
        cy.get('[data-cy="category-form-category-name"] > input').should('have.value', 'Hello')
    })

    it('can submit form', ()=>{
        const onSubmit = cy.stub()
        cy.mount(<CategoryForm value={{name: "Hello"}} onSubmit={onSubmit} />)
        cy.get('[data-cy="category-form-submit-button"]').click()
        cy.wrap(onSubmit).should('have.been.calledOnce')
    })

    it('should call onChange with the correct object when name is input', () => {
        const onChangeStub = cy.stub().as('onChangeStub');
        const initialValue = { name: '' };

        cy.mount(
            <CategoryForm
                value={initialValue}
                onChange={onChangeStub}
            />
        );

        const newName = 'Neue Kategorie';

        cy.get('[data-cy="category-form-category-name"]').click().type(newName);

        cy.get('@onChangeStub.all').should('have.callCount', newName.length);
    });

})