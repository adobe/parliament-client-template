/// <reference types="Cypress" />
import homePage from "../utils/index"

const A11Y_OPTIONS = {
  runOnly: {
    type: "tag",
    values: ["section508", "wcag2a", "wcag2aa"],
    // need to add "best-practice"
  },
}

context("A11Y", () => {
  beforeEach(() => {
    cy.visit(`http://localhost:8000${homePage}`)
    cy.injectAxe()
    cy.wait(100)
  })
  it("has no accessibility violations on load", () => {
    cy.checkA11y(null, A11Y_OPTIONS)
  })
})
