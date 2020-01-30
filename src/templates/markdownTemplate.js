/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { graphql } from "gatsby"
import { useMediaQuery } from "react-responsive"
import DocLayout from "../components/doclayout"
import PageActions from "../components/PageActions"
import { Footer } from "@parliament/parliament-ui-components"
import SiteNav from "../components/SiteNav"
import SEO from "../components/seo"
import renderAst from "../utils/AFMRehype"

const MarkdownTemplate = props => {
  const { file } = props.data
  const { modifiedTime, relativePath, childMarkdownRemark } = file
  const { htmlAst, tableOfContents, timeToRead } = childMarkdownRemark

  const gitRemote = props.pageContext.gitRemote

  const isDesktop = useMediaQuery({ minWidth: 1201 })
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1200 })
  const isMobile = useMediaQuery({ maxWidth: 767 })

  if (isDesktop) {
    return (
      <DocLayout>
        <SEO title={props.pageContext.seo} />
        <div
          css={css`
          display: grid;
          grid-template-columns: minmax(280px, 280px) repeat(11, 1fr);
          grid-template-rows: 1fr 30px
          grid-column-gap: 0px;
          grid-row-gap: 0px;
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
              grid-area: 1 / 2 / 2 / 11;
              padding-top: 30px;
              padding-left: 16px;
              padding-right: 16px;
            `}
          >
            {renderAst(htmlAst)}
          </div>
          <div
            css={css`
              grid-area: 1 / 11 / 2 / 13;
              padding-top: 30px;
              padding-left: 16px;
              padding-right: 16px;
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
              grid-area: 2 / 3 / 3 / 13;
            `}
          >
            <Footer />
          </div>
        </div>
      </DocLayout>
    )
  } else {
    return (
      <DocLayout>
        <SEO title={props.pageContext.seo} />
        <div
          css={css`
          display: grid;
          grid-template-columns: minmax(280px, 280px) repeat(9, 1fr);
          grid-template-rows: 1fr 30px
          grid-column-gap: 0px;
          grid-row-gap: 0px;
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
              grid-area: 1 / 2 / 2 / 11;
              padding-top: 30px;
              padding-left: 16px;
              padding-right: 16px;
            `}
          >
            <div
              css={css`
                float: right;
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
              grid-area: 2 / 3 / 3 / 11;
            `}
          >
            <Footer />
          </div>
        </div>
      </DocLayout>
    )
  }
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
