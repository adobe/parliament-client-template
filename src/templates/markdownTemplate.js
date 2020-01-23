/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { graphql } from "gatsby"
import DocLayout from "../components/doclayout"
import Heading from "@react/react-spectrum/Heading"
import { Grid, GridRow, GridColumn } from "@react/react-spectrum/Grid"
import { Feedback, Footer } from "@parliament/parliament-ui-components"
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
      <Grid>
        <GridRow>
          <GridColumn size={(3, 3, 2, 2, 2)}>
            <SiteNav
              currentPage={props.location.pathname}
              gitRemote={gitRemote}
            />
          </GridColumn>
          <GridColumn size={(9, 9, 10, 10, 10)}>
            <GridRow>
              <GridColumn size={10}>
                <div
                  css={css`
                    padding-top: 30px;
                    padding-left: 16px;
                    padding-right: 16px;
                  `}
                >
                  {renderAst(htmlAst)}
                </div>
              </GridColumn>
              <GridColumn size={2}>
                <div
                  css={css`
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
              </GridColumn>
            </GridRow>
            <GridRow>
              <Footer />
            </GridRow>
          </GridColumn>
        </GridRow>
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
