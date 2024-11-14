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

    // Prüft, ob der Text für den Firmennamen vorhanden ist
    cy.contains('Firmen-Name').should('exist');
    // Prüft, ob der Text für das Erstellungsdatum vorhanden ist
    cy.contains('01.01.24').should('exist');
  });
});