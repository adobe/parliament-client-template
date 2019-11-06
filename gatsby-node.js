/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require(`path`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    var slug = ""
    if (node.fileAbsolutePath.lastIndexOf("gatsby-source-git/") > -1) {
      slug = node.fileAbsolutePath.substring(
        node.fileAbsolutePath.lastIndexOf("gatsby-source-git/") + 18
      )
    } else if (node.frontmatter.path) {
      slug = node.frontmatter.path
    }

    console.log(slug)

    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })

    createNodeField({
      node,
      name: `id`,
      value: node.parent,
    })
  }
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const docTemplate = path.resolve(`src/templates/markdownTemplate.js`)
  const hypermediaTemplate = path.resolve(`src/templates/hypermediaTemplate.js`)
  const openapiTemplate = path.resolve(`src/templates/openapiTemplate.js`)

  const { data } = await graphql(`
    query {
      allRawJsonFile(filter: { swagger: { nin: ["", null] }}) {
        edges {
          node {
            id
            swagger
            info
            host
            basePath
            schemes
            paths
            parent {
              parent {
                ... on File {
                  absolutePath
                }
              }
            }
          }
        }
      }
      allMarkdownRemark {
        edges {
          node {
            fields {
              id
              slug
            }
          }
        }
      }
    } 
  `)

  data.allRawJsonFile.edges.forEach(({ node }) => {
    var path;
    if (node.parent.parent.absolutePath.lastIndexOf("gatsby-source-git/") > -1) {
      path = node.parent.parent.absolutePath.substring(
        node.parent.parent.absolutePath.lastIndexOf("gatsby-source-git/") + 18
      )
    }
    createPage({
      path: path,
      component: openapiTemplate,
      context: {
        spec: node,
      },
    })
  })

  data.allMarkdownRemark.edges.forEach(({ node }) => {
    if (node.fields.slug !== "") {
      if (node.fields.slug.includes("/hypermedia")) {
        createPage({
          path: node.fields.slug,
          component: hypermediaTemplate,
          context: {}, // additional data can be passed via context
        })
      } else {
        createPage({
          path: node.fields.slug,
          component: docTemplate,
          context: {
            slug: node.fields.slug,
            id: node.fields.id,
          },
        })
      }
    }
  })
}