import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import HypermediaSubLayout from "../components/hypermediasubpage"
import SEO from "../components/seo"

const Template = () => {
  const data = useStaticQuery(graphql`
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
  `)

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

export default Template
