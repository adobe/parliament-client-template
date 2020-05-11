/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
const path = require(`path`)
const fs = require(`fs`)
const YAML = require("yaml")
const openApiSnippet = require(`openapi-snippet`)
const GitUrlParse = require(`git-url-parse`)

const stripManifestPath = (path, { org = "", name = "", branch = "" } = {}) => {
  if (!path) {
    return ""
  }
  let urlPrefix = ""
  if (org) {
    urlPrefix += org
  }
  if (name) {
    urlPrefix += urlPrefix !== "" ? "/" + name : name
  }
  if (branch) {
    urlPrefix += urlPrefix !== "" ? "/" + branch : branch
  }
  // Normal case with org/name/branch
  let location = path.toLowerCase().indexOf(urlPrefix.toLowerCase())
  if (location > -1) {
    return path.substring(location + urlPrefix.length)
  }
  // Exception case with only name in url
  else if (path.toLowerCase().indexOf(name.toLowerCase() > -1)) {
    return path.substring(
      path.toLowerCase().indexOf(name.toLowerCase()) + name.length
    )
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
    let { data } = await graphql(`
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

    if (data) {
      data.allFile.edges.forEach(({ node }) => {
        let path = node.absolutePath
        const object = JSON.parse(fs.readFileSync(path, "utf8"))
        if (object.view_type === "mdbook") {
          pages = object.pages
        }
      })
    }
  } catch (e) {
    console.log(e)
    console.log("Could not read the manifest")
  }
  return pages
}

const gitRepoInfo = () => {
  const gitInfo = GitUrlParse(process.env.GATSBY_SOURCE)
  return {
    protocol: gitInfo.protocol,
    resource: gitInfo.resource,
    full_name: `${gitInfo.owner}/${gitInfo.name}`,
    organization: gitInfo.owner,
    name: gitInfo.name,
    ref: process.env.GATSBY_SOURCE_BRANCH,
  }
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
  const recipeTemplate = path.resolve(`src/templates/recipeTemplate.js`)
  const openapiTemplate = path.resolve(`src/templates/openapiTemplate.js`)
  const indexTemplate = path.resolve(`src/templates/indexTemplate.js`)

  const pages = await readManifest(graphql)
  const gitRemote = gitRepoInfo(graphql)

  try {
    let { data } = await graphql(`
      query {
        allMarkdownRemark {
          edges {
            node {
              frontmatter {
                template
              }
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
          let seo = searchTree(pages, node.fields.slug)
          if (node.frontmatter.template === "recipe") {
            createPage({
              path: node.fields.slug,
              component: recipeTemplate,
              context: {
                slug: node.fields.slug,
                id: node.fields.id,
                seo: seo,
                gitRemote: gitRemote,
                pages: pages,
              },
            })
          } else {
            createPage({
              path: node.fields.slug,
              component: docTemplate,
              context: {
                slug: node.fields.slug,
                id: node.fields.id,
                seo: seo,
                gitRemote: gitRemote,
                pages: pages,
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
        createOpenApiPage(
          createPage,
          openapiTemplate,
          object,
          path,
          seo,
          gitRemote,
          pages
        )
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
        try {
          let object = YAML.parse(fs.readFileSync(path, "utf8"))
          let seo = searchTree(pages, `${node.name}${node.ext}`)
          createOpenApiPage(
            createPage,
            openapiTemplate,
            object,
            path,
            seo,
            gitRemote,
            pages
          )
        } catch (e) {
          console.log(`Skipping file: ${path}`)
        }
      })
    }
  } catch (e) {
    console.log("Skipping yaml files")
    console.log(e)
  }

  // redirect home page to main page
  const homePage = pages[0]
  const strippedHomePage = stripManifestPath(homePage.path, {
    org: gitRemote.organization,
    name: gitRemote.name,
    branch: gitRemote.ref,
  })
  createPage({
    path: `/`,
    component: indexTemplate,
    context: {
      slug: `/`,
      redirect: strippedHomePage,
    },
  })

  // Setup cypress.env.json for testing
  const cypress = {
    prefix: process.env.GATSBY_SITE_PATH_PREFIX,
    homePage: strippedHomePage,
  }
  fs.writeFileSync("cypress.env.json", JSON.stringify(cypress))
}

const createOpenApiPage = (
  createPage,
  openapiTemplate,
  object,
  path,
  seo,
  gitRemote,
  pages
) => {
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
      const result = openApiSnippet.getSnippets(object, targets)
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

    createPage({
      path: path,
      component: openapiTemplate,
      context: {
        spec: object,
        seo: seo,
        gitRemote: gitRemote,
        pages: pages,
      },
    })
  }
}
