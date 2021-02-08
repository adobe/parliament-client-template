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

import React from "react"
import { graphql } from "gatsby"
import DocLayout from "../components/doclayout"
import SEO from "../components/seo"
import {
  Footer,
  OpenAPIBlock,
  OpenApiGrid,
  OpenApiGridContent,
  OpenApiGridHeader,
  OpenApiGridFooter,
} from "@adobe/parliament-ui-components"

import HeaderBar from "../components/HeaderBar"

const OpenApiTemplate = ({ data, pageContext, location }) => {
  const { parliamentNavigation, allHeaderTabs } = data
  const tabs = allHeaderTabs.edges.map(({ node }) => node)

  return (
    <DocLayout>
      <SEO title={pageContext.seo} />
      <OpenApiGrid>
        <OpenApiGridHeader>
          <HeaderBar
            location={location}
            gitRemote={pageContext.gitRemote}
            pages={parliamentNavigation.pages}
            forceMobile={true}
            tabs={tabs}
          />
        </OpenApiGridHeader>
        <OpenApiGridContent>
          <OpenAPIBlock spec={pageContext.spec} />
        </OpenApiGridContent>
        <OpenApiGridFooter>
          <Footer />
        </OpenApiGridFooter>
      </OpenApiGrid>
    </DocLayout>
  )
}

export const query = graphql`
  query OpenApiTemplateQuery {
    parliamentNavigation {
      pages
    }
    allHeaderTabs {
      edges {
        node {
          path
          id
          title
        }
      }
    }
  }
`

export default OpenApiTemplate
