const path = require('path')
const glob = require("fast-glob")
const SwaggerParser = require("@apidevtools/swagger-parser");

const { createInfoNode, createPathNodes } = require('./src/swaggerGraphQLNodesFactories');

exports.sourceNodes = async ({
    actions,
    createContentDigest,
    createNodeId,
    getNodesByType,
}, pluginOptions) => {

    const { createNode, createParentChildLink } = actions

    const fileNodes = getNodesByType('File');

    const { contentRoot, sourcePatterns } = pluginOptions;

    const patternsArray = sourcePatterns.split(",")

    const globOptions = {
        cwd: contentRoot,
        nodir: true,
    }

    const fileResults = glob.sync(patternsArray, globOptions)

    fileResults.forEach(file => {
        const fileInfo = path.parse(file)

        const { dir, base, name } = fileInfo

        const filePath = path.resolve(contentRoot, dir, base);

        const fileNode = fileNodes.find(fileNode => fileNode.absolutePath === filePath);

        const gatsbyNodeApi = {
            createNodeId,
            createContentDigest,
        }

        SwaggerParser.parse(filePath)
            .then(api => {
                console.log(filePath);

                const infoNode = createInfoNode({ api, parentFile: fileNode, gatsbyNodeApi })

                createNode(infoNode)
                createParentChildLink({ parent: fileNode, child: infoNode })

                const pathNodes = createPathNodes({api, parentFile: fileNode, gatsbyNodeApi })

                pathNodes.forEach(pathNode => {
                    createNode(pathNode);
                    createParentChildLink({ parent: fileNode, child: pathNode})
                })
            })

    });

}

// PoC that you can roll up data into a single JSON object
// See: https://www.gatsbyjs.com/docs/schema-customization/
exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions
    const typeDefs = `
    type SwaggerOpenApiInfo implements Node {
      license: JSON
    }

    type SwaggerOpenApiPathOperations {
        parameters: JSON
        responses: JSON
    }
  `
    createTypes(typeDefs)
}