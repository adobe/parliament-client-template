const PATH_NODE_TYPE = "SwaggerOpenApiPath"

const VALID_OPERATION_VERBS = [
  "get",
  "post",
  "put",
  "delete",
  "options",
  "head",
  "patch",
]

/**
 * Creates a list of path nodes from a parsed swagger object
 *
 * @see https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#swagger-object
 *
 * @param {Object} props
 * @param {SwaggerObject} props.swaggerObject A parsed swagger object
 * @param {File} props.parentFile File node object where this data was parsed from
 * @param {GatsbyApiFunctions} props.gatsbyApi  Object containing functions from the Gatsby API
 *
 * @returns {Array<PathNode>}
 */
const createPathNodes = props => {
  const {
    swaggerObject,
    parentFile,
    gatsbyApi: { createNodeId, createContentDigest },
  } = props

  const { name: parentName, id: parentId } = parentFile

  const { paths } = swaggerObject

  const pathNames = Object.keys(paths)

  const pathNodes = pathNames.map(pathName => {
    const pathObject = paths[pathName]

    /**
     * The keys in the pathObject contains the operation verbs.
     * It also contains keys which are not operation verbs,
     * so we need to use a filter to get a correct list of values.
     */
    const operationVerbs = Object.keys(pathObject).filter(property =>
      VALID_OPERATION_VERBS.includes(property)
    )

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

  return pathNodes
}

module.exports = createPathNodes

/** JSDocs type definitions */

/**
 * Object containing functions from the Gatsby API
 * 
 * @typedef {Object} GatsbyApiFunctions
 *
 * @property {Function} createNodeId Function for generating a unique node id from a string
 * @property {Function} createContentDigest Function for generating a unique hash from data
 *
 * @see https://www.gatsbyjs.com/docs/node-api-helpers/#createNodeId
 * @see https://www.gatsbyjs.com/docs/node-api-helpers/#createContentDigest
 */

/**
 * Object containing path data.
 * In the parsed swagger object, the operation objects are accessed from the swagger object
 * using the verb as the key.
 * In this node object, the operation objects are stored as an array to make it
 * friendlier to query in GraphQL.
 * 
 * @typedef {Object} PathNode
 *
 * @property {String} name The name of the path
 * @property {Array<PathOperation>} operations The operations available for this path
 * 
 * @see https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#pathsObject
 */

/**
 * Object containing path operation data.
 * It contains the name of the verb and rest of the Operation Object properties
 * as defined in the swagger spec.
 * @typedef {Object} PathOperation
 *
 * @property {('get'|'post'|'put'|'delete'|'options'|'head'|'patch')} verb Operation verb
 * 
 * @see https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#pathItemObject
 * @see https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#operationObject
 */
