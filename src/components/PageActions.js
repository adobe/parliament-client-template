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
import { css, jsx } from "@emotion/react"
import { View } from "@adobe/react-spectrum"

const rewriteToc = (tableOfContents) => {
  console.log("ToC", tableOfContents)
  return tableOfContents
    .replaceAll(
      "<ul",
      `<ul class='spectrum-Body--sizeM' style="list-style: none; padding-left: var(--spectrum-global-dimension-static-size-200); margin-left: 0; margin-bottom: 0; margin-top: 0;"`
    )
    .replaceAll("<li", '<li style="margin-bottom: 0"')
    .replaceAll("<a", `<a class="spectrum-Link spectrum-Link--quiet"`)
    .replaceAll("<p", '<p style="margin-bottom: 0"')
}

const PageActions = ({ tableOfContents, timeToRead }) => {
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
          <View
            elementType="nav"
            role="navigation"
            aria-label="Article Outline"
            marginY="size-400"
          >
            <h4
              className="spectrum-Detail--sizeL"
              css={css`
                color: var(--spectrum-global-color-gray-600);
                margin-bottom: var(--spectrum-global-dimension-static-size-250);
              `}
            >
              On this page
            </h4>
            <div
              dangerouslySetInnerHTML={{ __html: rewriteToc(tableOfContents) }}
            />
          </View>
        ) : null}
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
