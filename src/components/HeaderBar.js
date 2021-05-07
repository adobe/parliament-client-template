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
import { jsx } from "@emotion/react"
import { Header } from "@adobe/parliament-ui-components"
import SiteMenu from "./SiteMenu"

import { useMediaQuery } from "react-responsive"

const HeaderBar = ({ siteTitle, forceMobile, gitRemote, ...props }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 })

  return (
    <Header
      title="Developer"
      titleUrl="https://developers.corp.adobe.com"
      siteTitle={siteTitle}
      forceMobile={forceMobile}
      menu={<SiteMenu isMobile={isMobile} gitRemote={gitRemote} {...props} />}
      {...props}
    />
  )
}

HeaderBar.defaultProps = {
  /* eslint-disable */
  siteTitle: process.env.GATSBY_SOURCE_TITLE,
  /* eslint-enable*/
}

export default HeaderBar
