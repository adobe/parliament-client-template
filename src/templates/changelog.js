/** @jsx jsx */
import { css, jsx } from "@emotion/react"

import { graphql } from "gatsby"

import { View } from "@adobe/react-spectrum"
import { SideNav, TableOfContents } from "@adobe/parliament-ui-components"

import DocLayout from "../components/doclayout"
import RenderMdx from "../components/RenderMdx"
import RightRail from "../components/RightRail"

export default function ChangeLogTemplate({ data, location, pageContext }) {
  const { mdx } = data
  const { frontmatter, body, tableOfContents } = mdx
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
          <TableOfContents
            tableOfContents={tableOfContents}
            title="In this Update"
          />
        </RightRail>
      }
    >
      <View paddingX="size-300">
        <RenderMdx>{body}</RenderMdx>
      </View>
    </DocLayout>
  )
}
export const pageQuery = graphql`
  query ChangeLogTemplateQuery($slug: String!) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      body
      tableOfContents(maxDepth: 3)
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
