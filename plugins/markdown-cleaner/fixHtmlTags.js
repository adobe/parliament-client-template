"use strict"

module.exports = fixHtml

function fixHtml(pluginOptionTags) {
  return fixNode

  function fixNode(node) {
    const type = node && node.type
    if (type === `html`) {
      const cleanedNodeValue = cleanNode(node.value)
      try {
        node.value = cleanedNodeValue
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
   * @param {string} nodeChildren  The node children from the MDAST tree being processed.
   */
  function cleanChildren(nodeChildren) {
    let nodes = []
    for (const node of nodeChildren) {
      let cleanedNode = fixNode(node)
      nodes.push(cleanedNode)
    }
    return nodes
  }

  function cleanNode(node) {
    cleanBreakingNode(node)
    cleanOptionalNode(node)
    console.log("node:", node)
    return node

    /**
     * Defines and fixes the HTML tags that are known to break the build during MDX processing.
     *
     * @param {string} node  The node value from the MDAST tree being processed.
     */
    function cleanBreakingNode(node) {
      switch (node) {
        case "<hr>":
          replaceTag(node.match(/<hr>/g), "<hr/>")
          break
        case "<br>":
          replaceTag(node.match(/<br>/g), "<br/>")
          break
        case "<b>":
          replaceTag(node.match(/(<b>)/g), "**")
          break
        case "</b>":
          replaceTag(node.match(/(<\/b>)/g), "**")
          break
        default:
          // Closes open image tags, which break MDX processing.
          const openImgTag = node.match(/<img\s*(.*?)[^/]>/g)
          if (openImgTag) {
            replaceTag(openImgTag, openImgTag[0].split(">").join("/>"))
          }
          break
      }
    }

    /**
     * Defines and fixes the HTML tags specified in the plugin options.
     *
     * @param {string} node  The node value from the MDAST tree being processed.
     */
    function cleanOptionalNode(node) {
      const optionNodes = {
        "<em>": function() {
          replaceTag(node.match(/(<em>+|<\/em>)/g), "_")
        },
        "<strong>": function() {
          replaceTag(node.match(/(<strong>+|<\/strong>)/g), "**")
        },
        "<i>": function() {
          replaceTag(node.match(/(<i>+|<\/i>)/g), "_")
        },
        default: function() {
          console.log(`The ${tag} tag is not yet supported.`)
        },
      }

      for (const tag of pluginOptionTags) {
        ;(optionNodes[tag] || optionNodes["default"])()
      }
    }

    /**
     * Sets the node value to a fixed tag or a markdown element.
     *
     * @param {RegExpMatchArray} invalidTag  Open tag that breaks the MDX/JSX processing.
     * @param {string} replacement  Closed tag or markdown element that replaces invalidTag.
     */
    function replaceTag(invalidTag, replacement) {
      if (invalidTag) {
        let fixedTag = invalidTag[0].split(invalidTag[0]).join(replacement)
        node = node.split(invalidTag[0]).join(fixedTag)
      }
    }
  }
}
