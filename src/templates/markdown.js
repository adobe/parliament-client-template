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
import { css, jsx } from "@emotion/react"
import { graphql, withPrefix } from "gatsby"
import DocLayout from "../components/doclayout"
import PageActions from "../components/PageActions"
import SiteMenu from "../components/SiteMenu"
import renderAst from "../util/AFMRehype"

import { Flex, View } from "@adobe/react-spectrum"
import { Contributors, Link } from "@adobe/parliament-ui-components"
import SiteActionButtons from "../components/SiteActionButtons"
import RightRail from "../components/RightRail"

const MarkdownTemplate = ({ data, location, pageContext }) => {
  const { file, parliamentNavigation, site } = data
  const { siteMetadata } = site
  const { sourceFiles } = siteMetadata
  const { absolutePath, childMarkdownRemark } = file
  const { htmlAst, headings, timeToRead } = childMarkdownRemark
  const { contributors, gitRemote } = pageContext
  const pathToFiles = sourceFiles.endsWith("/")
    ? sourceFiles
    : `${sourceFiles}/`
  const relativePath = absolutePath.replace(pathToFiles, "")
  return (
    <DocLayout
      title={pageContext.seo}
      location={location}
      gitRemote={gitRemote}
      currentPage={location.pathname}
      pages={parliamentNavigation.pages}
      sideNav={
        <SiteMenu
          currentPage={
            location.pathname !== withPrefix("/")
              ? location.pathname
              : parliamentNavigation.homePage
          }
          pages={parliamentNavigation.pages}
        />
      }
      rightRail={
        <RightRail>
          <PageActions
            gitRemote={gitRemote}
            relativePath={relativePath}
            headings={headings}
            timeToRead={timeToRead}
          />
          Powered by{" "}
          <Link href="https://developers.corp.adobe.com/parliament-docs/README.md">
            Parliament
          </Link>
        </RightRail>
      }
    >
      <div
        css={css`
          float: right;
          z-index: 100;
        `}
      >
        <SiteActionButtons
          gitRemote={gitRemote}
          relativePath={relativePath}
          issues={parliamentNavigation.issues}
        />
      </div>
      {renderAst(htmlAst)}

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
    </DocLayout>
  )
}

export default MarkdownTemplate

export const query = graphql`
  query MarkdownTemplateQuery($id: String!) {
    file(id: { eq: $id }) {
      id
      name
      absolutePath
      childMarkdownRemark {
        htmlAst
        headings {
          depth
          id
          value
        }
        timeToRead
      }
    }
    parliamentNavigation {
      pages
      homePage
      issues
    }
    site {
      siteMetadata {
        sourceFiles
      }
    }
  }
`
