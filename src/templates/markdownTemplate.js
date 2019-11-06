import React from "react"
import { graphql } from "gatsby"
import DocLayout from "../components/doclayout"
import Heading from "@react/react-spectrum/Heading"
import { Feedback } from "@parliament/parliament-ui-components"
import SiteNav from "../components/SiteNav"
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
  } = node

  const gitRemote = props.data.gitRemote

  return (
    <DocLayout>
      <SEO title="Test" />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <SiteNav currentPage={props.location.pathname} />
        <div
          style={{
            width: "50%",
            paddingTop: "30px",
            paddingLeft: "16px",
            paddingRight: "16px",
          }}
          dangerouslySetInnerHTML={{ __html: html }}
        ></div>
        <div
          style={{
            width: "25%",
            paddingTop: "30px",
            paddingLeft: "16px",
            paddingRight: "16px",
          }}
        >
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
    gitRemote {
      protocol
      resource
      full_name
      organization
      name
      ref
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
          relativePath
        }
      }
    }
  }
`
