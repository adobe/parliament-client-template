import React from "react"
import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"

import SiteNav from "../components/SiteNav"
import DocLayout from "../components/doclayout"
import SEO from "../components/seo"

const OpenApiTemplate = props => {
  return (
    <DocLayout>
      <SEO title="Open API" />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ width: "25%" }}>
          <SiteNav currentPage={props.location.pathname} />
        </div>
        <div style={{ width: "75%" }}>
          <SwaggerUI spec={props.pageContext.spec} />
        </div>
      </div>
    </DocLayout>
  )
}

export default OpenApiTemplate
