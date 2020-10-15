"use strict"

module.exports = addLineBreaks

function addLineBreaks() {
  return fixNode

  function fixNode(node) {
    const type = node && node.type
    if (type === `html`) {
      const cleanedTag = addLineBreak(node.value)
      try {
        node.value = cleanedTag
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
   * Recurses through the children of a node to add empty line breaks.
   *
   * @param {string} nodeChildren  The node value from the MDAST tree being processed.
   */
  function cleanChildren(nodeChildren) {
    let nodes = []
    for (const node of nodeChildren) {
      let cleanedNode = fixNode(node)
      nodes.push(cleanedNode)
    }
    return nodes
  }

  /**
   * Adds an empty line below the tags in markdown file.
   * This ensures the tag is processed correctly as JSX.
   * Otherwise the subsequent content will be processed as plain text.
   * See https://github.com/adobe/gatsby-theme-parliament/issues/19#issuecomment-699075713.
   *
   * @param {string} node  The node value from the MDAST tree (file) being processed.
   */
  function addLineBreak(node) {
    const tagNoLine = node.match(/(?<=(>))\s*\n/g)
    replaceTag(tagNoLine, "\n\r")

    function replaceTag(invalidTag, tagReplacement) {
      if (invalidTag) {
        let validTag = invalidTag[0].split(invalidTag[0]).join(tagReplacement)
        node = node.split(invalidTag[0]).join(validTag)
      }
    }

    try {
      return node
    } catch (e) {
      throw Error(`${e.message}`)
    }
  }
}
