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
  try {
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
  } catch (error) {
    //We should probably do something with the error
    return
  }
}

module.exports = fromYaml
