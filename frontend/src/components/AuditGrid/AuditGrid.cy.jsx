import React from "react";
import { MemoryRouter } from "react-router-dom";
import AuditGrid from "../AuditGrid/AuditGrid";

describe("<AuditGrid />", () => {
  it("renders audit items correctly", () => {
    cy.mount(
        <AuditGrid />
    );
  });

  it("renders the new audit button (plus icon) correctly", () => {
    cy.mount(
        <AuditGrid />
    );

    cy.get('[data-cy="new-audit-button"]').should("be.visible");

    cy.get('[data-cy="new-audit-button"]').click();
  });
});
