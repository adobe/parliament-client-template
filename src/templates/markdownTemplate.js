/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { graphql } from "gatsby"
import DocLayout from "../components/doclayout"
import Heading from "@react/react-spectrum/Heading"
import { Feedback } from "@parliament/parliament-ui-components"
import SiteNav from "../components/SiteNav"
import SEO from "../components/seo"

const MarkdownTemplate = props => {
  const { file } = props.data
  const { modifiedTime, relativePath, childMarkdownRemark } = file
  const { html, tableOfContents, timeToRead } = childMarkdownRemark

  const gitRemote = props.data.gitRemote

  return (
    <DocLayout>
      <SEO title={props.pageContext.seo} />
      <div
        css={css`
          display: flex;
          flex-direction: row;
        `}
      >
        <SiteNav currentPage={props.location.pathname} />
        <div
          css={css`
            width: 50%;
            padding-top: 30px;
            padding-left: 16px;
            padding-right: 16px;
          `}
          dangerouslySetInnerHTML={{ __html: html }}
        ></div>
        <div
          css={css`
            width: 25%;
            padding-top: 30px;
            padding-left: 16px;
            padding-right: 16px;
          `}
        >
          <div
            css={css`
              padding-bottom: 20px;
            `}
          >
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
            <span
              css={css`
                display: block;
              `}
            >
              Last update: {modifiedTime}
            </span>
            <span
              css={css`
                display: block;
              `}
            >
              {timeToRead} min read
            </span>
          </p>
        </div>
      </div>
    </DocLayout>
  )
}

export default MarkdownTemplate

export const query = graphql`
  query MarkdownTemplateQuery($id: String!) {
    gitRemote {
      protocol
      resource
      full_name
      organization
      name
      ref
    }
    file(id: { eq: $id }) {
      id
      modifiedTime(formatString: "YYYY-MM-DD")
      name
      relativePath
      childMarkdownRemark {
        html
        tableOfContents
        timeToRead
      }
    }
  }
`
