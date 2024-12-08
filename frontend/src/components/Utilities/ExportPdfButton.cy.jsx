import React from "react";
import {ExportPdfButton} from "./ExportPdfButton.jsx";

describe("<ExportPdfButton />", () => {
    const mockAuditId = 123;

    it("renders the button correctly", () => {
        cy.mount(<ExportPdfButton auditId={mockAuditId} />);

        // Check if the button is visible
        cy.get("button").contains("Download PDF").should("be.visible");
    });

    it("triggers the download function on click", () => {
        // Mock the fetch API
        cy.intercept("GET", `http://localhost:8080/api/v1/ratings/${mockAuditId}/export`, {
            statusCode: 200,
            body: "PDF content here",
            headers: { "Content-Type": "application/pdf" },
        }).as("fetchPdf");

        cy.mount(<ExportPdfButton auditId={mockAuditId} />);

        // Simulate a button click
        cy.get("button").contains("Download PDF").click();

        // Assert that the request was made
        cy.wait("@fetchPdf").its("response.statusCode").should("eq", 200);
    });

    it("handles errors gracefully", () => {
        cy.intercept("GET", `http://localhost:8080/api/v1/ratings/${mockAuditId}/export`, {
            statusCode: 500,
        }).as("fetchPdfError");

        cy.mount(<ExportPdfButton auditId={mockAuditId} />);

        cy.get("button").contains("Download PDF").click();

        cy.wait("@fetchPdfError");
        cy.log("Check console for error log output");
    });
});
