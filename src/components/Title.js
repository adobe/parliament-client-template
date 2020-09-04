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
import { Heading } from "@adobe/react-spectrum"
import Logo from "../images/adobe_logo-2.svg"

const Title = ({ siteTitle, isMobile, forceMobile }) => {
  return !isMobile && !forceMobile ? (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        align-items: center;
      `}
    >
      <Logo
        css={css`
          width: 45px;
          height: 40px;
          margin-right: 16px;
          padding-top: 1px;
        `}
      />
      <Heading level={3}>{siteTitle}</Heading>
    </div>
  ) : (
    <div
      css={css`
        display: flex;
        flex-direction: row;
      `}
    >
      <Logo
        css={css`
          width: 40px;
          height: 40px;
          margin-right: 16px;
          padding-top: 1px;
        `}
      />
      <Heading level={3}>{siteTitle}</Heading>
    </div>
  )
}

Title.defaultProps = {
  siteTitle: process.env.GATSBY_SOURCE_TITLE,
}

export default Title
