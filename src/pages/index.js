import React from "react"
// import { Link } from "gatsby"
import Link from "@react/react-spectrum/Link"

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
        <Link href="/page-2/">React i.e. Gatsby page</Link>
      </li>
      <li>
        <Link href="/hockey/">Markdown Page</Link>
      </li>
      <li>
        <Link href="/test/">MdX Page</Link>
      </li>
      <li>
        <Link href="/openapi/">Open API Remote</Link>
      </li>
      <li>
        <Link href="/jwt-auth/README.md">Markdown Remote: jwt-auth</Link>
      </li>
      <li>
        <Link href="/adobeio-auth/README.md">
          Markdown Remote: adobeio-auth
        </Link>
      </li>
    </ul>
  </Layout>
)

export default IndexPage
