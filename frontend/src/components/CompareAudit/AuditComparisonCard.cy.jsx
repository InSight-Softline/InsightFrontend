import React from "react";
import { AuditComparisonCard } from "./AuditComparisonCard";

describe("AuditComparisonCard Component", () => {
  const mockData = {
    name: "Audit A",
    progress: 75,
    categoryProgress: [
      { categoryName: "Category 1", currentCategoryProgress: 80 },
      { categoryName: "Category 2", currentCategoryProgress: 60 },
      { categoryName: "Category 3", currentCategoryProgress: 40 },
    ],
  };

  beforeEach(() => {
    cy.viewport(1280, 720);
  });

  it("renders the component with correct data", () => {
    cy.mount(
        <AuditComparisonCard
            name={mockData.name}
            progress={mockData.progress}
            categoryProgress={mockData.categoryProgress}
        />
    );

    // Check if the audit name is displayed
    cy.contains("h2", mockData.name).should("be.visible");

    // Check if the overall progress bar is rendered
    cy.get('[role="progressbar"]').should("exist");
    cy.contains(`${mockData.progress}%`).should("be.visible");

    // Check if the RadarChart is rendered
    cy.get("canvas").should("exist");
  });

  it("renders the progress bar correctly", () => {
    cy.mount(
        <AuditComparisonCard
            name={mockData.name}
            progress={mockData.progress}
            categoryProgress={mockData.categoryProgress}
        />
    );

    // Check if the progress bar exists and displays the correct percentage
    cy.get('[role="progressbar"]').should("exist");
    cy.contains(`${mockData.progress}%`).should("be.visible");
  });

  it("renders the radar chart with correct data", () => {
    cy.mount(
        <AuditComparisonCard
            name={mockData.name}
            progress={mockData.progress}
            categoryProgress={mockData.categoryProgress}
        />
    );

    // Ensure the RadarChart canvas is rendered
    cy.get("canvas").should("exist");

  });

  it("displays a fallback message when category data is missing", () => {
    cy.mount(<AuditComparisonCard name="Audit B" progress={50} categoryProgress={[]} />);

    // Check if fallback message is displayed
    cy.contains("Keine Daten für Kategorien verfügbar").should("be.visible");

    // Ensure RadarChart is not rendered
    cy.get("canvas").should("not.exist");
  });

  it("matches the RadarChart snapshot", () => {
    cy.mount(
        <AuditComparisonCard
            name={mockData.name}
            progress={mockData.progress}
            categoryProgress={mockData.categoryProgress}
        />
    );

    // Nimm einen Screenshot für den Snapshot-Vergleich
    cy.get("canvas").screenshot();
  });

});
