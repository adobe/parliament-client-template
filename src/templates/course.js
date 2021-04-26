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
import { graphql } from "gatsby"
import CourseNav from "../components/CourseNav"
import DocLayout from "../components/doclayout"
import ExperimentalBadge from "../components/ExperimentalBadge"
import PageActions from "../components/PageActions"
import ProgressBar from "../components/ProgressBar"
import SiteMenu from "../components/SiteMenu"
import RenderMdx from "../components/RenderMdx"
import NextPrev from "../components/NextPrev"
import Checkmark from "@spectrum-icons/workflow/Checkmark"

import { findSelectedPageNextPrev, pageTitles } from "../util/index"
import { courseModulePages, courseModuleIx } from "../util/course"
import { useVersionedLocalStore } from "../util/localstore"

import { Flex, View } from "@adobe/react-spectrum"
import {
  ActionButtons,
  Contributors,
  Link,
} from "@adobe/parliament-ui-components"

const CoursesTemplate = ({ data, location, pageContext }) => {
  const { file, parliamentNavigation, site } = data
  const { siteMetadata } = site
  const { sourceFiles } = siteMetadata
  const { absolutePath, childMdx } = file
  const { body, tableOfContents, timeToRead, frontmatter } = childMdx
  const { contributors, gitRemote, dirname } = pageContext
  const pathToFiles = sourceFiles.endsWith("/")
    ? sourceFiles
    : `${sourceFiles}/`
  const relativePath = absolutePath.replace(pathToFiles, "")
  const { nextPage, previousPage } = findSelectedPageNextPrev(
    location.pathname, parliamentNavigation.pages, dirname, "Course"
  )

  const coursePages = courseModulePages(parliamentNavigation.pages, dirname)
  const { courseVersion } = frontmatter
  const [visited, markVisited] = useVersionedLocalStore(
    dirname, location.pathname, courseVersion
  )

  return (
    <DocLayout
      title={pageContext.seo}
      location={location}
      gitRemote={gitRemote}
      currentPage={location.pathname}
      pages={parliamentNavigation.pages}
      sideNav={
        <SiteMenu
          currentPage={location.pathname}
          gitRemote={gitRemote}
          pages={parliamentNavigation.pages}
          CustomNavComponent={CourseNav}
        />
      }
      rightRail={
        <aside
          css={css`
            position: fixed;
            top: var(--spectrum-global-dimension-size-800);
            height: 100%;
          `}
        >
          <PageActions
            gitRemote={gitRemote}
            relativePath={relativePath}
            tableOfContents={tableOfContents}
            timeToRead={timeToRead}
          />

          <hr />

          <ProgressBar
            sections={pageTitles(coursePages)}
            currentIx={courseModuleIx(coursePages, location.pathname)} />

          Powered by{" "}
          <Link href="https://developers.corp.adobe.com/parliament-docs/README.md">
            Parliament
          </Link>
        </aside>
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

          {gitRemote !== null ? (
            <ActionButtons
              gitUrl={`${gitRemote.protocol}://${gitRemote.resource}/${gitRemote.full_name}`}
              filePath={relativePath}
              branch={gitRemote.ref}
            />
          ) : (
            ""
          )}
        </Flex>
      </div>
      <ExperimentalBadge />
      <RenderMdx>{body}</RenderMdx>

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
      childMdx {
        body
        tableOfContents(maxDepth: 3)
        timeToRead
        frontmatter {
          courseVersion
        }
      }
    }
    parliamentNavigation {
      pages
    }
    site {
      siteMetadata {
        sourceFiles
      }
    }
  }
`
