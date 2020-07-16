/**
 * Converts an array of manifest-docs.json page objects into a standard
 * format for a parliamentNavigation GraphQL node object.
 * 
 * This function calls itself recursively.
 * 
 * @param {Object[]} pages 
 * 
 * @returns {Object[]} A converted array
 */
const convertPages = pages => {
  const convertedPages = pages.map(page => {
    return {
      title: page.title,
      path: page.path,
      pages: convertPages(page.pages),
    }
  })

  return convertedPages
}

/**
 * A utility function for converting navigation data from a json file.
 * A json file is identified as having navigation data if it has
 * the view_type property and it is set to "mdbook".
 * 
 * @param {String} content The JSON file content
 * 
 * @return {Object} The main data for a GraphQL node object
 */
const fromJson = content => {
  const object = JSON.parse(content)

  if (object.view_type !== "mdbook") {
    return
  }

  const { name, pages } = object

  return {
    section: name,
    title: name,
    pages: convertPages(pages),
  }
}

module.exports = fromJson
