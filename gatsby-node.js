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

const pages = []

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
        if (theObject[prop] && theObject[prop].endsWith(matchingFilename)) {
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

    if (
      node.frontmatter &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, "author")
    ) {
      createNodeField({
        node,
        name: "authorId",
        value: node.frontmatter.author,
      })
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

  // Blog Templates
  const blogIndex = path.resolve(`./src/templates/blog-index.js`)
  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const authorsPage = path.resolve("src/templates/authors.js")
  const authorPage = path.resolve("src/templates/author.jsx")
  const tagPage = path.resolve("src/templates/tag.jsx")

  const gitRemote = gitRepoInfo(graphql)
  const gitPathPrefix = `${gitRemote.organization}/${gitRemote.name}/${gitRemote.ref}`

  let tabs = []

  const result = await graphql(
    `
      query {
        allMdx(
          filter: { fields: { slug: { regex: "/^(/blog)/" } } }
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fileAbsolutePath
              fields {
                slug
                authorId
              }
              frontmatter {
                title
                tags
                author
              }
            }
          }
        }
        allGithubContributors {
          edges {
            node {
              id
              contributors {
                date
                login
                name
                avatarUrl
              }
              path
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create side nav
  const posts = result.data.allMdx.edges

  if (posts.length > 0) {
    tabs = [
      { title: "Docs", path: "/" },
      { title: "Blog", path: "/blog" },
    ]

    const contributors = result.data.allGithubContributors.edges

    const postsNav = {
      importedFileName: "posts",
      pages: [],
      path: `${gitPathPrefix}/blog`,
      title: "Posts",
    }

    // Create a map of all the authors
    const authorMap = new Map()

    // Create blog posts pages.
    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node

      const contributorsObj = contributors.find(
        obj => obj.node.path === post.node.fileAbsolutePath
      )
      const author =
        contributorsObj?.node?.contributors.find(
          contributor => contributor.login === post.node.frontmatter.author
        ) ?? {}

      authorMap.set(post.node.frontmatter.author, author)

      createPage({
        path: post.node.fields.slug,
        component: blogPost,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
          pages: pages,
          author: author,
          gitRemote: gitRemote,
          tabs: tabs,
        },
      })
    })

    // Create the map of all the tabs
    const tagMap = new Map()

    posts.forEach((post, index) => {
      postsNav.pages.push({
        importedFileName: "posts",
        pages: [],
        path: `${gitPathPrefix}${post.node.fields.slug}`,
        title: post.node.frontmatter.title,
      })

      console.log(`${gitPathPrefix}${post.node.fields.slug}`)

      const tags = post.node.frontmatter.tags.split(",")
      return tags.map(tag => {
        const trimmedTag = tag.trim()
        if (tagMap.has(trimmedTag)) {
          tagMap.set(trimmedTag, tagMap.get(trimmedTag) + 1)
        } else {
          tagMap.set(trimmedTag, 1)
        }
      })
    })

    const authors = {
      importedFileName: "authors",
      pages: [],
      path: `${gitPathPrefix}/blog/authors/`,
      title: "Authors",
    }

    // Add each other to the side nav
    authorMap.forEach(author => {
      authors.pages.push({
        importedFileName: `${author.login}`,
        pages: [],
        path: `${gitPathPrefix}/blog/author/${author.login}/`,
        title: `${author.name || author.login}`,
      })
    })

    const tags = {
      importedFileName: "tags",
      pages: [],
      path: "/blog/tags/",
      title: "Tags",
    }

    // Descending sort of our map to get most popular tags
    const sortedTagMap = new Map(
      [...tagMap.entries()].sort((a, b) => b[1] - a[1])
    )

    // Add each tag to the side nav
    for (let [key, value] of sortedTagMap) {
      tags.pages.push({
        importedFileName: `${key}`,
        pages: [],
        path: `${gitPathPrefix}/blog/tags/${key}/`,
        title: `${value} #${key}`,
      })

      createPage({
        path: `/blog/tags/${key}/`,
        component: tagPage,
        context: {
          tagName: `/${key}/`,
          gitRemote: gitRemote,
          tabs: tabs,
        },
      })
    }

    pages.push(postsNav)
    pages.push(authors)
    pages.push(tags)

    const authorList = []
    authorMap.forEach(author => authorList.push(author))

    createPage({
      path: `/blog/authors/`,
      component: authorsPage,
      context: {
        slug: `/blog/authors/`,
        pages: pages,
        authors: authorList,
        gitRemote: gitRemote,
        tabs: tabs,
      },
    })
    authorMap.forEach(author => {
      createPage({
        path: `/blog/author/${author.login}/`,
        component: authorPage,
        context: {
          authorId: author.login,
          author: author,
          gitRemote: gitRemote,
          tabs: tabs,
        },
      })
    })

    createPage({
      path: `/blog`,
      component: blogIndex,
      context: {
        pages: pages,
        contributors: contributors,
        gitRemote: gitRemote,
        tabs: tabs,
      },
    })
  }

  try {
    let { data } = await graphql(`
      query {
        allMdx(filter: { fields: { slug: { regex: "/^(?!/blog)/" } } }) {
          edges {
            node {
              fileAbsolutePath
              frontmatter {
                template
                title
                tags
                author
              }
              fields {
                id
                slug
                authorId
              }
            }
          }
        }
        allGithubContributors {
          edges {
            node {
              id
              contributors {
                date
                login
                name
                avatarUrl
              }
              path
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
        const contributorsObj = data.allGithubContributors.edges.find(
          obj => obj.node.path === node.fileAbsolutePath
        )
        const contributors = contributorsObj?.node?.contributors ?? []

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
                contributors: contributors,
                tabs: tabs,
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
                contributors: contributors,
                tabs: tabs,
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
        console.log(filepath)
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
          gitRemote,
          tabs
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
            gitRemote,
            tabs
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
      tabs: tabs,
    },
  })
}

const createOpenApiPage = async (
  createPage,
  openapiTemplate,
  object,
  filepath,
  seo,
  gitRemote,
  tabs
) => {
  if (object && (object.swagger || object.openapi)) {
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
          object.paths[key][methodKey]["x-codeSamples"] = []
          methodRes.snippets.forEach(function(snippet) {
            object.paths[key][methodKey]["x-codeSamples"].push({
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
        tabs: tabs,
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
            type: `Mdx`,
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
    let title = searchTree(pages, slug) || node.frontmatter?.title
    const type = slug.startsWith("/blog") ? "blog" : "docs"
    if (title) {
      const doc = {
        id: slug,
        title: title,
        body: node.internal.content,
        path: slug,
        type: type,
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
