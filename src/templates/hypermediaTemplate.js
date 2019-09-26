import React from "react"
import { graphql } from "gatsby"
import HypermediaSubLayout from "../components/hypermediasubpage"
import SEO from "../components/seo"

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  console.log(data)
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark
  return (
    <HypermediaSubLayout>
      <SEO title="Markdown" />
      <div className="blog-post-container">
        <div className="blog-post">
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </HypermediaSubLayout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`
