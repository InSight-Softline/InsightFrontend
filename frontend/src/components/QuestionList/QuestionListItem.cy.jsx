import React from 'react';
import { QuestionListItem } from './QuestionListItem';


describe('QuestionListItem Component Tests', () => {
    const exampleQuestion = {
        id: 1,
        question: 'Wie bewerten Sie die Qualität?',
        points: null,
        nA: null,
        comment: ''
    };

    const options = [0, 1, 2, 3, 4, 5, 'N/A'];

    it('renders the question text, checkboxes, and comment box correctly', () => {
        cy.mount(
            <QuestionListItem
                question={exampleQuestion}
                options={options}
                onChange={cy.stub().as('onChange')}
            />
        );

        cy.get('[data-cy="question-text"]').should('contain', exampleQuestion.question);
        cy.get('input[type="checkbox"]').should('have.length', options.length);
        cy.get('[data-cy="question-comment"]').should('exist');
    });

    it('updates question object correctly when a checkbox is selected', () => {
        cy.wait(500);

        const onChangeSpy = cy.spy().as('onChangeSpy');
        cy.mount(
            <QuestionListItem
                question={exampleQuestion}
                options={options}
                onChange={onChangeSpy}
            />
        );

        cy.get('input[type="checkbox"]').eq(3).click();

        cy.get('@onChangeSpy').should('have.been.calledOnceWith', { ...exampleQuestion, points: 3, nA: false });

        cy.get('input[type="checkbox"]').eq(6).click();
        cy.get('@onChangeSpy').should('have.been.calledWith', { ...exampleQuestion, points: null, nA: true });

    });

    it('updates question object correctly when a checkbox is selected 2', () => {
        const question = {
            id: 1,
            question: 'Wie bewerten Sie die Qualität?',
            points: 3,
            nA: false,
            comment: ''
        };
        cy.mount(
            <QuestionListItem
                question={question}
                options={options}
                onChange={cy.spy().as('onChangeSpy2')}
            />
        );


        cy.get('input[type="checkbox"]').eq(3).should('be.checked');

        cy.get('input[type="checkbox"]').eq(3).click();
        cy.get('@onChangeSpy2').should('have.been.calledOnceWith',  {
            id: 1,
                question: 'Wie bewerten Sie die Qualität?',
                points: null,
                nA: null,
                comment: ''
        });
    });

    it('updates question object correctly when a checkbox is selected 3', () => {
        cy.mount(
            <QuestionListItem
                question={{...exampleQuestion, nA: true}}
                options={options}
                onChange={cy.stub().as('onChangeStub2')}
            />
        );


        cy.get('input[type="checkbox"]').eq(6).click();
        cy.get('@onChangeStub2').should('have.been.calledWith', { ...exampleQuestion, points: null, nA: null });
    });

    it('updates comment in question object correctly when text is entered in the comment box', () => {
        cy.mount(
            <QuestionListItem
                question={exampleQuestion}
                options={options}
                onChange={cy.stub().as('onChange')}
            />
        );

        const newComment = 'G';
        cy.get('[data-cy="question-comment"]').type(newComment);
        cy.get('@onChange').should('have.been.calledWith',  { ...exampleQuestion, comment: newComment });
    });

});
