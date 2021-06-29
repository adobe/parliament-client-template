/**
 *  Copyright 2021 Adobe. All rights reserved.
 *  This file is licensed to you under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License. You may obtain a copy
 *  of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software distributed under
 *  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 *  OF ANY KIND, either express or implied. See the License for the specific language
 *  governing permissions and limitations under the License.
 */

if (process.argv[2] == 1) {
  console.log("❌  Build Failed")
  console.log("")
  console.log("We were unable to find a manifest file.")
  console.log("")
  console.log("Possible causes of this problem:")
  console.log("")
  console.log("1. Your repo does not contain a manifest file.")
  console.log(
    `2. The source patterns you have configured [${process.env.GATSBY_SOURCE_PATTERNS}]`
  )
  console.log(
    "   does not include the folder where the manifest file is contained."
  )
  console.log(
    "3. Your manifest file is not valid JSON or YAML. Try running it against a JSON/YAML linter"
  )
  console.log("   JSON: https://jsonformatter.org/json-pretty-print")
  console.log("   YAML: http://www.yamllint.com/")
}
