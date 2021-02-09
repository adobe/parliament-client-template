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

import { Heading } from "@adobe/react-spectrum"

import DocLayout from "../components/doclayout"
import Link from "../components/Link"
import SiteMenu from "../components/SiteMenu"

import "../components/layout.css"

const cleanString = (str = "") =>
  str.replace(/"/g, "").replace(/“/g, "").replace(/”/g, "")

const generateTags = (tagString) => {
  if (tagString) {
    const tags = tagString?.split(",")
    return tags && tags.map((tag) => <Fragment>#{tag} </Fragment>)
  } else {
    return null
  }
}

const BlogIndex = ({ data, location, pageContext }) => {
  const posts = data.allMdx.edges
  const { pages, contributors, gitRemote } = pageContext

  return (
    <DocLayout
      location={location}
      title={data.site.siteMetadata.title}
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
      {posts.map(({ node }) => {
        if (node.fields.slug.includes("blog/")) {
          const title = node.frontmatter.title || node.fields.slug
          const postAuthor = cleanString(node.frontmatter.author)

          const contributorsObj = contributors.find(
            (obj) => obj.node.path === node.fileAbsolutePath
          )
          const author =
            contributorsObj?.node?.contributors.find(
              (contributor) => contributor.login === postAuthor
            ) ?? {}

          return (
            <article key={node.fields.slug}>
              <header>
                <Heading level={2}>
                  <Link to={`${node.fields.slug}`}>{title}</Link>
                </Heading>
                <p className="spectrum-Body--M">
                  <small>{node.frontmatter.date}</small>
                  <br />
                  <small>
                    by{" "}
                    <Link to={`author/${author.login}`}>
                      {author.name || author.login}
                    </Link>
                  </small>
                  <br />
                  <small>{generateTags(node.frontmatter.tags)}</small>
                </p>
              </header>
              <section>
                <p
                  className="spectrum-Body--M"
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                />
              </section>
            </article>
          )
        }
      })}
    </DocLayout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          fileAbsolutePath
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            tags
            author
          }
        }
      }
    }
  }
`
