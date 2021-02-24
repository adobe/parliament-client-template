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
import DocLayout from "../components/doclayout"
import PageActions from "../components/PageActions"
import SiteMenu from "../components/SiteMenu"
import RenderMdx from "../components/RenderMdx"

import { Flex, View } from "@adobe/react-spectrum"
import {
  ActionButtons,
  Contributors,
  Link,
} from "@adobe/parliament-ui-components"

const MarkdownTemplate = ({ data, location, pageContext }) => {
  const { file, parliamentNavigation } = data
  const { relativePath, childMdx } = file
  const { body, tableOfContents, timeToRead } = childMdx
  const { contributors, gitRemote } = pageContext

  return (
    <DocLayout
      title={pageContext.seo}
      location={location}
      gitRemote={gitRemote}
      sideNav={
        <SiteMenu
          currentPage={location.pathname}
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
      <RenderMdx>{body}</RenderMdx>

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
