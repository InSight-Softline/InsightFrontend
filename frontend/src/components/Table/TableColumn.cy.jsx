import React from "react";
import { TableColumn } from "./TableColumn";

describe("TableColumn Component", () => {
  const items = [
    { id: "1", title: "Item 1" },
    { id: "2", title: "Item 2" },
    { id: "3", title: "Item 3" },
  ];

  it("renders without crashing and displays the title and items", () => {
    cy.mount(<TableColumn title="Test Column" items={items} onDropItem={() => {}} />);
    
    cy.contains("Test Column (3)").should("exist");
    cy.contains("Item 1").should("exist");
    cy.contains("Item 2").should("exist");
    cy.contains("Item 3").should("exist");
  });

  it("handles drag and drop correctly", () => {
    const mockOnDropItem = cy.stub();
    cy.mount(<TableColumn title="Drag Test Column" items={items} onDropItem={mockOnDropItem} />);
  
    // Mock der DataTransfer-API
    const dataTransfer = new DataTransfer();
    dataTransfer.setData("cardID", "1");
  
    // Simuliere das Ziehen von "Item 1"
    cy.contains("Item 1").trigger("dragstart", { dataTransfer });
  
    // Simuliere das Ablegen in der Spalte
    cy.contains("Drag Test Column (3)")
      .trigger("drop", { dataTransfer })
      .then(() => {
        expect(mockOnDropItem).to.have.been.calledOnceWith("1");
      });
  });
  

  it("prevents default behavior on drag over", () => {
    cy.mount(<TableColumn title="Prevent Default Column" items={items} onDropItem={() => {}} />);
  
    // Mock für `preventDefault`
    const preventDefault = cy.stub();
  
    cy.contains("Prevent Default Column (3)")
      .trigger("dragover", { preventDefault })
      .then(() => {
        expect(preventDefault).to.have.been.calledOnce;
      });
  });
  
});
