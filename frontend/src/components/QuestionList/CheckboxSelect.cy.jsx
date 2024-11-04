import React from 'react';
import {CheckboxSelect} from "./CheckboxSelect.jsx";

describe('CheckboxSelect Component', () => {
    const options = ['Option 1', 'Option 2', 'Option 3'];

    it('erstellt genau so viele Checkboxen, wie es Labels gibt', () => {
        cy.mount(<CheckboxSelect options={options} value={null} onChange={cy.stub().as('onChange')} />);
        cy.get('input[type="checkbox"]').should('have.length', options.length);
    });

    it('zeigt alle Checkboxen mit den richtigen Labels an', () => {
        cy.mount(<CheckboxSelect options={options} value={null} onChange={cy.stub().as('onChange')} />);
        options.forEach((label) => {
            cy.contains(label).should('exist');
        });
    });

    it('kann eine Checkbox auswählen und die onChange-Funktion mit dem richtigen Wert aufrufen', () => {
        cy.mount(<CheckboxSelect options={options} value={null} onChange={cy.stub().as('onChange')} />);
        const selectedOption = options[0];
        cy.contains(selectedOption).find('input[type="checkbox"]').check();
        cy.get('@onChange').should('have.been.calledOnceWith', selectedOption);
    });

    it('kann eine Checkbox abwählen und die onChange-Funktion mit null aufrufen', () => {
        cy.mount(<CheckboxSelect options={options} value={'Option 1'} onChange={cy.stub().as('onChange')} />);
        const selectedOption = options[0];
        cy.contains(selectedOption).find('input[type="checkbox"]').uncheck();
        cy.get('@onChange').should('have.been.calledWith', null);
    });

    it('kann nur eine Checkbox gleichzeitig ausgewählt haben', () => {
        cy.mount(<CheckboxSelect options={options} value={null} onChange={cy.stub().as('onChange')} />);

        const firstOption = options[0];
        const secondOption = options[1];

        // Erste Checkbox auswählen
        cy.contains(firstOption).find('input[type="checkbox"]').check();
        cy.get('@onChange').should('have.been.calledWith', firstOption).then(() => {
            cy.mount(<CheckboxSelect options={options} value={firstOption} onChange={cy.stub().as('onChange')} />);
            cy.contains(firstOption).find('input[type="checkbox"]').should('be.checked');
        });

        // Zweite Checkbox auswählen
        cy.contains(secondOption).find('input[type="checkbox"]').check();
        cy.get('@onChange').should('have.been.calledWith', secondOption).then(() => {
            cy.mount(<CheckboxSelect options={options} value={secondOption} onChange={cy.stub().as('onChange')} />);
            cy.contains(secondOption).find('input[type="checkbox"]').should('be.checked');
            cy.contains(firstOption).find('input[type="checkbox"]').should('not.be.checked');
        });
    });

});