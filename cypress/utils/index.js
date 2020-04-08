// Prefix is empty for during developement, set in production
const prefix = Cypress.env("prefix") ? Cypress.env("prefix") : ""
let homePage = Cypress.env("homePage") ? Cypress.env("homePage") : ""
if (prefix !== "") {
  homePage = `${prefix}${homePage}`
}

export default homePage
