import React from "react"
import { Link } from "gatsby"
import { RedocStandalone } from "redoc"

import OpenApiLayout from "../components/openapilayout"
import SEO from "../components/seo"

const Swagger = () => (
  <OpenApiLayout>
    <SEO title="Open API" />
    <RedocStandalone specUrl="https://petstore.swagger.io/v2/swagger.json" />
  </OpenApiLayout>
)

export default Swagger
