import React from "react";
import { AuditDropdown } from "./AuditDropdown";

describe("AuditDropdown Component", () => {
  const audits = [
    { name: "Audit 1", id: 1 },
    { name: "Audit 2", id: 2 },
    { name: "Audit 3", id: 3 },
  ];

  it("renders correctly with label", () => {
    cy.mount(<AuditDropdown audits={audits} onAuditSelect={() => {}} />);
    cy.contains("Zweites Audit auswählen").should("exist"); // Check if label renders
  });

  it("shows dropdown options when input is clicked", () => {
    cy.mount(<AuditDropdown audits={audits} onAuditSelect={() => {}} />);
    cy.get("input").click(); // Open the dropdown
    cy.get(".MuiAutocomplete-popper li").should("have.length", audits.length); // Check all options are rendered
  });

  it("calls onAuditSelect with correct value when an option is selected", () => {
    const onAuditSelectStub = cy.stub(); // Mock callback function

    cy.mount(<AuditDropdown audits={audits} onAuditSelect={onAuditSelectStub} />);
    cy.get("input").click(); // Open the dropdown
    cy.contains("Audit 2").click(); // Select the second option

    cy.wrap(onAuditSelectStub).should("have.been.calledOnceWith", audits[1]); // Ensure callback is called with correct option
  });

  it("clears input when Escape is pressed", () => {
    cy.mount(<AuditDropdown audits={audits} onAuditSelect={() => {}} />);
    cy.get("input").type("Audit 1");
    cy.get("body").type("{esc}");
    cy.wait(200);
    cy.get("input").then(($input) => {
      if ($input.val() !== "") {
        cy.get("body").type("{esc}");
      }
    });
    cy.get("input").should("have.value", "");
  });
  
});
