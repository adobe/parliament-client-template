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

const reduceGraphQLToJson = require("../utils")

test("Magento devdocs navigation format", () => {
  const nodes = [
    {
      section: "section-1",
      title: "About",
      homePage: "/",
      order: 1,
      pages: [
        { title: "Home", path: "/", pages: [] },
        {
          title: "Page 2",
          path: "/page-2/",
          pages: [
            {
              title: "Example",
              path: "/example/",
              pages: [
                { title: "Nest a page", path: "/nested/page/", pages: [] },
              ],
            },
          ],
        },
        { title: "Diagrams", path: "/diagrams/", pages: [] },
        { title: "Hello World", path: "/hello/", pages: [] },
      ],
      id: "e5d5a1de-9d87-5aa5-9726-1ae4174014c6",
      children: [],
      parent: "de4432b9-f901-580c-8541-f3c966b63d3d",
      internal: {
        content: "",
        contentDigest: "f6d5d4facb217c8ef592b70110f87f11",
        type: "ParliamentNavigation",
        counter: 189,
        owner: "navigation-files-transformer",
      },
    },
  ]

  expect(reduceGraphQLToJson(nodes)).toMatchSnapshot()
})

test("manifest-docs.json format", () => {
  const nodes = [
    {
      section: "Analytics",
      title: "Analytics",
      order: 0,
      pages: [
        {
          title: "Overview",
          path: "DevRel/analytics-2.0-apis/master/README.md",
          pages: [],
        },
        {
          title: "Include Inline",
          path: "DevRel/analytics-2.0-apis/master/wrap-support.md",
          pages: [],
        },
        {
          title: "SDS",
          path: "",
          pages: [
            {
              title: "JSON File",
              path: "DevRel/analytics-2.0-apis/master/SDS/swagger.json",
              pages: [],
            },
            {
              title: "Markdown File",
              path: "DevRel/analytics-2.0-apis/master/SDS/swagger.md",
              pages: [],
            },
          ],
        },
        {
          title: "API References",
          path: "",
          pages: [
            {
              title: "Analytics APIs",
              path: "DevRel/analytics-2.0-apis/master/docs/swagger.json",
              pages: [],
            },
            {
              title: "Petstore APIs",
              path: "DevRel/analytics-2.0-apis/master/docs/petstore.yaml",
              pages: [],
            },
          ],
        },
        {
          title: "Getting Started",
          path: "DevRel/analytics-2.0-apis/master/create-oauth-client.md",
          pages: [
            {
              title: "Creating an OAuth Client",
              path: "DevRel/analytics-2.0-apis/master/create-oauth-client.md",
              pages: [],
            },
            {
              title: "OAuth using cURL",
              path: "DevRel/analytics-2.0-apis/master/oauth-curl.md",
              pages: [],
            },
            {
              title: "OAuth using POSTMAN",
              path: "DevRel/analytics-2.0-apis/master/oauth-postman.md",
              pages: [],
            },
            {
              title: "JWT Authentication",
              path: "DevRel/analytics-2.0-apis/master/jwt.md",
              pages: [],
            },
          ],
        },
        {
          title: "Reporting API Guide",
          path: "DevRel/analytics-2.0-apis/master/reporting-guide.md",
          pages: [
            {
              title: "Reporting with Multiple Breakdowns",
              path:
                "DevRel/analytics-2.0-apis/master/reporting-multiple-breakdowns.md",
              pages: [],
            },
            {
              title: "Reporting Tips and Tricks",
              path: "DevRel/analytics-2.0-apis/master/reporting-tricks.md",
              pages: [],
            },
          ],
        },
        {
          title: "Migrating Guide",
          path: "DevRel/analytics-2.0-apis/master/migration-guide.md",
          pages: [],
        },
        {
          title: "Calculated Metrics",
          path: "DevRel/analytics-2.0-apis/master/calculatedmetrics.md",
          pages: [],
        },
        {
          title: "Segments APIs",
          path: "DevRel/analytics-2.0-apis/master/segments-guide.md",
          pages: [
            {
              title: "Segment Definition Data Structure",
              path: "DevRel/analytics-2.0-apis/master/segments.md",
              pages: [],
            },
          ],
        },
        {
          title: "FAQ",
          path: "DevRel/analytics-2.0-apis/master/faq.md",
          pages: [],
        },
        {
          title: "Support",
          path: "DevRel/analytics-2.0-apis/master/support.md",
          pages: [],
        },
        {
          title: "YouTube",
          path: "DevRel/analytics-2.0-apis/master/youtube.md",
          pages: [],
        },
      ],
      homePage: "DevRel/analytics-2.0-apis/master/README.md",
      id: "5d67cc28-602c-5ebb-8307-c1d81240d893",
      children: [],
      parent: "75819261-56f3-5484-91e1-d4851a641d4b",
      internal: {
        content: "",
        contentDigest: "b778acbd958c405167b1936d1f95369e",
        type: "ParliamentNavigation",
        counter: 192,
        owner: "navigation-files-transformer",
      },
    },
  ]

  expect(reduceGraphQLToJson(nodes)).toMatchSnapshot()
})
