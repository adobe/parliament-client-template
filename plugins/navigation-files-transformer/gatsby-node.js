const fromJson = require("./src/fromJson")
const fromYaml = require("./src/fromYaml")
const reduceGraphQLToJson = require("./src/utils")

/**
 * Callback for creating graphql nodes from project navigation files.
 * This file runs when Gatsby creates GraphQL nodes from source nodes.
 *
 * @param {Object} api The [Gatsby API]{@link https://www.gatsbyjs.org/docs/api-reference/} object
 * @param {Object} options Plugin options. There are currently none for this plugin.
 */
const onCreateNode = async (
  { node, actions, loadNodeContent, createNodeId, createContentDigest },
  options
) => {
  const { createNode, createParentChildLink } = actions

  const mediaType = node.internal.mediaType

  if (mediaType !== "text/yaml" && mediaType !== "application/json") {
    return
  }

  const content = await loadNodeContent(node)

  if (content === null || content === "") return

  let parsedContent = undefined

  switch (mediaType) {
    case "application/json":
      parsedContent = fromJson(content)
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
        content: "",
        contentDigest: createContentDigest(parsedContent),
        type: "ParliamentNavigation",
      },
    }
    createNode(navigationNode)
    createParentChildLink({ parent: node, child: navigationNode })
  }
}

/**
 * Called during the creation of the GraphQL schema.
 * Allows plugins to add new fields to the types created from data nodes.
 * It will be called separately for each type.
 * This function should return an object in the shape of GraphQLFieldConfigMap
 * which will be appended to fields inferred by Gatsby from data nodes.
 *
 * [Gatsby Node API]{@link https://www.gatsbyjs.org/docs/node-apis/#setFieldsOnGraphQLNodeType}
 *
 * @param {Object} type An object containing the type `name` and `nodes`
 */
exports.setFieldsOnGraphQLNodeType = ({ type }) => {
  const { name, nodes } = type
  if (name === "ParliamentNavigation") {
    console.log(JSON.stringify(nodes))
    return reduceGraphQLToJson(nodes)
  }
}

exports.onCreateNode = onCreateNode
