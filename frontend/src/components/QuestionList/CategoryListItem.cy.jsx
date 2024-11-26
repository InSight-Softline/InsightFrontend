import React from 'react';
import { CategoryListItem } from './CategoryListItem.jsx';

describe('CategoryList component tests', () => {
    const labels = [0, 1, 2, 3, 4, 5, "N/A"];
    const exampleCategory =
        {
            name: 'VPN',
            id: 1,
            questions: [
                { id: '1', question: 'Frage 1?', points: 3, nA: false, comment: 'Ok' },
                { id: '2', question: 'Frage 2?', points: null, nA: true, comment: '' },
                { id: '3', question: 'Frage 3?', points: null, nA: null, comment: '' },
            ]
        }
    ;


    it('renders the correct questions', () => {
        const onChangeStub2 = cy.stub().as('onChangeStub2');
        cy.mount(
            <CategoryListItem
                category={exampleCategory}
                options={labels}
                onChange={onChangeStub2}
            />
        );

        exampleCategory.questions.forEach((question) => {
            cy.get(`[data-cy="question-text"]`).contains(question.question);
            cy.get(`[data-cy="question-list-item-${question.id}"]`).should('exist');
            cy.get(`[data-cy="question-list-item-${question.id}"]`).should('contain', question.question);
            cy.get('[data-cy="question-comment"]').should('exist');
            cy.get('input[type="checkbox"]').eq(3).should('be.checked');
        });
    });

    it('calls onChange when a question is updated', () => {
        const exampleQuestion = {
            name: 'VPN',
            id: 1,
            questions: [
                { id: '1', question: 'Frage 1?', points: 3, nA: false, comment: 'Ok' },
            ]
        }

        const onChangeStub3 = cy.stub().as('onChangeStub3');
        cy.mount(
            <CategoryListItem
                category={exampleQuestion}
                options={labels}
                onChange={onChangeStub3}
            />
        );

        cy.contains(0).find('input[type="checkbox"]').check();

        const updatedQuestions = {
            name: 'VPN',
            id: 1,
            questions: [
                { id: '1', question: 'Frage 1?', points: 0, nA: false, comment: 'Ok' },
            ]
        };

        cy.get('@onChangeStub3').should('have.been.calledOnceWith', updatedQuestions, { id: '1', question: 'Frage 1?', points: 0, nA: false, comment: 'Ok' });
    });
});