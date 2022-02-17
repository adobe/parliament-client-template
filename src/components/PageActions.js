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
import React, { useState, useEffect } from "react"
import { css, jsx } from "@emotion/react"
import { TableOfContents } from "@adobe/parliament-ui-components"

const rewriteToc = (headings) => {
  let items = []

  const formatHeading = (heading) => {
    return {
      url: `#${heading.id}`,
      title: heading.value,
      depth: heading.depth,
    }
  }

  while (headings.length) {
    let current = formatHeading(headings.shift())
    let mainLength = items.length
    if (mainLength) {
      let last = items[mainLength - 1]
      if (current.depth <= last.depth) {
        items.push(current)
      } else {
        let secLength = items[mainLength - 1]?.items?.length
        if (secLength) {
          let last = items[mainLength - 1].items[secLength - 1]
          if (current.depth <= last.depth) {
            items[mainLength - 1].items.push(current)
          } else {
            items[mainLength - 1]?.items[secLength - 1]?.items
              ? items[mainLength - 1].items[secLength - 1].items.push(current)
              : (items[mainLength - 1].items[secLength - 1].items = [current])
          }
        } else {
          items[mainLength - 1].items
            ? items[mainLength - 1].items.push(current)
            : (items[mainLength - 1].items = [current])
        }
      }
    } else {
      items.push(current)
    }
  }
  return { items: items }
}

const PageActions = ({ headings, timeToRead }) => {
  const [tableOfContents, setTableOfContents ] = useState({})

  useEffect(() => {
    setTableOfContents(rewriteToc(headings));
  }, [headings]);
  
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
        <div>
          {tableOfContents &&
          tableOfContents.items &&
          tableOfContents.items.length ? (
            <TableOfContents tableOfContents={tableOfContents} />
          ) : null}
        </div>
        {timeToRead ? (
          <p>
            <span
              css={css`
                display: block;
              `}
            >
              {timeToRead} min read
            </span>
          </p>
        ) : null}
      </div>
    </React.Fragment>
  )
}

export default PageActions
