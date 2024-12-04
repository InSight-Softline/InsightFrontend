import React from "react";
import { MemoryRouter } from "react-router-dom";
import AuditGrid from "../AuditGrid/AuditGrid";

describe("<AuditGrid />", () => {
  it("renders audit items correctly", () => {
    cy.mount(
      <MemoryRouter>
        <AuditGrid />
      </MemoryRouter>
    );
  });

  it("renders the new audit button (plus icon) correctly", () => {
    cy.mount(
      <MemoryRouter>
        <AuditGrid />
      </MemoryRouter>
    );

    cy.get('[data-cy="new-audit-button"]').should("be.visible");

    cy.get('[data-cy="new-audit-button"]').click();
  });
});
