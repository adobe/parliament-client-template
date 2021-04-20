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
import { useState } from "react"
import { Index } from "elasticlunr"
import PropTypes from "prop-types"
import { graphql, useStaticQuery } from "gatsby"
import { Nav, Search } from "@adobe/parliament-ui-components"

import "./sitenav.css"

const SiteMenu = ({ gitRemote, currentPage, pages, CustomNavComponent }) => {
  const { ParliamentSearchIndex } = useStaticQuery(
    graphql`
      query {
        ParliamentSearchIndex
      }
    `
  )
  const [index] = useState(Index.load(ParliamentSearchIndex))

  const gitInfo = {
    org: gitRemote.organization,
    name: gitRemote.name,
    branch: gitRemote.ref,
  }

  const LeftNavComponent = CustomNavComponent ? CustomNavComponent : Nav

  return (
    <div
      css={css`
        width: 256px;
        margin: var(--spectrum-global-dimension-size-0);
      `}
    >
      <div
        css={css`
          padding: var(--spectrum-global-dimension-size-300)
            var(--spectrum-global-dimension-size-300)
            var(--spectrum-global-dimension-size-200)
            var(--spectrum-global-dimension-size-300);
        `}
      >
        <Search
          width="size-2400"
          sections={[
            { key: "docs", name: "Docs" },
            { key: "apis", name: "API References" },
            { key: "blog", name: "Blog Posts" },
          ]}
          searchCallback={searchTerm => {
            const searchResults = index
              .search(searchTerm, { expand: true })
              .map(({ ref }) => {
                return index.documentStore.getDoc(ref)
              })
            return searchResults
          }}
        />
      </div>
      <div
        css={css`
          padding: var(--spectrum-global-dimension-size-0)
            var(--spectrum-global-dimension-size-300);
          height: 80vh;
          overflow-y: auto;
          overflow-x: hidden;
        `}
      >
      <LeftNavComponent data={pages} selected={currentPage} gitInfo={gitInfo} />
      </div>
    </div>
  )
}

SiteMenu.propTypes = {
  currentPage: PropTypes.string,
  forceMobile: PropTypes.bool,
}

SiteMenu.defaultProps = {
  currentPage: "",
  forceMobile: false,
}

export default SiteMenu
