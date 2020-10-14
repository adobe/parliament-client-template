"use strict"

module.exports = addLines

function addLines() {
  return formatHtml

  function formatHtml(node) {
    var type = node && node.type
    if (type === `html`) {
      var cleanedTag = addLine(node.value)
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
   * Recurses through the children of a node to add empty lines.
   *
   * @param {string} node  The node value from the MDAST tree being processed.
   */
  function cleanChildren(nodes) {
    var index = -1
    var length = nodes.length
    var result = []
    var value

    while (++index < length) {
      value = formatHtml(nodes[index])
      if (value && typeof value.length === "number") {
        result = result.concat(value.map(formatHtml))
      } else {
        result.push(value)
      }
    }
    return result
  }

  /**
   * Adds an empty line below the tags in markdown file.
   * This ensures the tag is processed correctly as JSX.
   * Otherwise the subsequent content will be processed as plain text.
   *
   * @param {string} node  The node value from the MDAST tree being processed.
   */
  function addLine(node) {
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
