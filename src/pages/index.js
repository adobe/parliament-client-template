import React from "react"
import { Link } from "gatsby"
import Heading from "@react/react-spectrum/Heading"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Heading variant="pageTitle">Adobe Developer Docs</Heading>
    <p>
      docs.adobe.io is the home for Adobe documentation for internal developers.
      <br />
      Check out our quickstarts, tutorials, API reference, and code examples.
    </p>
    <p>Now go build something great.</p>
    <p>
      <Heading variant="subtitle1">Docs Directory</Heading>
    </p>
    <ul>
      <li>
        <Link to="page-2/">React i.e. Gatsby page</Link>
      </li>
      <li>
        <Link to="hockey/">Markdown Page</Link>
      </li>
      <li>
        <Link to="test/">MdX Page</Link>
      </li>
      <li>
        <Link to="openapi/">Open API Remote</Link>
      </li>
      <li>
        <Link to="README.md">Markdown git.corp Remote: adobeio-auth</Link>
      </li>
      <li>
        <Link to="hypermedia/">Hypermedia Example</Link>
      </li>
    </ul>
  </Layout>
)

export default IndexPage
