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

const addLineBreaks = require("./addLineBreaks")
const cleanHtmlNodes = require("./cleanHtmlNodes")

module.exports = markdownCleaner

function markdownCleaner(pluginOptionTags, cleaningOption) {
  let breakingTags = ["<hr>", "<br>", "<b>", "</b>", "<pre/>"]
  let allTags = [...breakingTags, ...pluginOptionTags]

  return cleanMarkdown
  function cleanMarkdown(node) {
    const type = node && node.type
    if (type === `html`) {
      let nodeValue
      if (cleaningOption === "addLineBreaks") {
        nodeValue = addLineBreaks(node.value)
      } else {
        nodeValue = cleanHtmlNodes(node.value, allTags)
      }
      try {
        node.value = nodeValue
      } catch (e) {
        throw Error(`${e.message}`)
      }
    }
    if (node.children) {
      let nodes = []
      for (const childNode of node.children) {
        let cleanedNode = cleanMarkdown(childNode)
        nodes.push(cleanedNode)
      }
      node.children = nodes
    }
    return node
  }
}
