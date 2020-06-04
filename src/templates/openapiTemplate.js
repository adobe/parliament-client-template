/** @jsx jsx */
import { jsx } from "@emotion/core"
import { RedocStandalone } from "redoc"

import SiteNav from "../components/SiteNav"
import OpenApiLayout from "../components/openapilayout"
import SEO from "../components/seo"
import { Footer } from "@parliament/parliament-ui-components"

import {
  OpenApiGrid,
  OpenApiGridContent,
  OpenApiGridNav,
  OpenApiGridFooter,
} from "@parliament/parliament-ui-components"

const OpenApiTemplate = ({ pageContext, location }) => {
  return (
    <OpenApiLayout>
      <SEO title={pageContext.seo} />
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
    </OpenApiLayout>
  )
}

export default OpenApiTemplate
