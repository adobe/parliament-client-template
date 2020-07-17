const fromJson = require("./src/fromJson")
const { parse } = require("yaml")
const fromJason = require("./src/fromJson")
const fromYaml = require("./src/fromYaml")

/**
 * Callback for creating graphql nodes from project navigation files.
 * This file runs when Gatsby creates GraphQL nodes from source nodes.
 * 
 * @param {Object} api The [Gatsby API]{@link https://www.gatsbyjs.org/docs/api-reference/} object
 * @param {Object} options Plugin options. There are currently none for this plugin.
 */
const onCreateNode = async (api, options) => {
  const {
    node,
    actions,
    loadNodeContent,
    createNodeId,
    createContentDigest,
  } = api

  const { createNode } = actions

  const mediaType = node.internal.mediaType

  if (mediaType !== "text/yaml" && mediaType !== "application/json") {
    return
  }

  const content = await loadNodeContent(node)

  let parsedContent = undefined

  switch (mediaType) {
    case "application/json":
      parsedContent = fromJason(content)
      break
    case "text/yaml":
      parsedContent = fromYaml(content)
      break
  }

  if (parsedContent) {
    const navigationNode = {
      ...parsedContent,
      id: createNodeId(
        `${node.id} ${parsedContent.title} ${parsedContent.path}`
      ),
      children: [],
      parent: node.id,
      internal: {
        contentDigest: createContentDigest(parsedContent),
        type: "parliamentNavigation",
      },
    }
    createNode(navigationNode)
  }
}

exports.onCreateNode = onCreateNode
