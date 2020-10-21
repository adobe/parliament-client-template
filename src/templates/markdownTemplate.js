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
import { css, jsx } from "@emotion/core"
import { graphql } from "gatsby"
import DocLayout from "../components/doclayout"
import PageActions from "../components/PageActions"
import SiteMenu from "../components/SiteMenu"
import SEO from "../components/seo"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { MDXProvider } from "@mdx-js/react"
import { componentsMapping } from "../components/componentsMapping"

import { Flex, View } from "@adobe/react-spectrum"
import {
  ActionButtons,
  Contributors,
  Footer,
  Grid,
  GridHeader,
  GridNav,
  GridContent,
  GridFooter,
  GridRightRail,
} from "@adobe/parliament-ui-components"
import HeaderBar from "../components/HeaderBar"

const MarkdownTemplate = ({ data, location, pageContext }) => {
  const { file, parliamentNavigation } = data
  const { relativePath, childMdx } = file
  const { body, tableOfContents, timeToRead } = childMdx
  const { contributors, gitRemote, tabs } = pageContext

  console.log(contributors)
  console.log(gitRemote)

  return (
    <DocLayout>
      <SEO title={pageContext.seo} />
      <Grid>
        <GridHeader>
          <HeaderBar
            location={location}
            gitRemote={gitRemote}
            pages={parliamentNavigation.pages}
            tabs={tabs}
          />
        </GridHeader>
        <GridNav>
          <SiteMenu
            currentPage={location.pathname}
            gitRemote={gitRemote}
            pages={parliamentNavigation.pages}
          />
        </GridNav>
        <GridContent>
          <div
            css={css`
              float: right;
              z-index: 100;
            `}
          >
            {gitRemote !== null ? (
              <ActionButtons
                gitUrl={`${gitRemote.protocol}://${gitRemote.resource}/${gitRemote.full_name}`}
                filePath={relativePath}
                branch={gitRemote.ref}
              />
            ) : (
              ""
            )}
          </div>
          <MDXProvider components={componentsMapping}>
            <MDXRenderer>{body}</MDXRenderer>
          </MDXProvider>

          <Flex
            alignItems="center"
            justifyContent="space-between"
            marginTop="size-800"
            marginBottom="size-400"
          >
            <View>
              <Contributors
                href={`${gitRemote.protocol}://${gitRemote.resource}/${gitRemote.full_name}/blob/${gitRemote.ref}/${relativePath}`}
                contributors={contributors}
                date={
                  contributors[0]
                    ? new Date(contributors[0].date).toLocaleDateString()
                    : new Date().toLocaleDateString()
                }
              />
            </View>
          </Flex>
        </GridContent>
        <GridRightRail>
          <PageActions
            gitRemote={gitRemote}
            relativePath={relativePath}
            tableOfContents={tableOfContents}
            timeToRead={timeToRead}
          />
          Powered by{" "}
          <a
            href="https://developers.corp.adobe.com/parliament-docs/README.md"
            class="spectrum-Link spectrum-Link--quiet"
          >
            Parliament
          </a>
        </GridRightRail>
        <GridFooter>
          <Footer />
        </GridFooter>
      </Grid>
    </DocLayout>
  )
}

export default MarkdownTemplate

export const query = graphql`
  query MarkdownTemplateQuery($id: String!) {
    file(id: { eq: $id }) {
      id
      name
      relativePath
      childMdx {
        body
        tableOfContents(maxDepth: 3)
        timeToRead
      }
    }
    parliamentNavigation {
      pages
    }
  }
`
