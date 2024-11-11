import React from 'react';
import { AuditGridItem } from '../components/AuditGrid/AuditGridItem';

describe('<AuditGridItem />', () => {
  it('renders with customer and date information', () => {
    // Beispiel-Audit-Daten
    const audit = {
      id: 1,
      name: 'Audit-Name',
      customer: 'Firmen-Name',
      date: '01.01.24',
    };

    cy.mount(<AuditGridItem audit={audit} />);

    cy.get('.absolute.bottom-2.right-2').should('contain.text', 'Firmen-Name');
    cy.get('.absolute.bottom-2.left-2').should('contain.text', '01.01.24');
  });
});