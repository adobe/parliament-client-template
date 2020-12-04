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
import { useStaticQuery } from "gatsby"
import Play from "@spectrum-icons/workflow/Play"
import "./NewtonButton.css"

const NewtonButton = ({ recipe }) => {
  const data = useStaticQuery(graphql`
    query NewtonQuery {
      site {
        siteMetadata {
          newton
        }
      }
    }
  `)
  const newtonUrl =
    data.site.siteMetadata.newton !== "undefined"
      ? data.site.siteMetadata.newton
      : null
  return recipe && newtonUrl ? (
    <a
      href={`${newtonUrl}&recipe=${recipe}`}
      css={css`
        text-decoration: none;
      `}
      target="_blank"
      rel="noopener noreferrer nofollow"
    >
      <button
        className="spectrum-ActionButton spectrum-ActionButton--emphasized is-selected"
        css={css`
          margin-bottom: var(--spectrum-global-dimension-size-150);
        `}
      >
        <Play size="S" />
        <span
          css={css`
            padding-left: var(--spectrum-global-dimension-size-85);
            padding-right: var(--spectrum-global-dimension-size-150);
          `}
          className="spectrum-ActionButton-label"
        >
          Run in Newton
        </span>
      </button>
    </a>
  ) : (
    ""
  )
}

export default NewtonButton
