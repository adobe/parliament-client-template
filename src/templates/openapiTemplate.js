/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { RedocStandalone } from "redoc"

import SiteNav from "../components/SiteNav"
import OpenApiLayout from "../components/openapilayout"
import SEO from "../components/seo"

import Grid from "../components/grid/Grid"
import GridContent from "../components/grid/GridContent"
import GridNav from "../components/grid/GridNav"
import GridFooter from "../components/grid/GridFooter"

const OpenApiTemplate = props => {
  return (
    <OpenApiLayout>
      <SEO title={props.pageContext.seo} />
      <Grid>
        <GridNav className="spectrum--light">
          <SiteNav
            currentPage={props.location.pathname}
            gitRemote={gitRemote}
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
