import React from "react"
import { graphql } from "gatsby"
import DocLayout from "../components/doclayout"
import Heading from "@react/react-spectrum/Heading"
import { Feedback } from "@parliament/parliament-ui-components"

const BlogPosts = props => {
  console.log(props)

  const {
    data: {
      allFile: { edges },
    },
  } = props

  const {
    node: {
      childMarkdownRemark: { html, tableOfContents },
      gitRemote: { protocol, resource, full_name, ref },
      relativePath,
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
        <div style={{ width: "25%" }}>
          <p>
            <Feedback
              gitUrl={`${protocol}://${resource}/${full_name}`}
              filePath={relativePath}
              branch={ref}
            />
          </p>
          <Heading variant="subtitle3">On this page</Heading>
          <span
            class="toc"
            dangerouslySetInnerHTML={{ __html: tableOfContents }}
          ></span>
        </div>
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
          gitRemote {
            protocol
            resource
            full_name
            ref
          }
          relativePath
        }
      }
    }
  }
`
