import React from "react";
import { AuditComparisonCard } from "./AuditComparisonCard";

describe("AuditComparisonCard Component", () => {
  const mockData = {
    name: "Audit A",
    progress: 75,
    categories: [
      { id: 1, name: "Category 1", progress: 80 },
      { id: 2, name: "Category 2", progress: 60 },
    ],
    distribution: [10, 20, 15, 25, 30],
  };

  beforeEach(() => {
    cy.viewport(1280, 720);
  });

  it("renders the component with correct data", () => {
    cy.mount(
      <AuditComparisonCard
        name={mockData.name}
        progress={mockData.progress}
        categories={mockData.categories}
        distribution={mockData.distribution}
      />
    );

    cy.contains("h2", mockData.name).should("be.visible");

    cy.get('[role="progressbar"]').should("exist");

    cy.contains(`${mockData.progress}%`).should("be.visible");

    mockData.categories.forEach((category) => {
      cy.contains(".text-sm", category.name).should("be.visible");
      cy.contains(`${category.progress}%`).should("be.visible");
    });

    cy.get("svg").should("exist");
  });

  it("renders the progress bar correctly", () => {
    cy.mount(
      <AuditComparisonCard
        name={mockData.name}
        progress={mockData.progress}
        categories={mockData.categories}
        distribution={mockData.distribution}
      />
    );

    cy.get('[role="progressbar"]').should("exist");
    cy.contains(`${mockData.progress}%`).should("be.visible");
  });

  it("renders the bar chart with correct data", () => {
    cy.mount(
      <AuditComparisonCard
        name={mockData.name}
        progress={mockData.progress}
        categories={mockData.categories}
        distribution={mockData.distribution}
      />
    );

    cy.get("svg").should("exist");
  });

  it("renders category-wise circular progress charts", () => {
    cy.mount(
      <AuditComparisonCard
        name={mockData.name}
        progress={mockData.progress}
        categories={mockData.categories}
        distribution={mockData.distribution}
      />
    );

    mockData.categories.forEach((category) => {
      cy.contains(".text-sm", category.name).should("be.visible");
      cy.contains(`${category.progress}%`).should("be.visible");
    });
  });
});
