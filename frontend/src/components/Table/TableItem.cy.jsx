import React from "react";
import { TableItem } from "./TableItem";

describe("TableItem Component", () => {
  it("renders without crashing", () => {
    cy.mount(<TableItem id="1" title="Test Title" onDragStart={() => {}} />);
    cy.contains("Test Title").should("exist");
  });

  it("has the draggable attribute set to true", () => {
    cy.mount(<TableItem id="1" title="Draggable Item" onDragStart={() => {}} />);
    cy.contains("Draggable Item").should("have.attr", "draggable", "true");
  });

  it("calls onDragStart with correct id when dragged", () => {
    const mockOnDragStart = cy.stub();
    const id = "test-id";

    cy.mount(<TableItem id={id} title="Draggable Item" onDragStart={mockOnDragStart} />);
    cy.contains("Draggable Item")
      .trigger("dragstart")
      .then(() => {
        expect(mockOnDragStart).to.have.been.calledOnce;
        expect(mockOnDragStart).to.have.been.calledWithMatch({}, id);
      });
  });

  it("changes cursor style to grabbing when dragged", () => {
    cy.mount(<TableItem id="1" title="Cursor Check" onDragStart={() => {}} />);
    
    // Simuliere das Klicken und Ziehen des Elements
    cy.contains("Cursor Check")
      .trigger("mousedown", { button: 0 })
      .trigger("dragstart")
      .should("have.class", "active:cursor-grabbing");
  });
});
