/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { graphql } from "gatsby"
import { useMediaQuery } from "react-responsive"
import DocLayout from "../components/doclayout"
import MarkdownDesktop from "../components/MarkdownDesktop"
import MarkdownTablet from "../components/MarkdownTablet"
import PageActions from "../components/PageActions"
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

  const siteNav = (
    <SiteNav currentPage={props.location.pathname} gitRemote={gitRemote} />
  )
  const content = renderAst(htmlAst)
  const pageActions = (
    <PageActions
      gitRemote={gitRemote}
      modifiedTime={modifiedTime}
      relativePath={relativePath}
      tableOfContents={tableOfContents}
      timeToRead={timeToRead}
    />
  )

  if (isDesktop) {
    return (
      <DocLayout>
        <SEO title={props.pageContext.seo} />
        <MarkdownDesktop
          siteNav={siteNav}
          content={content}
          pageActions={pageActions}
        />
      </DocLayout>
    )
  } else {
    return (
      <DocLayout>
        <SEO title={props.pageContext.seo} />
        <MarkdownTablet
          siteNav={siteNav}
          content={content}
          pageActions={pageActions}
        />
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
