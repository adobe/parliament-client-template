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

  const { name, id: parentId } = parentFile;

  const { paths, info } = api;

  const pathNames = Object.keys(paths);

  const pathNodes = pathNames.map(pathName => {
    console.log(paths[pathName]); 

    const operations = Object.keys(paths[pathName])

    console.log(operations);

    return {
      name: pathName,
      operations: operations
    }
  })
/*
  return {
    ...paths,
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
*/
  return pathNodes;
}

exports.createDefinitionNodes = props => {}

exports.createTagNodes = props => {}
