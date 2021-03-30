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

const fs = require("fs")
const path = require("path")
const shell = require("shelljs")

const files = [...shell.ls("-RLl", `./inline-images/*.js`)]
const components = []

// Get React Component Names
for (const file of files) {
  if (file.isFile()) {
    const filename = `${path.basename(file.name, ".js")}`
    components.push(filename)
  }
}

// Write inlineImages.js
const importStatements = components.reduce((prevVal, currVal, idx) => {
  return idx == 0
    ? `import ${currVal} from "../../inline-images/${currVal}"`
    : prevVal + `\nimport ${currVal} from "../../inline-images/${currVal}"`
}, "")

const inlineImages =
  "export const inlineImages = { " +
  components.reduce((prevVal, currVal, idx) => {
    return idx == 0
      ? `${currVal.toLowerCase()}: ${currVal}`
      : prevVal + `, ${currVal.toLowerCase()}: ${currVal}`
  }, "") +
  " }"

fs.writeFileSync(
  `./src/components/inlineImages.js`,
  `${importStatements}\n${inlineImages}`
)
