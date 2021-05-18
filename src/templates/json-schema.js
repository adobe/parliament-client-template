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
import SiteMenu from "../components/SiteMenu"

import { JsonSchema } from "@adobe/parliament-ui-components"
import SiteActionButtons from "../components/SiteActionButtons"

const JsonSchemaTemplate = ({ data, location, pageContext }) => {
  const { parliamentNavigation } = data
  const { gitRemote, schema } = pageContext
  return (
    <DocLayout
      title="JSON Schema"
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
    >
      <div
        css={css`
          float: right;
          z-index: 100;
        `}
      >
        <SiteActionButtons
          gitRemote={gitRemote}
          relativePath={schema.slug}
          issues={parliamentNavigation.issues}
        />
      </div>

      <JsonSchema schema={schema} />
    </DocLayout>
  )
}

export default JsonSchemaTemplate

export const query = graphql`
  query JSONSchemaTemplateQuery {
    parliamentNavigation {
      pages
      homePage
      issues
    }
  }
`
