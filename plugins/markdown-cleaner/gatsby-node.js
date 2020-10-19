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

const unified = require("unified")
const parse = require("remark-parse")
const stringify = require("remark-stringify")
const vfile = require("to-vfile")
const shell = require("shelljs")
const markdownCleaner = require("./markdownCleaner")

require("dotenv").config({
  path: `.env`,
})

const cleaningOptions = {
  addLineBreaks: "addLineBreaks",
  cleanHtmlNodes: "cleanHtmlNodes",
}

/**
 * The first Gatsby life-cycle hook. Used in this plugin to clean and/or
 * convert HTML tags within markdown files. This cleaning takes place before
 * the MDX/JSX processing. So if the markdown is 'clean' or this plugin
 * is thorough, the MDX/JSX processing should go smoothly, meaning that
 * the markdown won't break the build and will display beautifully in the
 * browser as intended. If not, the plugin is designed to be extensible.
 *
 * @param {object} _ Gatsby api object(this is not used in this plugin)
 * @param {object} pluginOptions Plugin options
 */
exports.onPreInit = (_, pluginOptions) => {
  const { localProjectDir, optionalTags } = pluginOptions
  const files = shell.ls("-Rl", `${localProjectDir}/**/*.{md,mdx}`)

  for (const file of files) {
    if (file.isFile()) {
      // Adds proper line breaks below HTML/JSX tags so they can be processed correctly
      unified()
        .use(parse)
        .use(markdownCleaner, optionalTags, cleaningOptions.addLineBreaks)
        .use(stringify)
        .process(vfile.readSync(`${file.name}`), function(err, file) {
          if (file) {
            vfile.writeSync(file)
          }
        })

      // Fixes HTML/JSX tags by transforming HTML into markdown or adding closing tags as needed.
      unified()
        .use(parse)
        .use(markdownCleaner, optionalTags, cleaningOptions.cleanHtmlNodes)
        .use(stringify)
        .process(vfile.readSync(`${file.name}`), function(err, file) {
          if (file) {
            vfile.writeSync(file)
          }
        })
    }
  }
}
