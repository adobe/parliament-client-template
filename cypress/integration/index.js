/// <reference types="Cypress" />
const A11Y_OPTIONS = {
  runOnly: {
    type: "tag",
    values: ["section508", "wcag2a", "wcag2aa"],
    // need to add "best-practice"
  },
}

context("Home Page", () => {
  beforeEach(() => {
    cy.visit(`http://localhost:8000/`)
    cy.injectAxe()
    cy.wait(100)
  })
  it("has no accessibility violations on load", () => {
    cy.checkA11y(A11Y_OPTIONS)
  })
  it("has a page title", () => {
    cy.get("h2").should(
      "have.class",
      "spectrum-Heading spectrum-Heading--subtitle1"
    )
  })
  it("has a search box", () => {
    cy.get("input[type='search'")
      .should("have.value", "")
      .should("have.attr", "placeholder", "Enter text")
  })
  it("has a nav component", () => {
    cy.get("nav")
      .should("be.visible")
      .children("ul")
      .should("be.visible")
  })
})
