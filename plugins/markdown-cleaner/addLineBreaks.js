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

module.exports = addLineBreaks

/**
 * Adds an empty line (carriage return) to most HTML/JSX tags/components in the markdown file.
 * This ensures the tag or component is processed correctly as JSX. Otherwise content that
 * immediately follows the tag/component will be concatenated and processed as plain text.
 * See https://github.com/adobe/gatsby-theme-parliament/issues/19#issuecomment-699075713.
 *
 * @param {string} nodeValue  The node value from the MDAST tree (file) being processed.
 */
function addLineBreaks(nodeValue) {
  const hasPreTags = nodeValue.includes("<pre>") || nodeValue.includes("</pre>")
  const hasTableTags =
    nodeValue.includes("<table>") || nodeValue.includes("</table>")
  const hasParagraphTags =
    nodeValue.includes("<p>") || nodeValue.includes("</p>")

  // If paragraph tags (`<p></p>`) are not removed first, they can hide,
  // the 'bad tags' that will break the build during MDX/JSX processing.
  //
  if (hasParagraphTags) {
    replaceTag(nodeValue.match(/\<p\s*(.*?)\>/g), "")
    replaceTag(nodeValue.match(/\<\/p\>/g), "\n\r") // give it a line break for good measure
    return nodeValue
  }

  // If there are HTML tables in the markdown, don't add line breaks,
  // but replace any <br> tags within those tables. This could be expanded.
  //
  if (hasTableTags) {
    replaceTag(nodeValue.match(/\<br\>/g), "<br/>")
    return nodeValue
  }

  // If there are HTML <pre> tags demarcating code in the markdown,
  // don't add line breaks. Just replace the <pre> tags with markdown
  // code blocks and a language that can be updated by the content
  // maintainer. A placeholder for the code block's language must be added.
  // Otherwise, the parser will replace the backticks with a four-space
  // indention to define the code block.
  //
  if (hasPreTags) {
    replaceTag(nodeValue.match(/\<pre\>/g), "```add_language")
    replaceTag(nodeValue.match(/\<\/pre\>/g), "```\n\r") // give it a line break just in case
    return nodeValue
  }

  const tagNoLine = nodeValue.match(/(?<=(>))\s*\n/g)
  replaceTag(tagNoLine, "\n\r") // adds critical line break to all other tags
  return nodeValue

  function replaceTag(invalidTag, replacement) {
    if (invalidTag) {
      let fixedTag = invalidTag[0].split(invalidTag[0]).join(replacement)
      nodeValue = nodeValue.split(invalidTag[0]).join(fixedTag)
    }
  }
}
