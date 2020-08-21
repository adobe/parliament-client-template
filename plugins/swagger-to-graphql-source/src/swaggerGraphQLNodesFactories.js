const PATH_NODE_TYPE = "SwaggerOpenApiPath"
const DEFINITION_NODE_TYPE = "SwaggerOpenApiDefinition";

exports.createPathNodes = props => {
  const {
    api,
    parentFile,
    gatsbyNodeApi: { createNodeId, createContentDigest }
  } = props;

  const { name: parentName, id: parentId } = parentFile;

  const { paths } = api;

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

exports.createDefinitionNodes = props => { 
  const {
    api,
    parentFile,
    gatsbyNodeApi: { createNodeId, createContentDigest },
  } = props

  const { name: parentName, id: parentId } = parentFile;

  const { definitions } = api;

  const definitionNames = Object.keys(definitions);

  const definitionNodes = definitionNames.map(name => {
    const schemaObject = definitions[name];
    return {
      name,
      schema: schemaObject,
      id: createNodeId(`${parentName} ${name}`),
      children: [],
      parent: parentId,
      internal: {
        content: "",
        contentDigest: createContentDigest(schemaObject),
        type: DEFINITION_NODE_TYPE,
      },
    }
  }) 

  return definitionNodes;
}