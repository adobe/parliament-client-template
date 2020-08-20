const INFO_NODE_TYPE = "SwaggerOpenApiInfo";
const PATH_NODE_TYPE = "SwaggerOpenApiPath";

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

exports.createPathNodes = props => {
  const {
    api,
    parentFile,
    gatsbyNodeApi: { createNodeId, createContentDigest }
  } = props;

  const { name: parentName, id: parentId } = parentFile;

  const { paths, info } = api;

  const pathNames = Object.keys(paths);

  const pathNodes = pathNames.map(pathName => {
    const pathObject = paths[pathName];

    const operationVerbs = Object.keys(pathObject)

    const operations = operationVerbs.map(verb => {
      const operationObject = pathObject[verb]
      return {
        verb,
        ...operationObject,
      }
    })

    return {
      name: pathName,
      operations: operations,
      id: createNodeId(`${parentName} ${pathName}`),
      children: [],
      parent: parentId,
      internal: {
        content: "",
        contentDigest: createContentDigest(pathObject),
        type: PATH_NODE_TYPE,
      },
    }
  })

  return pathNodes;
}

exports.createDefinitionNodes = props => { }

exports.createTagNodes = props => { }
