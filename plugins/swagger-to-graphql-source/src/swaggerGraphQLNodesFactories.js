const INFO_NODE_TYPE = "SwaggerOpenApiInfo";

exports.createInfoNode = props => {
  const {
    api,
    parentFile,
    gatsbyNodeApi: { createNodeId, createContentDigest },
  } = props

  const { info, swagger, host, basePath, schemes, consumes, produces, tags } = api;

  const { name, id: parentId } = parentFile;

  return {
    ...info,
    swagger,
    host,
    basePath,
    schemes,
    consumes,
    produces,
    tags,
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

exports.createPathNodes = props => {}

exports.createDefinitionNodes = props => {}

exports.createTagNodes = props => {}
