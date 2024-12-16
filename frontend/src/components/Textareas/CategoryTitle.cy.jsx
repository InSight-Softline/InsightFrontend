import React from 'react';
import CategoryTitle from './CategoryTitle';

describe('CategoryTitle Component', () => {
    const titleText = "Test Category Title";

    it('renders correctly with provided children', () => {
        cy.mount(<CategoryTitle>{titleText}</CategoryTitle>);

        cy.get('h2').should('exist').and('have.text', titleText);
    });

    it('applies additional props like data-cy', () => {
        const dataCyValue = "category-title";
        cy.mount(<CategoryTitle data-cy={dataCyValue}>{titleText}</CategoryTitle>);

        cy.get(`[data-cy="${dataCyValue}"]`).should('exist').and('have.text', titleText);
    });

    it('applies correct default styles', () => {
        cy.mount(<CategoryTitle>{titleText}</CategoryTitle>);

        cy.get('h2')
            .should('have.class', 'px-10')
            .and('have.class', 'py-1')
            .and('have.class', 'text-xl');
    });
});