"use strict"

module.exports = fixHtml

function fixHtml(pluginOptionTags) {
  return replaceHtml

  function replaceHtml(node) {
    const type = node && node.type
    if (type === `html`) {
      const tag = cleanTags(node.value)
      try {
        node.value = tag
      } catch (e) {
        throw Error(`${e.message}`)
      }
    }

    if (node.children) {
      node.children = cleanChildren(node.children)
    }
    return node
  }

  /**
   * Recurses through the children of a node to clean the tags.
   *
   * @param {string} node  The node value from the MDAST tree being processed.
   */
  function cleanChildren(nodes) {
    let index = -1
    const length = nodes.length
    let result = []
    let value

    while (++index < length) {
      value = replaceHtml(nodes[index])
      if (value && typeof value.length === "number") {
        result = result.concat(value.map(replaceHtml))
      } else {
        result.push(value)
      }
    }
    return result
  }

  function cleanTags(node) {
    cleanDefaultTags(node)
    cleanOptionTags(node)

    /**
     * Defines and fixes the HTML tags that are known to break the build during MDX processing.
     *
     * @param {string} node  The node value from the MDAST tree being processed.
     */
    function cleanDefaultTags(node) {
      replaceTag(node.match(/<hr>/g), "<hr/>")
      replaceTag(node.match(/<br>/g), "<br/>")
      replaceTag(node.match(/(<b>+|<\/b>)/g), "**")

      const invalidImgTag = node.match(/<img\s*(.*?)[^/]>/g)
      if (invalidImgTag) {
        replaceTag(invalidImgTag, invalidImgTag[0].split(">").join("/>"))
      }
    }

    /**
     * Defines and fixes the HTML tags specified in the plugin options.
     *
     * @param {string} node  The node value from the MDAST tree being processed.
     */
    function cleanOptionTags(node) {
      const optionalTags = {
        "<em>": function() {
          replaceTag(node.match(/(<em>+|<\/em>)/g), "_")
        },
        "<strong>": function() {
          replaceTag(node.match(/(<strong>+|<\/strong>)/g), "**")
        },
        "<i>": function() {
          replaceTag(node.match(/(<i>+|<\/i>)/g), "_")
        },
        //TODO: Add more HTML tags to support more plugin tag options.
      }

      for (const tag of pluginOptionTags) {
        optionalTags[tag]()
      }
    }

    /**
     * Sets the node value to a fixed tag or a markdown element.
     *
     * @param {string} invalidTag  Open tag that breaks the MDX/JSX processing.
     * @param {string} validTag  Closed tag or markdown element that replaces invalidTag.
     */
    function replaceTag(invalidTag, validTag) {
      if (invalidTag) {
        let fixedTag = invalidTag[0].split(invalidTag[0]).join(validTag)
        node = node.split(invalidTag[0]).join(fixedTag)
      }
    }

    return node
  }
}
