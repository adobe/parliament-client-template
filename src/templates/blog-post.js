/**
 *  Copyright 2020 Adobe. All rights reserved.
 *  This file is licensed to you under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License. You may obtain a copy
 *  of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software distributed under
 *  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 *  OF ANY KIND, either express or implied. See the License for the specific language
 *  governing permissions and limitations under the License.
 */

/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { Fragment } from "react"
import { graphql, Link } from "gatsby"

import {
  Footer,
  Next,
  Prev,
  Grid,
  GridNav,
  GridContent,
  GridFooter,
  GridHeader,
} from "@adobe/parliament-ui-components"
import { Heading } from "@adobe/react-spectrum"
import "@spectrum-css/label"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import SiteMenu from "../components/SiteMenu"
import HeaderBar from "../components/HeaderBar"
import { rhythm, scale } from "../utils/typography"

import "../components/layout.css"

const generateTags = tagString => {
  const tags = tagString.split(",")
  return tags.map(tag => (
    <Fragment>
      <span class="spectrum-Label spectrum-Label--red">#{tag}</span>{" "}
    </Fragment>
  ))
}

const BlogPostTemplate = props => {
  const { data, pageContext, location } = props
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { author, previous, next, pages } = pageContext

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <Grid>
        <GridHeader>
          <HeaderBar
            siteTitle={siteTitle}
            currentPage={props.location.pathname}
            pages={pages}
          />
        </GridHeader>
        <GridNav className="spectrum--light">
          <SiteMenu currentPage={props.location.pathname} pages={pages} />
        </GridNav>
        <GridContent
          css={css`
            background-color: white;
          `}
        >
          <article>
            <header>
              <Heading variant="pageTitle">{post.frontmatter.title}</Heading>
              <p
                style={{
                  ...scale(-1 / 5),
                  display: `block`,
                  marginBottom: rhythm(1),
                }}
              >
                {post.frontmatter.date}
                <br />
                by{" "}
                <Link to={`/author/${author.login}`}>
                  {author.name || author.login}
                </Link>
                <br />
                {generateTags(post.frontmatter.tags)}
              </p>
            </header>
            <section dangerouslySetInnerHTML={{ __html: post.html }} />
            <hr
              style={{
                marginBottom: rhythm(1),
              }}
            />
            <footer>
              <Bio author={author} />
            </footer>
          </article>

          <nav>
            <ul
              style={{
                display: `flex`,
                flexWrap: `wrap`,
                justifyContent: `space-between`,
                listStyle: `none`,
                padding: 0,
              }}
            >
              <li>
                {previous && (
                  <Prev
                    url={previous.fields.slug}
                    title={previous.frontmatter.title}
                  />
                )}
              </li>
              <li>
                {next && (
                  <Next url={next.fields.slug} title={next.frontmatter.title} />
                )}
              </li>
            </ul>
          </nav>
        </GridContent>
        <GridFooter>
          <Footer />
        </GridFooter>
      </Grid>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tags
        author
      }
    }
  }
`
