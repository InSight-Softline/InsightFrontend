import React from "react";
import { Table } from "./Table";

describe("Table Component", () => {
  const options = [
    { id: "1", title: "Kategorie 1" },
    { id: "2", title: "Kategorie 2" },
    { id: "3", title: "Kategorie 3" },
  ];

  it("renders available and selected categories correctly", () => {
    cy.mount(<Table value={["2"]} options={options} onChange={() => {}} />);

    // Überprüfe die Titel der Spalten
    cy.contains("Verfügbare Kategorien (2)").should("exist");
    cy.contains("Ausgewählte Kategorien (1)").should("exist");

    // Überprüfe die Items in den Spalten
    cy.contains("Kategorie 1").should("exist");
    cy.contains("Kategorie 2").should("exist");
    cy.contains("Kategorie 3").should("exist");
  });

  it("moves item from available to selected on drop", () => {
    const mockOnChange = cy.stub();
    cy.mount(<Table value={[]} options={options} onChange={mockOnChange} />);

    // Mock der DataTransfer-API
    const dataTransfer = new DataTransfer();
    dataTransfer.setData("cardID", "1");

    // Simuliere das Ziehen von "Kategorie 1" und Ablegen in der "Ausgewählte Kategorien"-Spalte
    cy.contains("Kategorie 1").trigger("dragstart", { dataTransfer });
    cy.contains("Ausgewählte Kategorien (0)").trigger("drop", { dataTransfer });

    // Überprüfe, ob `onChange` mit dem korrekten Wert aufgerufen wurde
    cy.wrap(mockOnChange).should("have.been.calledOnceWith", ["1"]);
  });

  it("moves item from selected to available on drop", () => {
    const mockOnChange = cy.stub();
    cy.mount(<Table value={["2"]} options={options} onChange={mockOnChange} />);

    // Mock der DataTransfer-API
    const dataTransfer = new DataTransfer();
    dataTransfer.setData("cardID", "2");

    // Simuliere das Ziehen von "Kategorie 2" und Ablegen in der "Verfügbare Kategorien"-Spalte
    cy.contains("Kategorie 2").trigger("dragstart", { dataTransfer });
    cy.contains("Verfügbare Kategorien (2)").trigger("drop", { dataTransfer });

    // Überprüfe, ob `onChange` mit dem korrekten Wert aufgerufen wurde
    cy.wrap(mockOnChange).should("have.been.calledOnceWith", []);
  });
});
