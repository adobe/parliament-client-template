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
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { Nav } from "@parliament/parliament-ui-components"

import Title from "./Title"
import SearchBar from "./SearchBar"

import "./sitenav.css"

const SiteMenu = ({ gitRemote, forceMobile, currentPage, pages, isMobile }) => {
  const gitInfo = {
    org: gitRemote.organization,
    name: gitRemote.name,
    branch: gitRemote.ref,
  }

  return (
    <div
      css={css`
        width: 256px;
        margin: 0;
      `}
    >
      <div
        css={css`
          padding: 30px 24px 24px 24px;
        `}
      >
        <Link
          css={css`
            text-decoration-line: none;
          `}
          to="/"
        >
          <Title isMobile={isMobile} forceMobile={forceMobile} />
        </Link>
        <div
          css={css`
            margin-top: 24px;
          `}
        >
          <SearchBar gitRemote={gitRemote} />
        </div>
      </div>
      <div
        css={css`
          padding: 0px 24px 24px 24px;
          height: 80vh;
          overflow-y: auto;
          overflow-x: hidden;
        `}
      >
        <Nav data={pages} selected={currentPage} gitInfo={gitInfo} />
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
