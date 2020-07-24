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
import { useStaticQuery, graphql } from "gatsby"
import renderAst from "../utils/AFMRehype"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { MDXProvider } from "@mdx-js/react"

const IncludeMarkdown = ({ file }) => {
  const { allMdx } = useStaticQuery(
    graphql`
      query {
        allMdx {
          edges {
            node {
              body
              fileAbsolutePath
            }
          }
        }
      }
    `
  )

  const markdownRemark = allMdx.edges.find(edge =>
    edge.node.fileAbsolutePath.toLowerCase().endsWith(file.toLowerCase())
  )

  if (markdownRemark) {
    return (
      <React.Fragment>
        <MDXProvider components={renderAst.components}>
          <MDXRenderer>{markdownRemark.node.body}</MDXRenderer>
        </MDXProvider>
      </React.Fragment>
    )
  } else {
    return <React.Fragment>Could not find {file}</React.Fragment>
  }
}

export default IncludeMarkdown
