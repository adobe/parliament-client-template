/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require(`path`)

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve(`src/templates/blogTemplate.js`)
  const hypermediaTemplate = path.resolve(`src/templates/hypermediaTemplate.js`)

  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `)

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    console.log(JSON.stringify(node))
    if (node.frontmatter.path) {
      if (node.frontmatter.path.includes('/hypermedia')) {
      createPage({
        path: node.frontmatter.path,
        component: hypermediaTemplate,
        context: {}, // additional data can be passed via context
      })
      } else {
      createPage({
        path: node.frontmatter.path,
        component: blogPostTemplate,
        context: {}, // additional data can be passed via context
      })
      }
    }
  })

  const { data } = await graphql(`
    query {
      allFile {
        edges {
          node {
            id
            extension
            dir
            modifiedTime
            name
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  `)

  data.allFile.edges.forEach(({ node }) => {
    const folder = node.dir.substring(
      node.dir.lastIndexOf("gatsby-source-git/") + 18
    )
    const slug = `${folder}/${node.name}.${node.extension}`
    console.log(slug)
    console.log(node.dir)
    // console.log(JSON.stringify(node))
    if (node.extension === "md") {
      createPage({
        path: slug,
        component: require.resolve(`./src/templates/blogTemplate2.js`),
        context: { slug: node.name, id: node.id },
      })
    }
  })
}
