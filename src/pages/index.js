import React from "react"
import { Link, graphql } from "gatsby"
import Heading from "@react/react-spectrum/Heading"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { stripManifestPath } from "@parliament/parliament-ui-components"

const Item = ({ name, url, children, path }) => {
  const splitPath = stripManifestPath(url, path)
  return (
    <li>
      <Link to={splitPath}>{name}</Link>
      {children}
    </li>
  )
}

const nav = (data, path) => {
  const subnav = pages => {
    if (pages) {
      return <ul>{nav(pages, path)}</ul>
    }
  }

  return data.map((node, index) => {
    return (
      <Item key={index} name={node.title} url={node.path} path={path}>
        {subnav(node.pages, path)}
      </Item>
    )
  })
}

const IndexPage = ({ data }) => {
  const siteInfo = data.allRawGatsbySourceGitJson.edges[0].node
  const pages = siteInfo.pages
  const path = `${data.gitRemote.organization}/${data.gitRemote.name}/${data.gitRemote.ref}`
  return (
    <Layout>
      <SEO title={siteInfo.title} />
      <Heading variant="pageTitle">{siteInfo.title}</Heading>
      <ul>{nav(pages, path)}</ul>
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
    allRawGatsbySourceGitJson(filter: { view_type: { eq: "mdbook" } }) {
      edges {
        node {
          id
          pages
        }
      }
    }
  }
`
