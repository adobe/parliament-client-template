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

import React, { Fragment } from "react"
import { graphql } from "gatsby"

import { Next, Prev, Heading1 } from "@adobe/parliament-ui-components"
import "@spectrum-css/label"

import Bio from "../components/bio"
import DocLayout from "../components/doclayout"
import Link from "../components/Link"
import SiteMenu from "../components/SiteMenu"
import RenderMdx from "../components/RenderMdx"

import "../components/layout.css"

const generateTags = (tagString) => {
  const tags = tagString?.split(",")
  return (
    tags &&
    tags.map((tag) => (
      <Fragment>
        <span className="spectrum-Label spectrum-Label--red">#{tag}</span>{" "}
      </Fragment>
    ))
  )
}

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.mdx
  const { author, previous, next, pages, gitRemote } = pageContext

  return (
    <DocLayout
      location={location}
      title={post.frontmatter.title}
      gitRemote={gitRemote}
      pages={pages}
      sideNav={
        <SiteMenu
          gitRemote={gitRemote}
          currentPage={location.pathname}
          pages={pages}
        />
      }
    >
      <article>
        <header>
          <Heading1>{post.frontmatter.title}</Heading1>
          <p
            style={{
              display: `block`,
            }}
          >
            {post.frontmatter.date}
            <br />
            by{" "}
            <Link to={`/blog/author/${author.login}`}>
              {author.name || author.login}
            </Link>
            <br />
            {generateTags(post.frontmatter.tags)}
          </p>
        </header>
        <RenderMdx>{post.body}</RenderMdx>
        <hr />
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
    </DocLayout>
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
      body
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
