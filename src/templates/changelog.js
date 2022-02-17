/** @jsx jsx */
import { css, jsx } from "@emotion/react"

import { graphql } from "gatsby"

import { View } from "@adobe/react-spectrum"
import { SideNav } from "@adobe/parliament-ui-components"
import PageActions from "../components/PageActions"

import DocLayout from "../components/doclayout"
import renderAst from "../util/AFMRehype"
import RightRail from "../components/RightRail"

export default function ChangeLogTemplate({ data, location, pageContext }) {
  const { markdownRemark } = data
  const { frontmatter, htmlAst, timeToRead, headings } = markdownRemark
  const { pages, selectedKey } = pageContext
  return (
    <DocLayout
      location={location}
      title={frontmatter.title}
      pages={pages}
      sideNav={
        <View
          paddingTop="size-300"
          paddingX="size-300"
          width="size-3400"
          backgroundColor="gray-75"
        >
          <SideNav
            css={css`
              height: 100%;
            `}
            items={pages}
            selectedKeys={[selectedKey]}
          />
        </View>
      }
      rightRail={
        <RightRail>
          <PageActions
            headings={headings}
            timeToRead={timeToRead}
          />
        </RightRail>
      }
    >
      <View paddingX="size-300">{renderAst(htmlAst)}</View>
    </DocLayout>
  )
}
export const pageQuery = graphql`
  query ChangeLogTemplateQuery($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      htmlAst
      headings {
        depth
        id
        value
      }
      timeToRead
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
      }
    }
    allHeaderTabs {
      edges {
        node {
          path
          title
          id
        }
      }
    }
    allSiteTabs {
      edges {
        node {
          path
          id
          title
        }
      }
    }
  }
`
