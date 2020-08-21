
const DEFINITION_NODE_TYPE = "SwaggerOpenApiDefinition";

/**
 * Creates a list of definition nodes from a parsed swagger object.
 * In the swagger object, definition objects are mapped using the name as the key.
 * Instead of a map, this function returns an array of those definition objects.
 *
 * @see {@link https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#swagger-object}
 *
 * @param {Object} props
 * @param {SwaggerObject} props.swaggerObject A parsed swagger object
 * @param {File} props.parentFile File node object where this data was parsed from
 * @param {GatsbyApiFunctions} props.gatsbyApi  Object containing functions from the Gatsby API
 *
 * @returns {Array<DefinitionNode>}
 */
const createDefinitionNodes = props => { 
  const {
    swaggerObject,
    parentFile,
    gatsbyApi: { createNodeId, createContentDigest },
  } = props

  const { name: parentName, id: parentId } = parentFile;

  const { definitions } = swaggerObject;

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

module.exports = createDefinitionNodes;

/** JSDoc type definitions */

/**
 * Object containing functions from the Gatsby API
 * 
 * @typedef {Object} GatsbyApiFunctions
 *
 * @property {Function} createNodeId Function for generating a unique node id from a string
 * @property {Function} createContentDigest Function for generating a unique hash from data
 *
 * @see {@link https://www.gatsbyjs.com/docs/node-api-helpers/#createNodeId}
 * @see {@link https://www.gatsbyjs.com/docs/node-api-helpers/#createContentDigest}
 */

/**
 * Object containing data for a definition node.
 * It also contains metadata properties required to add this node to GraphQL.
 * 
 * @typedef {Object} DefinitionNode
 * 
 * @property {String} name The definition name. This is the definitionsObject property this data
 * is associated with.
 * @property {Object} schema The actual data content of the definition node
 * 
 * @see {@link https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#definitionsObject}
 * @see {@link https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#schemaObject}
 */
