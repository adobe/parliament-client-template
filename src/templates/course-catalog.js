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
import { Fragment, useEffect, useState } from "react"
import { css, jsx } from "@emotion/react"
import { graphql, navigate } from "gatsby"
import CourseNav from "../components/CourseNav"
import DocLayout from "../components/doclayout"
import ExperimentalBadge from "../components/ExperimentalBadge"
import PageActions from "../components/PageActions"
import SiteMenu from "../components/SiteMenu"
import RenderMdx from "../components/RenderMdx"

import {
  ActionButton,
  Divider,
  Flex,
  ProgressCircle,
  View,
  Well
} from "@adobe/react-spectrum"
import {
  ActionButtons,
  Contributors,
  Link,
} from "@adobe/parliament-ui-components"

// TODO: CLEAN - I am NOT proud of ANY of this
// course.js template stores without leading slash
const courseDir = (page) => page.path.split("README.md").shift().replace(/\/$/, "")
const coursePages = (pages, catalogDir) => (
  flattenPages(pages).filter((page) => {
    const pieces = page.path.split(catalogDir).pop().split("/")

    return page.path.indexOf(catalogDir) === 0 &&
      pieces.length === 3 &&
      pieces.pop() === "README.md"
  })
)

const completedModules = (page, progress) =>
  progress[page.path] && Object.keys(progress[page.path])
        .filter((version) => progress[page.path][version])

// TODO: actually match up versions
const courseCompleted = (coursePage, progress) =>
  coursePage.pages.length === completedModules(coursePage, progress).length

const flattenPages = (pages) => {
  if (pages === null) {
    return []
  }

  let flat = []
  const find = (page) => {
    flat.push(page)

    if (page.pages) {
      page.pages.forEach(find)
    }
  }

  pages.forEach(find)

  flat = flat.flat()
  return flat.filter(
    (page, index) => page.path && page.path !== flat[index + 1]?.path
  )
}

const courseButton = (page) => (
  <ActionButton minWidth={300} margin={4}>
    <a onClick={() => navigate(page.path)}>{page.title}</a>
  </ActionButton>
)

const coursesBadgeList = (courses, header, emptyMsg) => {
  let empty = emptyMsg ? emptyMsg : "Nothing here..."

  return (
    <Well margin={8}>
      <h3>{header}</h3>
      {
        courses.length > 0
        ? courses.map((page) => courseButton(page))
        : empty
      }
    </Well>
  )
}

const bucketedCourses = (unstarted, started, completed) => (
  <Fragment>
    {coursesBadgeList(started, "🚀 Courses In-Progress", "No Courses Started 😢")}

    <Divider margin={4} />

    {coursesBadgeList(unstarted, "📓 New Courses")}
    {coursesBadgeList(completed, "🎉 Completed Courses")}
  </Fragment>
)

const CourseCatalogTemplate = ({ data, location, pageContext }) => {
  const { file, parliamentNavigation, site } = data
  const { contributors, gitRemote, dirname } = pageContext
  const { siteMetadata } = site
  const { sourceFiles } = siteMetadata
  const { absolutePath, childMdx } = file
  const { body, tableOfContents, timeToRead } = childMdx
  const pathToFiles = sourceFiles.endsWith("/")
    ? sourceFiles
    : `${sourceFiles}/`
  const relativePath = absolutePath.replace(pathToFiles, "")

  const allCoursePages = coursePages(parliamentNavigation.pages, dirname)
  let [unstartedCourses, updateUnstartedList] = useState([])
  let [startedCourses, updateStartedList] = useState([])
  let [completedCourses, updateCompletedList] = useState([])
  const [coursesBucketed, setBucketed] = useState(false)
  useEffect(() => {
    if (coursesBucketed) { return }

    allCoursePages.forEach((coursePage) => {
      const dir = courseDir(coursePage)
      let courseProgress = window.localStorage.getItem(dir)

      if (courseProgress) {
        courseProgress = JSON.parse(courseProgress)
        if (courseCompleted(coursePage, courseProgress)) {
          completedCourses.push(coursePage)
          updateCompletedList(completedCourses)
        }
        else {
          startedCourses.push(coursePage)
          updateStartedList(startedCourses)
        }
      }
      else {
        unstartedCourses.push(coursePage)
        updateUnstartedList(unstartedCourses)
      }
    })

    setBucketed(true)
  }, [allCoursePages, unstartedCourses, startedCourses, completedCourses, coursesBucketed])

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

      <br />
      {
        coursesBucketed
        ? bucketedCourses(unstartedCourses, startedCourses, completedCourses)
        : <ProgressCircle aria-label="Loading Courses..." isIndeterminate />
      }

      <Flex
        direction="column"
        justifyContent="space-between"
        gap="size-100"
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

export default CourseCatalogTemplate

export const query = graphql`
  query CourseCatalogTemplateQuery($id: String!) {
    file(id: { eq: $id }) {
      id
      name
      absolutePath
      childMdx {
        body
        tableOfContents(maxDepth: 3)
        timeToRead
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
