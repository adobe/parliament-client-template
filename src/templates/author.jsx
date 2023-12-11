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

import React from "react"
import { graphql, Link } from "gatsby"

const Author = ({
  data: {
    allMarkdownRemark: { edges: postNodes },
  },
  pageContext: { author },
}) => (
  <div>
    <div>
      <h2>{author.name || author.login}</h2>
    </div>
    <hr />
    <p>{`Posted by ${author.name}: `}</p>
    {postNodes.map(({ node: post }) => (
      <div key={post.id}>
        <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
      </div>
    ))}
  </div>
)

export default Author;

export const pageQuery = graphql`
  query PostsByAuthorId($authorId: String!) {
    allMarkdownRemark(filter: { fields: { authorId: { eq: $authorId } } }) {
      edges {
        node {
          id
          frontmatter {
            title
            author
          }
          fields {
            authorId
            slug
          }
        }
      }
    }
  }
`
