/** @jsx jsx */
import { jsx } from "@emotion/core"
import { RedocStandalone } from "redoc"

import SiteNav from "../components/SiteNav"
import OpenApiLayout from "../components/openapilayout"
import SEO from "../components/seo"
import { Footer } from "@parliament/parliament-ui-components"

import { Grid, GridContent, GridNav, GridFooter } from "../components/grid/Grid"

const OpenApiTemplate = props => {
  return (
    <OpenApiLayout>
      <SEO title={props.pageContext.seo} />
      <Grid>
        <GridNav className="spectrum--light">
          <SiteNav
            currentPage={props.location.pathname}
            gitRemote={props.pageContext.gitRemote}
          />
        </GridNav>
        <GridContent>
          <RedocStandalone
            spec={props.pageContext.spec}
            options={{
              hideLoading: true,
              menuToggle: true,
            }}
          />
        </GridContent>
        <GridFooter>
          <Footer />
        </GridFooter>
      </Grid>
    </OpenApiLayout>
  )
}

export default OpenApiTemplate
