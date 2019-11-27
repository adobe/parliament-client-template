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

const stripManifestPath = (path, urlPrefix = "") => {
  if (!path) {
    return ""
  }
  let location = path.toLowerCase().indexOf(urlPrefix.toLowerCase())
  if (location > -1) {
    return path.substring(location + urlPrefix.length)
  } else {
    return path
  }
}

const searchTree = (theObject, matchingFilename) => {
  var result = null
  if (theObject instanceof Array) {
    for (var i = 0; i < theObject.length; i++) {
      result = searchTree(theObject[i], matchingFilename)
      if (result) {
        break
      }
    }
  } else {
    for (var prop in theObject) {
      if (prop === "path") {
        if (theObject[prop].endsWith(matchingFilename)) {
          return theObject.title
        }
      }
      if (
        theObject[prop] instanceof Object ||
        theObject[prop] instanceof Array
      ) {
        result = searchTree(theObject[prop], matchingFilename)
        if (result) {
          break
        }
      }
    }
  }
  return result
}

const readManifest = async graphql => {
  let pages = []
  try {
    let { data: manifest } = await graphql(`
      query {
        allRawJsonFile(filter: { view_type: { eq: "mdbook" } }) {
          edges {
            node {
              id
              pages
            }
          }
        }
      }
    `)
    pages = manifest.allRawJsonFile.edges[0].node.pages
  } catch (e) {
    console.log("Could not read the manifest")
  }
  return pages
}

const gitRepoInfo = async graphql => {
  let { data } = await graphql(`
    query {
      gitRemote {
        organization
        name
        ref
      }
    }
  `)
  return data.gitRemote
}

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
  const indexTemplate = path.resolve(`src/templates/indexTemplate.js`)

  const pages = await readManifest(graphql)

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
            let seo = searchTree(pages, node.fields.slug)
            createPage({
              path: node.fields.slug,
              component: docTemplate,
              context: {
                slug: node.fields.slug,
                id: node.fields.id,
                seo: seo,
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
              name
              ext
            }
          }
        }
      }
    `)
    if (jsonData.allFile.edges.length > 0) {
      jsonData.allFile.edges.forEach(({ node }) => {
        let path = node.absolutePath
        const object = JSON.parse(fs.readFileSync(path, "utf8"))
        let seo = searchTree(pages, `${node.name}${node.ext}`)
        createOpenApiPage(createPage, openapiTemplate, object, path, seo)
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
              name
              ext
            }
          }
        }
      }
    `)
    if (yamlData.allFile.edges.length > 0) {
      yamlData.allFile.edges.forEach(({ node }) => {
        let path = node.absolutePath
        const object = YAML.parse(fs.readFileSync(path, "utf8"))
        let seo = searchTree(pages, `${node.name}${node.ext}`)
        createOpenApiPage(createPage, openapiTemplate, object, path, seo)
      })
    }
  } catch (e) {
    console.log("Skipping yaml files")
    console.log(e)
  }

  // redirect home page to main page
  const homePage = pages[0]
  const { organization, name, ref } = await gitRepoInfo(graphql)
  createPage({
    path: `/`,
    component: indexTemplate,
    context: {
      slug: `/`,
      redirect: stripManifestPath(
        homePage.path,
        `${organization}/${name}/${ref}`
      ),
    },
  })
}

const createOpenApiPage = (createPage, openapiTemplate, object, path, seo) => {
  if (object.swagger) {
    if (path.lastIndexOf("gatsby-source-git/") > -1) {
      path = path.substring(path.lastIndexOf("gatsby-source-git/") + 18)
    }
    try {
      const targets = [
        "shell_curl",
        "node_request",
        "php_http1",
        "java_unirest",
        "go_native",
        "python_python3",
        "csharp_restsharp",
        "ruby_native",
      ]
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
              lang: snippet.id.split("_")[0],
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
        seo: seo,
      },
    })
  }
}
