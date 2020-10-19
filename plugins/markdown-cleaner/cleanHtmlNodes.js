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

function cleanHtmlNodes(nodeValue, tags) {
  const htmlTags = {
    "<hr>": replaceTag(nodeValue.match(/<hr>/g), "<hr/>"),
    "<br>": replaceTag(nodeValue.match(/<br>/g), "<br/>"),
    "<b>": replaceTag(nodeValue.match(/(<b>+|<\/b>)/g), "**"),
    "</b>": replaceTag(nodeValue.match(/(<\/b>)/g), "**"),
    "<pre/>": replaceTag(nodeValue.match(/(<pre\/>)/g), ""),
    "<em>": replaceTag(nodeValue.match(/(<em>+|<\/em>)/g), "_"),
    "<strong>": replaceTag(nodeValue.match(/(<strong>+|<\/strong>)/g), "**"),
    "<i>": replaceTag(nodeValue.match(/(<i>+|<\/i>)/g), "_"),
    "<code>": replaceTag(nodeValue.match(/(<code>+|<\/code>)/g), "```"),
    default: function() {
      const openImgTag = nodeValue.match(/<img\s*(.*?)[^/]>/g)
      if (openImgTag) {
        replaceTag(openImgTag, openImgTag[0].split(">").join("/>"))
        return
      }
    },
  }

  ;(htmlTags[nodeValue] || htmlTags["default"])()

  function replaceTag(invalidTag, replacement) {
    if (invalidTag) {
      let fixedTag = invalidTag[0].split(invalidTag[0]).join(replacement)
      nodeValue = nodeValue.split(invalidTag[0]).join(fixedTag)
    }
  }

  return nodeValue
}
