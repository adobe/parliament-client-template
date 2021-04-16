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
import { useState } from "react"
import { css, jsx } from "@emotion/react"
import { graphql, withPrefix } from "gatsby"
import DocLayout from "../components/doclayout"
import PageActions from "../components/PageActions"
import SiteMenu from "../components/SiteMenu"
import RenderMdx from "../components/RenderMdx"
import NextPrev from "../components/NextPrev"
import Checkmark from "@spectrum-icons/workflow/Checkmark"

import { Flex, View } from "@adobe/react-spectrum"
import {
  ActionButtons,
  Contributors,
  Link,
} from "@adobe/parliament-ui-components"

const findSelectedPageNextPrev = (pathname, pages) => {
  const flat = flattenPages(pages)
  const selectedPage = flat.find((page) => {
    return withPrefix(page.path) === pathname
  })

  return {
    nextPage: flat[flat.indexOf(selectedPage) + 1],
    previousPage: flat[flat.indexOf(selectedPage) - 1],
  }
}

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

const useLocalStorage = (key, initialValue) => {
  const [visited, flipVisited] = useState(() => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  const markVisited = () => {
    flipVisited(true);
    // TODO: persist somewhere other than localstore
    window.localStorage.setItem(key, true);
  };
  return [visited, markVisited];
}

const CoursesTemplate = ({ data, location, pageContext }) => {
  const { file, parliamentNavigation, site } = data
  const { siteMetadata } = site
  const { sourceFiles } = siteMetadata
  const { absolutePath, childMdx } = file
  const { body, tableOfContents, timeToRead } = childMdx
  const { contributors, gitRemote } = pageContext
  const pathToFiles = sourceFiles.endsWith("/")
    ? sourceFiles
    : `${sourceFiles}/`
  const relativePath = absolutePath.replace(pathToFiles, "")

  const { nextPage, previousPage } = findSelectedPageNextPrev(
    location.pathname,
    parliamentNavigation.pages
  )

  console.log("currentPage ", location.pathname)
  const [visited, markVisited] = useLocalStorage(location.pathname, false)

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
      { visited && <Checkmark /> }
      <RenderMdx>{body}</RenderMdx>

      <Flex
        direction="column"
        justifyContent="space-between"
        gap="size-100"
        marginTop="size-800"
        marginBottom="size-400"
      >
        <View>
          <NextPrev markProgression={markVisited} nextPage={nextPage} previousPage={previousPage} />
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
