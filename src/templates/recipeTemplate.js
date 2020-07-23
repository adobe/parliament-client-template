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

/** @jsx jsx */
import { jsx } from "@emotion/core"
import { graphql } from "gatsby"
import DocLayout from "../components/doclayout"
import { Footer } from "@adobe/parliament-ui-components"
import SiteNav from "../components/SiteNav"
import SEO from "../components/seo"
import renderAst from "../utils/AFMRehype"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { MDXProvider } from "@mdx-js/react"

import "../components/recipe.css"

import {
  Grid,
  GridNav,
  GridContent,
  GridFooter,
} from "@adobe/parliament-ui-components"

const MarkdownTemplate = props => {
  const { file } = props.data
  const { childMdx } = file
  const { body } = childMdx
  const { gitRemote, pages } = props.pageContext

  return (
    <DocLayout>
      <SEO title={props.pageContext.seo} />
      <Grid>
        <GridNav>
          <SiteNav
            currentPage={props.location.pathname}
            gitRemote={gitRemote}
            pages={pages}
          />
        </GridNav>
        <GridContent>
          <div class="recipeContent">
            <MDXProvider components={renderAst.components}>
              <MDXRenderer>{body}</MDXRenderer>
            </MDXProvider>
          </div>
        </GridContent>
        <GridFooter>
          <Footer />
        </GridFooter>
      </Grid>
    </DocLayout>
  )
}

export default MarkdownTemplate

export const query = graphql`
  query MarkdownTemplateQuery2($id: String!) {
    file(id: { eq: $id }) {
      id
      name
      childMdx {
        body
      }
    }
  }
`
