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
const elasticlunr = require(`elasticlunr`)
const { GraphQLJSONObject } = require("graphql-type-json")
const converter = require("widdershins")

const environment = process.env.NODE_ENV || "development"
const openApiSearchDocs = []

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
  if (node.internal.type === `Mdx`) {
    let slug = ""
    switch (environment) {
      case "production":
        if (node.fileAbsolutePath.lastIndexOf("gatsby-source-git/") > -1) {
          slug = node.fileAbsolutePath.substring(
            node.fileAbsolutePath.lastIndexOf("gatsby-source-git/") + 18
          )
        } else if (node.frontmatter.path) {
          slug = node.frontmatter.path
        }
        break
      case "development":
        const localFilePath = path.relative(__dirname, node.fileAbsolutePath)
        const directories = localFilePath.split(path.sep)

        // Remove src/content prefix from slug
        if (localFilePath.startsWith("src/content")) {
          // Remove src
          directories.shift()
          // Remove content
          directories.shift()
        }

        slug = path.join("/", ...directories)
        break
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

  const gitRemote = gitRepoInfo(graphql)

  try {
    let { data } = await graphql(`
      query {
        allMdx {
          edges {
            node {
              frontmatter {
                template
              }
              fields {
                id
                slug
              }
              fileAbsolutePath
            }
          }
        }
        parliamentNavigation {
          pages
        }
      }
    `)
    if (data) {
      data.allMdx.edges.forEach(({ node }) => {
        if (node.fields.slug !== "") {
          let seo = searchTree(
            data.parliamentNavigation.pages,
            node.fields.slug
          )
          if (node.frontmatter.template === "recipe") {
            createPage({
              path: node.fields.slug,
              component: recipeTemplate,
              context: {
                slug: node.fields.slug,
                id: node.fields.id,
                seo: seo,
                gitRemote: gitRemote,
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
        parliamentNavigation {
          pages
        }
      }
    `)
    if (jsonData.allFile.edges.length > 0) {
      jsonData.allFile.edges.forEach(({ node }) => {
        let filepath = node.absolutePath
        const object = JSON.parse(fs.readFileSync(filepath, "utf8"))
        let seo = searchTree(
          jsonData.parliamentNavigation.pages,
          `${node.name}${node.ext}`
        )

        createOpenApiPage(
          createPage,
          openapiTemplate,
          object,
          filepath,
          seo,
          gitRemote
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
        parliamentNavigation {
          pages
        }
      }
    `)
    if (yamlData.allFile.edges.length > 0) {
      yamlData.allFile.edges.forEach(({ node }) => {
        let filepath = node.absolutePath
        try {
          let object = YAML.parse(fs.readFileSync(filepath, "utf8"))
          let seo = searchTree(
            yamlData.parliamentNavigation.pages,
            `${node.name}${node.ext}`
          )
          createOpenApiPage(
            createPage,
            openapiTemplate,
            object,
            filepath,
            seo,
            gitRemote
          )
        } catch (e) {
          console.log(`Skipping file: ${filepath}`)
        }
      })
    }
  } catch (e) {
    console.log("Skipping yaml files")
    console.log(e)
  }

  // redirect home page to main page
  createPage({
    path: `/`,
    component: indexTemplate,
    context: {
      slug: `/`,
      gitRemote: {
        org: gitRemote.organization,
        name: gitRemote.name,
        branch: gitRemote.ref,
      },
    },
  })
}

const createOpenApiPage = async (
  createPage,
  openapiTemplate,
  object,
  filepath,
  seo,
  gitRemote
) => {
  if (object.swagger || object.openapi) {
    let slug = filepath

    switch (environment) {
      case "production":
        if (filepath.lastIndexOf("gatsby-source-git/") > -1) {
          slug = filepath.substring(
            filepath.lastIndexOf("gatsby-source-git/") + 18
          )
        }
        break
      case "development":
        const localFilePath = path.relative(__dirname, filepath)
        const directories = localFilePath.split(path.sep)

        // Remove src/content prefix from slug
        if (localFilePath.startsWith("src/content")) {
          // Remove src
          directories.shift()
          // Remove content
          directories.shift()
        }

        slug = path.join("/", ...directories)
        break
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
      path: slug,
      component: openapiTemplate,
      context: {
        spec: object,
        seo: seo,
        gitRemote: gitRemote,
      },
    })

    // if we have the spec is in the side nav add it to search index
    if (seo) {
      // convert openapi to markdown
      const md = await converter.convert(object, {})
      // add open api spec to search index
      openApiSearchDocs.push({
        id: slug,
        title: seo,
        body: md,
        path: slug,
        type: "apis",
      })
    }
  }
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      // Put main before module else it messes up react spectrum css import
      mainFields: ["browser", "main", "module"],
    },
  })
}

/**
 * Add custom field resolvers to the GraphQL schema. Allows adding new fields to types by providing field configs,
 * or adding resolver functions to existing fields.
 *
 * We are using this to save the search index as a JSON object as we create here during build time.
 *
 * [Gatsby Node API - createResolvers]{@link https://www.gatsbyjs.org/docs/node-apis/#createResolvers}
 *
 * @param {function} createResolvers
 */
exports.createResolvers = ({ createResolvers }) => {
  createResolvers({
    Query: {
      ParliamentSearchIndex: {
        type: GraphQLJSONObject,
        resolve(source, args, context) {
          const siteNodes = context.nodeModel.getAllNodes({
            type: `MarkdownRemark`,
          })
          const pages = context.nodeModel.getAllNodes({
            type: `ParliamentNavigation`,
          })
          return createIndex(siteNodes, pages)
        },
      },
    },
  })
}

/**
 * Creates an elasticlunr index of all the markdown and open api documents.
 *
 * [Gatsby Node API - createResolvers]{@link https://www.gatsbyjs.org/docs/node-apis/#createResolvers}
 *
 * @param {Array} nodes An array containing all the markdown documents
 * @param {Object} pages The contents of ParliamentNavigation
 */
const createIndex = async (nodes, pages) => {
  const index = elasticlunr()
  index.setRef(`id`)
  index.addField(`title`)
  index.addField(`body`)
  index.addField(`path`)
  index.addField(`type`)

  for (node of nodes) {
    const { slug } = node.fields
    let title = searchTree(pages, slug)
    if (title) {
      const doc = {
        id: slug,
        title: title,
        body: node.internal.content,
        path: slug,
        type: "docs",
      }
      index.addDoc(doc)
    }
  }

  // Open API specs are not in graphql db, hence this hack
  for (spec of openApiSearchDocs) {
    index.addDoc(spec)
  }

  return index.toJSON()
}
