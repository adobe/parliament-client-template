/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { graphql } from "gatsby"
import { useMediaQuery } from "react-responsive"
import DocLayout from "../components/doclayout"
import { Footer } from "@parliament/parliament-ui-components"
import PageActions from "../components/PageActions"
import SiteNav from "../components/SiteNav"
import SEO from "../components/seo"
import renderAst from "../utils/AFMRehype"

const MarkdownTemplate = props => {
  const { file } = props.data
  const { modifiedTime, relativePath, childMarkdownRemark } = file
  const { htmlAst, tableOfContents, timeToRead } = childMarkdownRemark

  const gitRemote = props.pageContext.gitRemote

  return (
    <DocLayout>
      <SEO title={props.pageContext.seo} />
      <div
        css={css`
        display: grid;
        grid-template-rows: 1fr 30px
        grid-column-gap: 0px;
        grid-row-gap: 0px;
        @media screen and (min-width: 1201px) {
          grid-template-columns: minmax(280px, 280px) repeat(11, 1fr);
        }
        @media screen and (min-width: 768px) {
          grid-template-columns: minmax(280px, 280px) repeat(9, 1fr);
        }
      `}
      >
        <div
          css={css`
            grid-area: 1 / 1 / 3 / 2;
          `}
          className="spectrum--light"
        >
          <SiteNav
            currentPage={props.location.pathname}
            gitRemote={gitRemote}
          />
        </div>
        <div
          css={css`
            padding-top: 30px;
            padding-left: 16px;
            padding-right: 16px;

            @media screen and (min-width: 1201px) {
              grid-area: 1 / 2 / 2 / 11;
            }
            @media screen and (min-width: 768px) {
              grid-area: 1 / 2 / 2 / 11;
            }
          `}
        >
          <div
            css={css`
              @media screen and (min-width: 1201px) {
                display: none;
              }
              @media screen and (min-width: 768px) {
                float: right;
              }
            `}
          >
            <PageActions
              gitRemote={gitRemote}
              modifiedTime={modifiedTime}
              relativePath={relativePath}
              tableOfContents={tableOfContents}
              timeToRead={timeToRead}
            />
          </div>

          {renderAst(htmlAst)}
        </div>
        <div
          css={css`
            padding-top: 30px;
            padding-left: 16px;
            padding-right: 16px;

            @media screen and (min-width: 1201px) {
              grid-area: 1 / 11 / 2 / 13;
            }
            @media screen and (min-width: 768px) {
              display: none;
            }
          `}
        >
          <PageActions
            gitRemote={gitRemote}
            modifiedTime={modifiedTime}
            relativePath={relativePath}
            tableOfContents={tableOfContents}
            timeToRead={timeToRead}
          />
        </div>
        <div
          css={css`
            @media screen and (min-width: 1201px) {
              grid-area: 2 / 3 / 3 / 13;
            }
            @media screen and (min-width: 768px) {
              grid-area: 2 / 3 / 3 / 11;
            }
          `}
        >
          <Footer />
        </div>
      </div>
    </DocLayout>
  )
}

export default MarkdownTemplate

export const query = graphql`
  query MarkdownTemplateQuery($id: String!) {
    file(id: { eq: $id }) {
      id
      modifiedTime(formatString: "YYYY-MM-DD")
      name
      relativePath
      childMarkdownRemark {
        htmlAst
        tableOfContents
        timeToRead
      }
    }
  }
`
