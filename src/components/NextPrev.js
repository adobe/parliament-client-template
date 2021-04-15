/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

/** @jsx jsx */
import { css, jsx } from "@emotion/react"
import { Link as GatsbyLink } from "gatsby"
import "@spectrum-css/typography"
import { Link } from "@adobe/parliament-ui-components"
import ChevronLeft from "@spectrum-icons/workflow/ChevronLeft"
import ChevronRight from "@spectrum-icons/workflow/ChevronRight"

const NextPrev = ({ nextPage, previousPage }) =>
  nextPage || previousPage ? (
    <div className="spectrum-Body spectrum-Body--sizeM">
      <div
        css={css`
          display: flex;
          margin-bottom: var(--spectrum-global-dimension-size-800);
          margin-top: var(--spectrum-global-dimension-size-800);
        `}
      >
        <div>
          {previousPage && (
            <Link isQuiet={true}>
              <GatsbyLink to={previousPage.path} rel="prev">
                <div
                  css={css`
                    display: flex;
                    align-items: center;
                  `}
                >
                  <ChevronLeft />
                  <div
                    css={css`
                      margin-left: var(--spectrum-global-dimension-size-50);
                    `}
                  >
                    {previousPage.title}
                  </div>
                </div>
              </GatsbyLink>
            </Link>
          )}
        </div>
        <div
          css={css`
            margin-left: auto;
            padding-left: var(--spectrum-global-dimension-size-200);
          `}
        >
          {nextPage && (
            <Link isQuiet={true}>
              <GatsbyLink to={nextPage.path} rel="next">
                <div
                  css={css`
                    display: flex;
                    align-items: center;
                  `}
                >
                  <div
                    css={css`
                      margin-right: var(--spectrum-global-dimension-size-50);
                    `}
                  >
                    {nextPage.title}
                  </div>
                  <ChevronRight />
                </div>
              </GatsbyLink>
            </Link>
          )}
        </div>
      </div>
    </div>
  ) : null

export default NextPrev
