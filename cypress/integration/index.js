/**
 *  Copyright 2020 Adobe. All rights reserved.
 *  This file is licensed to you under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License. You may obtain a copy
 *  of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software distributed under
 *  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 *  OF ANY KIND, either express or implied. See the License for the specific language
 *  governing permissions and limitations under the License.
 */

/// <reference types="Cypress" />
import homePage from "../utils/index"

context("Home Page", () => {
  beforeEach(() => {
    cy.visit(`http://localhost:8000${homePage}`)
    cy.wait(100)
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
