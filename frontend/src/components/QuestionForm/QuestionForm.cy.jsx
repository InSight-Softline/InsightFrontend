import React from 'react'
import {QuestionForm} from "./QuestionForm.jsx";

describe('<QuestionForm />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<QuestionForm value={{name: "", category: ""}} />)
  })

  it('can render question name', ()=>{
    cy.mount(<QuestionForm value={{name: "Hello", category: ""}} />)
    cy.get('[data-cy="question-form-question-name"] > div > textarea').should('have.value', 'Hello')
  })

  it('can render category options', ()=>{
    cy.mount(<QuestionForm value={{name: "", category: ""}} categoryOptions={[{id: 1, name: "Category 1"}, {id: 2, name: "Category 2"}]} />)
    cy.get('[data-cy="question-form-category-select"]').click()
    cy.get('[data-cy="question-form-category-item"]').should('have.length', 2)
  })

  it('can submit form', ()=>{
    const onSubmit = cy.stub()
    cy.mount(<QuestionForm value={{name: "Hello", category: 1}} categoryOptions={[{id: 1, name: "Category 1"}]} onSubmit={onSubmit} />)
    cy.get('[data-cy="question-form-submit-button"]').click()
    cy.wrap(onSubmit).should('have.been.calledOnce')
  })

  it('should call onChange with the correct object when name is input', () => {
    const onChangeStub = cy.stub().as('onChangeStub');
    const initialValue = { name: '', category: '' };

    cy.mount(
        <QuestionForm
            value={initialValue}
            onChange={onChangeStub}
            categoryOptions={[]}
        />
    );

    const newName = 'Neue Frage';

    cy.get('[data-cy="question-form-question-name"]').click().type(newName);

    cy.get('@onChangeStub.all').should('have.callCount', newName.length);
  });

  it('should call onChange with the correct object when category is selected', () => {
    const onChangeStub = cy.stub().as('onChangeStub');
    const initialValue = { name: '', category: '' };

    cy.mount(
        <QuestionForm
            value={initialValue}
            onChange={onChangeStub}
            categoryOptions={[{id: 1, name: 'Category 1'}]}
        />
    );

    cy.get('[data-cy="question-form-category-select"]').click();
    cy.get('[data-cy="question-form-category-item"]').first().click();

    cy.get('@onChangeStub').should('have.been.calledOnceWith', { name: '', category: 1 });
  })

})