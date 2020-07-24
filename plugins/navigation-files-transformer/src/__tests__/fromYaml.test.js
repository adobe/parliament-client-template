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

const fromYaml = require("../fromYaml")

test("Magento devdocs navigation format", () => {
  const fileContent = `
type: navigation
order: 1
title: About
name: section-1
url: /
pages:
  - title: Home
    url: /

  - title: Page 2
    url: /page-2/
    pages:
      - title: Example
        url: /example/
        pages:
          - title: Nest a page
            url: /nested/page/

  - title: Diagrams
    url: /diagrams/

  - title: Hello World
    url: /hello/
`
  const parsedContent = fromYaml(fileContent)

  expect(parsedContent).toMatchSnapshot()
})

test("Valid yaml but not navigation file", () => {
  const fileContent = `
name: Yaml file
id: 112358
message: Hello World
`
  const parsedContent = fromYaml(fileContent)

  expect(parsedContent).toBeUndefined()
})

test("Empty file content", () => {
  const fileContent = ``
  const parsedContent = fromYaml(fileContent)

  expect(parsedContent).toBeUndefined()
})

test("Multiple docs", () => {
  const fileContent = `
---
name: Document 1
id: 12345
...
---
name: Document 2
id: 6789
`
  const parsedContent = fromYaml(fileContent)

  expect(parsedContent).toBeUndefined()
})
