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
import { Footer } from "@adobe/parliament-ui-components"
import PageActions from "../components/PageActions"
import SiteNav from "../components/SiteNav"
import SEO from "../components/seo"
import renderAst from "../utils/AFMRehype"

import {
  Grid,
  GridNav,
  GridContent,
  GridContentInner,
  GridFooter,
  ActionButtons,
} from "@adobe/parliament-ui-components"

const MarkdownTemplate = ({ data, location, pageContext }) => {
  const { file, parliamentNavigation } = data
  const { modifiedTime, relativePath, childMarkdownRemark } = file
  const { htmlAst, tableOfContents, timeToRead } = childMarkdownRemark
  const { gitRemote } = pageContext

  return (
    <DocLayout>
      <SEO title={pageContext.seo} />
      <Grid>
        <GridNav>
          <SiteNav
            currentPage={location.pathname}
            gitRemote={gitRemote}
            pages={parliamentNavigation.pages}
          />
        </GridNav>
        <GridContent id="contentMain">
          <GridContentInner>
            <div
              css={css`
                float: right;
                z-index: 100;
              `}
            >
              <div
                css={css`
                  padding-bottom: 20px;
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
            </div>
            {renderAst(htmlAst)}
          </GridContentInner>
        </GridContent>
        <div
          id="rightRail"
          css={css`
            padding-top: 30px;
            padding-left: 16px;
            padding-right: 16px;

            @media screen and (min-width: 1201px) {
              grid-area: 1 / 11 / 2 / 13;
            }
            @media screen and (max-width: 1200px) {
              display: none;
            }
          `}
        >
          <PageActions
            gitRemote={gitRemote}
            modifiedTime={modifiedTime}
            relativePath={relativePath}
            tableOfContents={tableOfContents}
            timeToRead={timeToRead}
          />
          Powered by{" "}
          <a href="https://docs.corp.adobe.com/parliament-docs/README.md">
            Parliament
          </a>
        </div>
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
      modifiedTime(formatString: "YYYY-MM-DD")
      name
      relativePath
      childMarkdownRemark {
        htmlAst
        tableOfContents
        timeToRead
      }
    }
    parliamentNavigation {
      pages
    }
  }
`
