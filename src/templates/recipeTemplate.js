/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { graphql } from "gatsby"
import DocLayout from "../components/doclayout"
import { Footer } from "@parliament/parliament-ui-components"
import PageActions from "../components/PageActions"
import SiteNav from "../components/SiteNav"
import SEO from "../components/seo"
import renderAst from "../utils/AFMRehype"

import { Grid, GridContent, GridNav, GridFooter } from "../components/grid/Grid"

const MarkdownTemplate = props => {
  const { file } = props.data
  const { modifiedTime, relativePath, childMarkdownRemark } = file
  const { htmlAst, tableOfContents, timeToRead } = childMarkdownRemark

  const gitRemote = props.pageContext.gitRemote

  return (
    <DocLayout>
      <SEO title={props.pageContext.seo} />
      <Grid>
        <GridNav className="spectrum--light">
          <SiteNav
            currentPage={props.location.pathname}
            gitRemote={gitRemote}
          />
        </GridNav>
        <GridContent>
          <div
            css={css`
              @media screen and (min-width: 1201px) {
                display: none;
              }
              @media screen and (max-width: 1200px) {
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
          This is the recipe template
          {renderAst(htmlAst)}
        </GridContent>
        <div
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
  query MarkdownTemplateQuery2($id: String!) {
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
