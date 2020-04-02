/// <reference types="Cypress" />
const A11Y_OPTIONS = {
  runOnly: {
    type: "tag",
    values: ["section508", "wcag2a", "wcag2aa"],
    // need to add "best-practice"
  },
}

// Prefix is empty for during developement, set in production
const prefix = Cypress.env("prefix") ? Cypress.env("prefix") : ""
let homePage = Cypress.env("homePage") ? Cypress.env("homePage") : ""
if (prefix !== "") {
  homePage = `${prefix}${homePage}`
}

context("Home Page", () => {
  beforeEach(() => {
    cy.visit(`http://localhost:8000${homePage}`)
    cy.injectAxe()
    cy.wait(100)
  })
  it("has no accessibility violations on load", () => {
    cy.checkA11y(null, A11Y_OPTIONS)
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
      .children("div")
      .children("ul")
      .should("be.visible")
  })
  it("has a footer", () => {
    cy.get("footer").contains("Copyright")
    const year = new Date().getFullYear()
    cy.get("footer").contains(year)
  })
  it("has an analytics script", () => {
    cy.get(
      'script[src*="assets.adobedtm.com/00dcc6d24e46/e61b3825fe76/launch-3cd4277d5923.min.js"'
    ).should("have.length", 1)
  })
})
