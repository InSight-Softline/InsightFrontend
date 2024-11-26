import React from 'react';
import { CategoryList } from './CategoryList.jsx';

describe('CategoryList component tests', () => {
    const labels = [0, 1, 2, 3, 4, 5, "N/A"];
    const exampleCategories = [
        {
            name: 'VPN',
            id: 1,
            questions: [
                { id: '1', question: 'Frage 1?', points: 3, nA: false, comment: 'Ok' },
                { id: '2', question: 'Frage 2?', points: null, nA: true, comment: '' },
            ]
        },
        {
            name: 'Network',
            id: 2,
            questions: [
                { id: '3', question: 'Frage 3?', points: 2, nA: false, comment: '' },
                { id: '4', question: 'Frage 4?', points: null, nA: null, comment: 'Schlecht' },
            ]
        }
    ];


    it('renders the correct number of categories', () => {
        const onChangeStub = cy.stub().as('onChangeStub');
        cy.mount(
            <CategoryList
                categories={exampleCategories}
                options={labels}
                onChange={onChangeStub}
            />
        );

        exampleCategories.forEach((category) => {
            cy.get(`[data-cy="category-${category.id}"]`).should('exist');
            cy.get(`[data-cy="category-title-${category.id}"]`).should('exist');
            cy.get(`[data-cy="category-title-${category.id}"]`).contains(category.name);
        });

    });

    it('renders the correct questions within each category', () => {
        const onChangeStub2 = cy.stub().as('onChangeStub2');
        cy.mount(
            <CategoryList
                categories={exampleCategories}
                options={labels}
                onChange={onChangeStub2}
            />
        );

        exampleCategories.forEach((category) => {
            category.questions.forEach((question) => {
                cy.get(`[data-cy="question-list-item-${question.id}"]`).should('exist');
                cy.get(`[data-cy="question-list-item-${question.id}"]`).should('contain', question.question);
            });
        });
    });

    it('calls onChange when a category is updated', () => {
        const onChangeStub3 = cy.stub().as('onChangeStub3');
        cy.mount(
            <CategoryList
                categories={[{
                    name: 'VPN',
                    id: 1,
                    questions: [
                        { id: '1', question: 'Frage 1?', points: 3, nA: false, comment: 'Ok' },
                        { id: '2', question: 'Frage 2?', points: null, nA: true, comment: '' },
                    ]
                }]}
                options={labels}
                onChange={onChangeStub3}
            />
        );

        cy.contains(0).find('input[type="checkbox"]').check();

        const updatedQuestions = [{
            name: 'VPN',
                id: 1,
                questions: [
                { id: '1', question: 'Frage 1?', points: 0, nA: false, comment: 'Ok' },
                { id: '2', question: 'Frage 2?', points: null, nA: true, comment: '' },
            ]
        }];
        cy.get('@onChangeStub3').should('have.been.calledOnceWith', updatedQuestions, { id: '1', question: 'Frage 1?', points: 0, nA: false, comment: 'Ok' });
    });

    it('renders correctly with an empty categories list', () => {
        const onChangeStub4 = cy.stub();
        cy.mount(<CategoryList categories={[]} options={labels} onChange={onChangeStub4} />);
        cy.get('[data-cy="category-title"]').should('not.exist');
        cy.get("CategoryListItem").should('not.exist');
    });


});