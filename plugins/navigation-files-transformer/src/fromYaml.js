const yamlParser = require("yaml")

/**
 * Converts an array of Magento devdocs navigation page objects into a standard
 * format for a parliamentNavigation GraphQL node object.
 *
 * This function calls itself recursively.
 *
 * @param {Object[]} pages
 *
 * @returns {Object[]} A converted array
 */
const convertPages = pages => {
  if (pages === undefined) {
    return []
  }
  const convertedPages = pages.map(page => {
    const { title, url, pages: subPages } = page

    return {
      title: title,
      path: url,
      pages: convertPages(subPages),
    }
  })

  return convertedPages
}

/**
 * A utility function for converting navigation data from a yaml file
 * into data for a parliamentNavigation GraphQL node object.
 * A yaml file is identified as having navigation data if it has
 * the type property and it is set to "navigation"
 *
 * @param {String} content The YAML file content
 *
 * @return {Object} The main data for a GraphQL node object
 */
const fromYaml = content => {
  const object = yamlParser.parse(content)

  if (object === null || object.type !== "navigation") {
    return
  }

  const { order, title, name, url, pages } = object

  return {
    section: name,
    title: title,
    homePage: url,
    order: order,
    pages: convertPages(pages),
  }
}

module.exports = fromYaml
