const { GraphQLJSON } = require("gatsby/graphql")
const fromJson = require("./src/fromJson")
const fromYaml = require("./src/fromYaml")

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

exports.setFieldsOnGraphQLNodeType = args => {
  const {
    type: { name, nodes },
  } = args
  if (name === "ParliamentNavigation") {
    return nodes
      .map(({ id, parent, children, internal, ...rest }) => Object.keys(rest))
      .reduce((a, f) => a.concat(f), [])
      .reduce((o, name) => ({ ...o, [name]: GraphQLJSON }), {})
  }
}

exports.onCreateNode = onCreateNode
