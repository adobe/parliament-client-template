/** @jsx jsx */
import { css, jsx } from "@emotion/react"

import { graphql } from "gatsby"

import { View } from "@adobe/react-spectrum"
import {
  Footer,
  Grid,
  GridHeader,
  GridNav,
  GridContent,
  GridRightRail,
  GridFooter,
  SideNav,
  TableOfContents,
} from "@adobe/parliament-ui-components"
import HeaderBar from "../components/HeaderBar"

import { MDXRenderer } from "gatsby-plugin-mdx"
import { MDXProvider } from "@mdx-js/react"

import DocLayout from "../components/doclayout"
import SEO from "../components/seo"
import { componentsMapping } from "../components/componentsMapping"

export default function ChangeLogTemplate({ data, location, pageContext }) {
  const { mdx, allSiteTabs, allHeaderTabs } = data
  const { frontmatter, body, tableOfContents } = mdx
  const { pages, gitRemote, selectedKey } = pageContext
  const tabs = [
    ...allSiteTabs.edges.map(({ node }) => node),
    ...allHeaderTabs.edges.map(({ node }) => node),
  ]
  return (
    <DocLayout location={location}>
      <SEO title={frontmatter.title} />
      <Grid>
        <GridHeader>
          <HeaderBar
            location={location}
            gitRemote={gitRemote}
            pages={pages}
            tabs={tabs}
          />
        </GridHeader>
        <GridNav>
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
        </GridNav>
        <GridContent>
          <View paddingX="size-300">
            <MDXProvider components={componentsMapping}>
              <MDXRenderer>{body}</MDXRenderer>
            </MDXProvider>
          </View>
        </GridContent>
        <GridRightRail>
          <aside
            css={css`
              position: fixed;
              top: var(--spectrum-global-dimension-size-800);
              height: 100%;
            `}
          >
            <TableOfContents
              tableOfContents={tableOfContents}
              title="In this Update"
            />
          </aside>
        </GridRightRail>
        <GridFooter>
          <Footer />
        </GridFooter>
      </Grid>
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
