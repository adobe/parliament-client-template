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
import React from "react"
import { css, jsx } from "@emotion/core"
import TableOfContents from "./TableOfContents"

const PageActions = ({ tableOfContents, modifiedTime, timeToRead }) => {
  return (
    <React.Fragment>
      <div
        css={css`
          @media screen and (min-width: 1201px) {
            display: block;
          }
          @media screen and (max-width: 1200px) {
            display: none;
          }
        `}
      >
        {tableOfContents ? (
          // JSON.stringify(tableOfContents)
          <TableOfContents tableOfContents={tableOfContents} />
        ) : (
          null
        )}
        {modifiedTime && timeToRead ? (
          <p>
            <span
              css={css`
                display: block;
              `}
            >
              Last update: {modifiedTime}
            </span>
            <span
              css={css`
                display: block;
              `}
            >
              {timeToRead} min read
            </span>
          </p>
        ) : (
          ""
        )}
      </div>
    </React.Fragment>
  )
}

export default PageActions
