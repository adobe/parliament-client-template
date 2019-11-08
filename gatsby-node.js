/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require(`path`)
const fs = require(`fs`)
const YAML = require("yaml")
const swaggerSnippet = require(`swagger-snippet`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    let slug = ""
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

  try {
    let { data } = await graphql(`
      query {
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
    if (data) {
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
  } catch (e) {
    console.log("Skipping Markdown files")
    console.log(e)
  }

  try {
    let { data: jsonData } = await graphql(`
      query {
        allFile(filter: { extension: { eq: "json" } }) {
          edges {
            node {
              absolutePath
            }
          }
        }
      }
    `)
    if (jsonData.allFile.edges.length > 0) {
      jsonData.allFile.edges.forEach(({ node }) => {
        let path = node.absolutePath
        const object = JSON.parse(fs.readFileSync(path, "utf8"))
        createOpenApiPage(createPage, openapiTemplate, object, path)
      })
    }
  } catch (e) {
    console.log("Skipping JSON files")
    console.log(e)
  }

  try {
    let { data: yamlData } = await graphql(`
      query {
        allFile(filter: { extension: { in: ["yaml", "yml"] } }) {
          edges {
            node {
              absolutePath
            }
          }
        }
      }
    `)
    if (yamlData.allFile.edges.length > 0) {
      yamlData.allFile.edges.forEach(({ node }) => {
        let path = node.absolutePath
        const object = YAML.parse(fs.readFileSync(path, "utf8"))
        createOpenApiPage(createPage, openapiTemplate, object, path)
      })
    }
  } catch (e) {
    console.log("Skipping yaml files")
    console.log(e)
  }
}

const createOpenApiPage = (createPage, openapiTemplate, object, path) => {
  if (object.swagger) {
    if (path.lastIndexOf("gatsby-source-git/") > -1) {
      path = path.substring(path.lastIndexOf("gatsby-source-git/") + 18)
    }
    try {
      const targets = ['shell_curl', 'node_request', 'php_http1', 'java_unirest', 'go_native', 'python_python3', 'csharp_restsharp', 'ruby_native']
      const result = swaggerSnippet.getSwaggerSnippets(object, targets)
      const keys = Object.keys(object.paths)
      keys.forEach(key => {
        let res = result.filter(function(res) {
          return res.url.endsWith(key)
        })
        let methodKeys = Object.keys(object.paths[key])
        methodKeys.forEach(methodKey => {
          let methodRes = res.find(function(methodRes) {
            return methodRes.method.toLowerCase() == methodKey.toLowerCase()
          })
          object.paths[key][methodKey]["x-code-samples"] = []
          methodRes.snippets.forEach(function(snippet) {
            object.paths[key][methodKey]["x-code-samples"].push({
              lang: snippet.id.split('_')[0],
              source: snippet.content,
            })
          })
        })
      })
    } catch (e) {
      console.log("Skipping code samples for Swagger")
    }
    console.log("creating page " + path)
    createPage({
      path: path,
      component: openapiTemplate,
      context: {
        spec: object,
      },
    })
  }
}
