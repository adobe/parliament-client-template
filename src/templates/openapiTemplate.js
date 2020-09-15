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
import { jsx } from "@emotion/core"
import { RedocStandalone } from "redoc"

import SiteNav from "../components/SiteNav"
import DocLayout from "../components/doclayout"
import SEO from "../components/seo"
import { Footer } from "@adobe/parliament-ui-components"

import {
  OpenApiGrid,
  OpenApiGridContent,
  OpenApiGridNav,
  OpenApiGridFooter,
} from "@adobe/parliament-ui-components"

const OpenApiTemplate = ({ pageContext, location }) => {
  return (
    <DocLayout>
      <SEO title={pageContext.seo} description={pageContext.description} />
      <OpenApiGrid>
        <OpenApiGridNav>
          <SiteNav
            currentPage={location.pathname}
            gitRemote={pageContext.gitRemote}
            forceMobile={true}
            pages={pageContext.pages}
          />
        </OpenApiGridNav>
        <OpenApiGridContent>
          <RedocStandalone
            spec={pageContext.spec}
            options={{
              hideLoading: true,
              menuToggle: true,
            }}
          />
        </OpenApiGridContent>
        <OpenApiGridFooter>
          <Footer />
        </OpenApiGridFooter>
      </OpenApiGrid>
    </DocLayout>
  )
}

export default OpenApiTemplate
