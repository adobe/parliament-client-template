import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <ul>
      <li>
        <Link to="/page-2/">React i.e. Gatsby page</Link>
      </li>
      <li>
        <Link to="/hockey/">Markdown Page</Link>
      </li>
      <li>
        <Link to="/test/">MdX Page</Link>
      </li>
      <li>
        <Link to="/openapi/">Open API Remote</Link>
      </li>
      <li>
        <Link to="/jwt-auth/README/">Markdown Remote: jwt-auth</Link>
      </li>
      <li>
        <Link to="/adobeio-auth/README/">Markdown Remote: adobeio-auth</Link>
      </li>
    </ul>
  </Layout>
)

export default IndexPage
