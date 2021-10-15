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
import { useEffect, useState } from "react"
import { css, jsx } from "@emotion/react"
import { graphql } from "gatsby"
import DocLayout from "../components/doclayout"
import ExperimentalBadge from "../components/ExperimentalBadge"
import PageActions from "../components/PageActions"
import renderAst from "../util/AFMRehype"
import CourseMenu from "../components/CourseMenu"
import NextPrev from "../components/NextPrev"
import Checkmark from "@spectrum-icons/workflow/Checkmark"

import { findSelectedPageNextPrev } from "../util/index"
import { completedModules } from "../util/course"
import { useVersionedLocalStore } from "../util/localstore"

import { Flex, View } from "@adobe/react-spectrum"
import { Contributors, Link } from "@adobe/parliament-ui-components"
import SiteActionButtons from "../components/SiteActionButtons"
import RightRail from "../components/RightRail"

const CoursesTemplate = ({ data, location, pageContext }) => {
  const { file, parliamentNavigation, site } = data
  const { siteMetadata } = site
  const { sourceFiles } = siteMetadata
  const { absolutePath, childMarkdownRemark } = file
  const { htmlAst, tableOfContents, timeToRead, frontmatter } =
    childMarkdownRemark
  const { contributors, gitRemote, dirname } = pageContext
  const pathToFiles = sourceFiles.endsWith("/")
    ? sourceFiles
    : `${sourceFiles}/`
  const relativePath = absolutePath.replace(pathToFiles, "")
  const { homePage, issues, pages } = parliamentNavigation
  const { nextPage, previousPage } = findSelectedPageNextPrev(
    location.pathname,
    pages,
    dirname,
    "Course",
    homePage
  )

  const { courseVersion } = frontmatter
  const [visited, markVisited] = useVersionedLocalStore(
    dirname,
    location.pathname,
    courseVersion
  )

  let [courseProgress, progressLoaded] = useState(false)
  useEffect(() => {
    // getItem returns null if key DNE
    if (courseProgress || courseProgress === null) {
      return
    }

    courseProgress = window.localStorage.getItem(dirname)
    courseProgress = courseProgress ? JSON.parse(courseProgress) : false
    progressLoaded(courseProgress)
  })
  let completedModulePaths = completedModules(courseProgress)

  return (
    <DocLayout
      title={pageContext.seo}
      location={location}
      gitRemote={gitRemote}
      currentPage={location.pathname}
      pages={pages}
      sideNav={
        <CourseMenu
          completedModulePaths={completedModulePaths}
          currentPage={location.pathname}
          pages={pages}
        />
      }
      rightRail={
        <RightRail>
          <PageActions
            gitRemote={gitRemote}
            relativePath={relativePath}
            tableOfContents={tableOfContents}
            timeToRead={timeToRead}
          />
          <hr />
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
        <Flex alignItems="center">
          {visited && (
            <Flex alignItems="center">
              <Checkmark /> You have already read this module!
            </Flex>
          )}

          <SiteActionButtons
            gitRemote={gitRemote}
            relativePath={relativePath}
            issues={issues}
          />
        </Flex>
      </div>
      <ExperimentalBadge />
      {renderAst(htmlAst)}

      <Flex
        direction="column"
        justifyContent="space-between"
        gap="size-100"
        marginTop="size-800"
        marginBottom="size-400"
      >
        <View>
          <NextPrev
            markProgression={markVisited}
            nextPage={nextPage}
            previousPage={previousPage}
          />
        </View>
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

export default CoursesTemplate

export const query = graphql`
  query CoursesTemplateQuery($id: String!) {
    file(id: { eq: $id }) {
      id
      name
      absolutePath
      childMarkdownRemark {
        htmlAst
        tableOfContents(maxDepth: 3)
        timeToRead
        frontmatter {
          courseVersion
        }
      }
    }
    parliamentNavigation {
      homePage
      issues
      pages
    }
    site {
      siteMetadata {
        sourceFiles
      }
    }
  }
`
