import React from "react"
import { graphql } from "gatsby"
import DocLayout from "../components/doclayout"
import Heading from "@react/react-spectrum/Heading"
import { Feedback, Nav } from "@parliament/parliament-ui-components"
import SEO from "../components/seo"

const MarkdownTemplate = props => {
  const {
    data: {
      allFile: { edges },
    },
  } = props

  const { node } = edges.find(({ node: { id } }) => id === props.pageContext.id)
  let {
    childMarkdownRemark: { html, tableOfContents, timeToRead },
    modifiedTime,
    relativePath,
    gitRemote,
  } = node

  let urlPrefix = ""
  if (gitRemote) {
    urlPrefix = `${gitRemote.organization}/${gitRemote.name}/${gitRemote.ref}`
  }

  return (
    <DocLayout>
      <SEO title="Test" />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ width: "25%" }}>
          <Nav
            data={props.data.allRawJsonFile.edges[0].node.pages}
            path={props.location.pathname}
            urlPrefix={urlPrefix}
          />
        </div>
        <div
          style={{ width: "50%" }}
          dangerouslySetInnerHTML={{ __html: html }}
        ></div>
        <div style={{ width: "25%" }}>
          <div style={{ paddingBottom: "20px" }}>
            {gitRemote !== null ? (
              <Feedback
                gitUrl={`${gitRemote.protocol}://${gitRemote.resource}/${gitRemote.full_name}`}
                filePath={relativePath}
                branch={gitRemote.ref}
              />
            ) : (
              ""
            )}
          </div>
          <div>
            <Heading variant="subtitle3">On this page</Heading>
            <span
              className="toc"
              dangerouslySetInnerHTML={{ __html: tableOfContents }}
            ></span>
          </div>
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
    allRawJsonFile(filter: { view_type: { eq: "mdbook" } }) {
      edges {
        node {
          id
          pages
        }
      }
    }
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
            organization
            name
            ref
          }
          relativePath
        }
      }
    }
  }
`
