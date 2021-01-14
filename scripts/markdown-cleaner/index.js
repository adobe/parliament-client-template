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
  path: `.env.${process.env.NODE_ENV}`,
})

const cleaningOptions = {
  addLineBreaks: "addLineBreaks",
  cleanHtmlNodes: "cleanHtmlNodes",
}

const optionalTags = []

const files = shell.ls("-RLl", `${process.env.LOCAL_PROJECT_DIRECTORY}/**/*.md`)

for (const file of files) {
  if (file.isFile()) {
    // Adds proper line breaks below HTML/JSX tags so they can be processed correctly
    unified()
      .use(parse)
      .use(markdownCleaner, cleaningOptions.addLineBreaks)
      .use(stringify)
      .process(vfile.readSync(`${file.name}`), function (err, file) {
        if (err) {
          console.error(err)
        }
        if (file) {
          vfile.writeSync(file)
        }
      })

    // Fixes HTML/JSX tags by transforming HTML into markdown or adding closing tags as needed.
    unified()
      .use(parse)
      .use(markdownCleaner, cleaningOptions.cleanHtmlNodes, optionalTags)
      .use(stringify)
      .process(vfile.readSync(`${file.name}`), function (err, file) {
        if (err) {
          console.error(err)
        }
        if (file) {
          vfile.writeSync(file)
        }
      })
  }
}
