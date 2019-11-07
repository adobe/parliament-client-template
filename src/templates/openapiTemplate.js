import React from "react"
import { RedocStandalone } from "redoc"

import SiteNav from "../components/SiteNav"
import OpenApiLayout from "../components/openapilayout"
import SEO from "../components/seo"

const OpenApiTemplate = props => {
  return (
    <OpenApiLayout>
      <SEO title="Open API" />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <SiteNav currentPage={props.location.pathname} />
        <div
          style={{
            width: "75%",
          }}
        >
          <RedocStandalone spec={props.pageContext.spec} />
        </div>
      </div>
    </OpenApiLayout>
  )
}

export default OpenApiTemplate
