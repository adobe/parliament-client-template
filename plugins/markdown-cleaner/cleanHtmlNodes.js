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

module.exports = cleanHtmlNodes

function cleanHtmlNodes(nodeValue, pluginOptionTags) {
  const optionalHtmlTags = {
    "<em>": () => {
      replaceTag(nodeValue.match(/(<em>+|<\/em>)/g), "_")
    },
    "<strong>": () => {
      replaceTag(nodeValue.match(/(<strong>+|<\/strong>)/g), "**")
    },
    "<i>": () => {
      replaceTag(nodeValue.match(/(<i>+|<\/i>)/g), "_")
    },
    "<s>": () => {
      replaceTag(nodeValue.match(/(<s>+|<\/s>)/g), "~~")
    },
    default: () => {
      console.log(`The ${tag} tag is not yet supported.`)
    },
  }

  const breakingHtmlTags = {
    "<hr>": () => {
      replaceTag(nodeValue.match(/<hr>/g), "<hr/>")
    },
    "<br>": () => {
      replaceTag(nodeValue.match(/<br>/g), "<br/>")
    },
    "<b>": () => {
      replaceTag(nodeValue.match(/(<b>)/g), "**")
    },
    "</b>": () => {
      replaceTag(nodeValue.match(/(<\/b>)/g), "**")
    },
    "<wbr>": () => {
      replaceTag(nodeValue.match(/<wbr>/g), "")
    },
    default: () => {
      for (tag of pluginOptionTags) {
        ;(optionalHtmlTags[tag] || optionalHtmlTags["default"])()
      }
    },
  }

  ;(breakingHtmlTags[nodeValue] || breakingHtmlTags["default"])()

  function replaceTag(invalidTag, replacement) {
    if (invalidTag) {
      let fixedTag = invalidTag[0].split(invalidTag[0]).join(replacement)
      nodeValue = nodeValue.split(invalidTag[0]).join(fixedTag)
    }
  }

  return nodeValue
}
