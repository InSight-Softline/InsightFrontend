import React from 'react';
import { QuestionList } from './QuestionList.jsx';
import {QuestionListItem} from "./QuestionListItem.jsx";

describe('QuestionList Component', () => {
    const exampleQuestions = [
        { id: 'q1', question: 'Frage 1?', points: null, nA: null, comment: '' },
        { id: 'q2', question: 'Frage 2?', points: null, nA: null, comment: '' },
    ];
    const options = ['0', '1', '2', '3', '4', '5', 'N/A'];


    it('renders each question', () => {
        const onChangeStub = cy.stub().as('onChangeStub');
        cy.mount(
            <QuestionList
                questions={exampleQuestions}
                options={options}
                onChange={onChangeStub}
            />
        );

        cy.get('[data-cy="question-text"]').should('have.length', exampleQuestions.length);
        cy.get('[data-cy="question-text"]').first().should('contain', 'Frage 1?');
        cy.get('[data-cy="question-text"]').last().should('contain', 'Frage 2?');
    });

    it('calls onChange when a checkbox is selected', () => {
        const onChangeStub = cy.stub().as('onChangeStub');
        cy.mount(
            <QuestionList
                questions={exampleQuestions}
                options={options}
                onChange={onChangeStub}
            />
        );

        // Klick auf eine Checkbox der ersten Frage
        cy.get('input[type="checkbox"]').eq(3).click();

        // Überprüfen, ob `onChange` aufgerufen wurde
        cy.get('@onChangeStub').should('have.been.calledOnce');

        // Die erwarteten Werte für die erste Frage prüfen
        cy.get('@onChangeStub').should('have.been.calledWith',
            [
                {...exampleQuestions[0], points: '3', nA: false },
                exampleQuestions[1]
            ], {...exampleQuestions[0], points: '3', nA: false });
    });

    it('calls onChange when "N/A" checkbox is selected', () => {
        const onChangeStub = cy.stub().as('onChangeStub');
        cy.mount(
            <QuestionList
                questions={exampleQuestions}
                options={options}
                onChange={onChangeStub}
            />
        );

        // Klick auf die "N/A"-Checkbox der ersten Frage
        cy.get('input[type="checkbox"]').eq(6).click();

        // Überprüfen, ob `onChange` aufgerufen wurde
        cy.get('@onChangeStub').should('have.been.calledOnce');

        // Die erwarteten Werte für die erste Frage prüfen
        cy.get('@onChangeStub').should('have.been.calledWithMatch', [
            {...exampleQuestions[0], points: null, nA: true },
            exampleQuestions[1]
        ], {...exampleQuestions[0], points: null, nA: true }
        );
    });

    it('updates comment in question object correctly when text is entered in the comment box', () => {
        const onChangeStub = cy.stub().as('onChangeStub');
        cy.mount(
            <QuestionList
                questions={exampleQuestions}
                options={options}
                onChange={onChangeStub}
            />
        );

        const newComment = 'G';
        cy.get('[data-cy="question-comment"]').eq(0).type(newComment);
        cy.get('@onChangeStub').should('have.been.calledWith',
            [
                {...exampleQuestions[0], comment: 'G' },
                exampleQuestions[1]
            ], {...exampleQuestions[0], comment: 'G' });
    });

});