import React from "react"
import { graphql } from "gatsby"
import DocLayout from "../components/doclayout"

const BlogPosts = props => {
  const {
    data: {
      allFile: { edges },
    },
  } = props

  const {
    node: {
      childMarkdownRemark: { html, tableOfContents },
    },
  } = edges.find(({ node: { id } }) => id === props.pageContext.id)

  return (
    <DocLayout>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ width: "25%" }}>&nbsp;</div>
        <div
          style={{ width: "50%" }}
          dangerouslySetInnerHTML={{ __html: html }}
        ></div>
        <div
          style={{ width: "25%" }}
          dangerouslySetInnerHTML={{ __html: tableOfContents }}
        ></div>
      </div>
    </DocLayout>
  )
}

export default BlogPosts

export const query = graphql`
  query BlogPostsQuery {
    allFile {
      edges {
        node {
          id
          extension
          dir
          modifiedTime
          name
          childMarkdownRemark {
            html
            tableOfContents
          }
        }
      }
    }
  }
`
