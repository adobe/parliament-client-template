import React from "react"
import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"

import OpenApiLayout from "../components/openapilayout"
import SEO from "../components/seo"

const OpenApiTemplate = props => {
  console.log(props)
  return (
    <OpenApiLayout>
      <SEO title="Open API" />
      <SwaggerUI spec={props.pageContext.spec} />
    </OpenApiLayout>
  )
}

export default OpenApiTemplate
