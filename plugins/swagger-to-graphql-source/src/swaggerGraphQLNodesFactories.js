const INFO_NODE_TYPE = "SwaggerOpenApiInfo";

export const createInfoNode = props => {
  const {
    api,
    parentFile,
    gatsbyNodeApi: { createNodeId, createContentDigest },
  } = props

  const { info } = api;

  const { name, id: parentId } = parentFile;

  return {
    ...info,
    id: createNodeId(`${name} ${info.title} ${info.version}`),
    name: name,
    children: [],
    internal: {
      content: "",
      contentDigest: createContentDigest(info),
      type: INFO_NODE_TYPE,
    },
    parent: parentId,
  }
}

export const createPathNodes = props => {}

export const createDefinitionNodes = props => {}

export const createTagNodes = props => {}
