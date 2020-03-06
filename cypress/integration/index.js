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
})
