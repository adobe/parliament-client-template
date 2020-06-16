/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { graphql } from "gatsby"
import DocLayout from "../components/doclayout"
import { Footer } from "@parliament/parliament-ui-components"
import PageActions from "../components/PageActions"
import SiteNav from "../components/SiteNav"
import SEO from "../components/seo"
import renderAst from "../utils/AFMRehype"

import {
  Grid,
  GridNav,
  GridContent,
  GridFooter,
  ActionButtons,
} from "@parliament/parliament-ui-components"

const MarkdownTemplate = props => {
  const { file } = props.data
  const { modifiedTime, relativePath, childMarkdownRemark } = file
  const { htmlAst, tableOfContents, timeToRead } = childMarkdownRemark

  const { gitRemote, pages } = props.pageContext

  return (
    <DocLayout>
      <SEO title={props.pageContext.seo} />
      <Grid>
        <GridNav className="spectrum--light">
          <SiteNav
            currentPage={props.location.pathname}
            gitRemote={gitRemote}
            pages={pages}
          />
        </GridNav>
        <GridContent id="contentMain">
          <div
            css={css`
              float: right;
              z-index: 100;
            `}
          >
            <div
              css={css`
                padding-bottom: 20px;
              `}
            >
              {gitRemote !== null ? (
                <ActionButtons
                  gitUrl={`${gitRemote.protocol}://${gitRemote.resource}/${gitRemote.full_name}`}
                  filePath={relativePath}
                  branch={gitRemote.ref}
                />
              ) : (
                ""
              )}
            </div>
          </div>
          {renderAst(htmlAst)}
        </GridContent>
        <div
          id="rightRail"
          css={css`
            padding-top: 30px;
            padding-left: 16px;
            padding-right: 16px;

            @media screen and (min-width: 1201px) {
              grid-area: 1 / 11 / 2 / 13;
            }
            @media screen and (max-width: 1200px) {
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
          Powered by{" "}
          <a href="https://docs.corp.adobe.com/parliament-docs/README.md">
            Parliament
          </a>
        </div>
        <GridFooter>
          <Footer />
        </GridFooter>
      </Grid>
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
