import React from 'react'; 
import { NewAudit } from '../pages/NewAudit';

describe('<NewAudit />', () => {
  it('renders and validates input fields for audit and customer names', () => {
    
    cy.mount(<NewAudit />);

    // Überprüft, ob die Eingabefelder für den Audit-Namen und den Firmennamen vorhanden sind
    cy.get('label').contains('Audit Name').should('exist');
    cy.get('label').contains('Firmenname').should('exist');

    // Klickt auf den Button, um zu prüfen, ob die Warnung bei fehlenden Eingaben erscheint
    cy.get('button').contains('Audit erstellen').click();
    cy.on('window:alert', (text) => {
      expect(text).to.equal('Bitte geben Sie sowohl einen Audit-Namen als auch einen Firmennamen ein.');
    });

    // Füllt das Feld für den Audit-Namen aus und prüft erneut auf die Warnung
    cy.get('input').first().type('Test Audit'); // Annahme: Das erste Eingabefeld ist für den Audit-Namen
    cy.get('button').contains('Audit erstellen').click();
    cy.on('window:alert', (text) => {
      expect(text).to.equal('Bitte geben Sie sowohl einen Audit-Namen als auch einen Firmennamen ein.');
    });

    // Füllt das Feld für den Firmennamen aus und prüft, dass die Warnung nicht mehr angezeigt wird
    cy.get('input').eq(1).type('Test Firma'); // Annahme: Das zweite Eingabefeld ist für den Firmennamen
    cy.get('button').contains('Audit erstellen').click();
    cy.on('window:alert', (text) => {
      expect(text).not.to.equal('Bitte geben Sie sowohl einen Audit-Namen als auch einen Firmennamen ein.');
    });
  });
});