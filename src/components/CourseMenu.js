
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
import PropTypes from "prop-types"

import { CourseNav } from "../components/CourseNav"
import "./sitenav.css"

// NOTE: spectrum _visually_ renders everything past 2 levels the same
// i.e.: it seemingly flattens all of the pages. Consequently, depth only
// controls the _number_ of pages rendered, allowing templates to logically
// organize/group their pages. It does not visually change anything.
const CourseMenu = ({ currentPageFullPath, pages, seenPaths }) => {
  return (
    <div
      css={css`
        width: 256px;
        margin: var(--spectrum-global-dimension-size-0);
      `}
    >
      <div
        css={css`
          padding: var(--spectrum-global-dimension-size-0)
            var(--spectrum-global-dimension-size-300);
          height: 80vh;
          overflow-y: auto;
          overflow-x: hidden;
        `}
      >
        <CourseNav
          data={pages}
          selected={currentPageFullPath}
          seenPaths={seenPaths}
        />
      </div>
    </div>
  )
}

CourseMenu.propTypes = {
  currentPageFullPath: PropTypes.string,
  seenPaths: PropTypes.array,
  pages: PropTypes.array,
}

CourseMenu.defaultProps = {
  currentPageFullPath: "/",
  seenPaths: [],
  pages: PropTypes.array,
  forceMobile: false,
}

export default CourseMenu
