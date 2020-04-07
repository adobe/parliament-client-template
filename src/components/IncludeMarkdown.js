import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import renderAst from "../utils/AFMRehype"

const IncludeMarkdown = ({ file }) => {
  const { allMarkdownRemark } = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark {
          edges {
            node {
              htmlAst
              fileAbsolutePath
            }
          }
        }
      }
    `
  )

  const markdownRemark = allMarkdownRemark.edges.find(edge =>
    edge.node.fileAbsolutePath.endsWith(file)
  )

  return (
    <React.Fragment>{renderAst(markdownRemark.node.htmlAst)}</React.Fragment>
  )
}

export default IncludeMarkdown
