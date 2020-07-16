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

    expect(parsedContent).toBeUndefined();
})