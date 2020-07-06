/** @jsx jsx */
import { jsx } from "@emotion/core"
import { RedocStandalone } from "redoc"

import SiteNav from "../components/SiteNav"
import DocLayout from "../components/doclayout"
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
    <DocLayout>
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
    </DocLayout>
  )
}

export default OpenApiTemplate
