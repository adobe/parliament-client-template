import React from "react"
import { Link, graphql } from "gatsby"
import Heading from "@react/react-spectrum/Heading"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { stripManifestPath } from "@parliament/parliament-ui-components"

const Item = ({ name, url, children, gitInfo }) => {
  const splitPath = stripManifestPath(url, gitInfo)
  return (
    <li>
      <Link to={splitPath}>{name}</Link>
      {children}
    </li>
  )
}

const nav = (data, gitInfo) => {
  const subnav = pages => {
    if (pages) {
      return <ul>{nav(pages, gitInfo)}</ul>
    }
  }

  return data.map((node, index) => {
    return (
      <Item key={index} name={node.title} url={node.path} gitInfo={gitInfo}>
        {subnav(node.pages, gitInfo)}
      </Item>
    )
  })
}

const IndexPage = ({ data }) => {
  const siteInfo = data.allRawJsonFile.edges[0].node
  const pages = siteInfo.pages
  const gitInfo = {
    org: data.gitRemote.organization,
    name: data.gitRemote.name,
    branch: data.gitRemote.ref,
  }
  console.log(gitInfo)
  return (
    <Layout>
      <SEO title={siteInfo.title} />
      <Heading variant="pageTitle">{siteInfo.title}</Heading>
      <ul>{nav(pages, gitInfo)}</ul>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  {
    gitRemote {
      organization
      name
      ref
    }
    allRawJsonFile(filter: { view_type: { eq: "mdbook" } }) {
      edges {
        node {
          id
          pages
        }
      }
    }
  }
`
