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
import ProgressBarDrawer from "../components/ProgressBarDrawer"
import SiteMenu from "../components/SiteMenu"
import RenderMdx from "../components/RenderMdx"
import NextPrev from "../components/NextPrev"
import Checkmark from "@spectrum-icons/workflow/Checkmark"

import { findSelectedPageNextPrev } from "../util/index"
import {
  completedModules,
  courseModulePages,
  courseModuleIx,
} from "../util/course"
import { useVersionedLocalStore } from "../util/localstore"

import { Flex, View } from "@adobe/react-spectrum"
import { Contributors, Link } from "@adobe/parliament-ui-components"
import SiteActionButtons from "../components/SiteActionButtons"
import RightRail from "../components/RightRail"

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
    location.pathname,
    parliamentNavigation.pages,
    dirname,
    "Course"
  )

  const coursePages = courseModulePages(parliamentNavigation.pages, dirname)
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
  const currentModuleIx = courseModuleIx(coursePages, location.pathname)
  const progressedModulePages = coursePages.map((page) =>
    completedModulePaths.includes(page.path) ? page : { title: page.title }
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
          pages={parliamentNavigation.pages}
          depth={2}
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
          <br />
          <ProgressBarDrawer
            pages={progressedModulePages}
            currentIx={currentModuleIx}
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
            issues={parliamentNavigation.issues}
          />
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
      issues
    }
    site {
      siteMetadata {
        sourceFiles
      }
    }
  }
`
