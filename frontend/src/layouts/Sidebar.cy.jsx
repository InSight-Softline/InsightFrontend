import React from "react";
import { SidebarProvider } from "../../src/layouts/SidebarContext";
import LayoutDefault from "../../src/layouts/LayoutDefault"; // Die zu testende Komponente
import { MemoryRouter } from "react-router-dom";
import { mount } from 'cypress/react';

describe("Sidebar Component with Context", () => {
    beforeEach(() => {
      // Wrappen der Layout-Komponente mit SidebarProvider und MemoryRouter
      mount(
        <SidebarProvider>
          <MemoryRouter>
            <LayoutDefault />
          </MemoryRouter>
        </SidebarProvider>
      );
    });
  
    it("should render the sidebar", () => {
      cy.get('[data-cy=sidebar]').should("exist");
    });
  
    it("should open the sidebar when clicking the menu icon", () => {
      cy.get('[data-cy=menu-icon]').click();
      cy.get('[data-cy=sidebar]').should("be.visible");
    });
  
    it("should close the sidebar when clicking the close icon", () => {
      cy.get('[data-cy=menu-icon]').click();
      cy.get('[data-cy=close-icon]').click();
      cy.get('[data-cy=sidebar]').should("not.be.visible");
    });
  
    it("should toggle sidebar state when clicking the menu icon multiple times", () => {
      cy.get('[data-cy=menu-icon]').click();
      cy.get('[data-cy=sidebar]').should("be.visible");
      cy.get('[data-cy=close-icon]').click();
      cy.get('[data-cy=sidebar]').should("not.be.visible");
    });
  });