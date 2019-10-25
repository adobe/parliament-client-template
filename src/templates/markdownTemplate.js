import React from "react"
import { graphql } from "gatsby"
import DocLayout from "../components/doclayout"
import Heading from "@react/react-spectrum/Heading"
import { Feedback } from "@parliament/parliament-ui-components"
import Nav from "../components/Nav"

const MarkdownTemplate = props => {
  const {
    data: {
      allFile: { edges },
    },
  } = props

  const {
    node: {
      childMarkdownRemark: { html, tableOfContents, timeToRead },
      gitRemote: { protocol, resource, full_name, ref },
      modifiedTime,
      relativePath,
    },
  } = edges.find(({ node: { id } }) => id === props.pageContext.id)

  return (
    <DocLayout>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ width: "25%" }}>
          <Nav />
        </div>
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
          <p>
            <Heading variant="subtitle3">On this page</Heading>
            <span
              class="toc"
              dangerouslySetInnerHTML={{ __html: tableOfContents }}
            ></span>
          </p>
          <p>
            <span style={{ display: "block" }}>
              Last update: {modifiedTime}
            </span>
            <span style={{ display: "block" }}>{timeToRead} min read</span>
          </p>
        </div>
      </div>
    </DocLayout>
  )
}

export default MarkdownTemplate

export const query = graphql`
  query MarkdownTemplateQuery {
    allFile {
      edges {
        node {
          id
          modifiedTime(formatString: "YYYY-MM-DD")
          name
          childMarkdownRemark {
            html
            tableOfContents
            timeToRead
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
