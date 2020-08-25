const INFO_NODE_TYPE = "SwaggerOpenApiInfo"

/**
 * Creates an info node from a parsed swagger object
 *
 * @see https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#swagger-object
 *
 * @param {Object} props
 * @param {SwaggerObject} props.swaggerObject A parsed swagger object
 * @param {File} props.parentFile File node object where this data was parsed from
 * @param {GatsbyApiFunctions} props.gatsbyApi  Object containing functions from the Gatsby API
 *
 * @returns {InfoNode}
 */
const createInfoNode = props => {
  const {
    swaggerObject,
    parentFile,
    gatsbyApi: { createNodeId, createContentDigest },
  } = props

  const {
    info,
    swagger,
    host,
    basePath,
    schemes,
    consumes,
    produces,
    tags,
  } = swaggerObject

  const { id: parentId, relativePath } = parentFile

  return {
    ...info,
    swagger,
    host,
    basePath,
    schemes,
    consumes,
    produces,
    tags,
    id: createNodeId(`${relativePath} ${info.title} ${info.version}`),
    name: `${relativePath}`,
    children: [],
    internal: {
      content: "",
      contentDigest: createContentDigest(info),
      type: INFO_NODE_TYPE,
    },
    parent: parentId,
  }
}

module.exports = createInfoNode

/** JSDocs type definitions */

/**
 * Object containing functions from the Gatsby API
 * @typedef {Object} GatsbyApiFunctions
 *
 * @property {Function} createNodeId Function for generating a unique node id from a string
 * @property {Function} createContentDigest Function for generating a unique hash from data
 *
 * @see https://www.gatsbyjs.com/docs/node-api-helpers/#createNodeId
 * @see https://www.gatsbyjs.com/docs/node-api-helpers/#createContentDigest
 */

/**
 * Node data to add to GraphQL.
 * It contains the swagger object's Info object along with some root level properties.
 * It also includes meta data required for creating the node in Gatsby.
 *
 * @typedef {Object} InfoNode
 *
 * @see https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#swagger-object
 * @see https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#infoObject
 */
