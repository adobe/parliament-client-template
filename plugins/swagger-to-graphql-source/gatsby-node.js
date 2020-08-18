const path = require('path')
const glob = require("fast-glob")
const SwaggerParser = require("@apidevtools/swagger-parser");

exports.sourceNodes = async ({
    actions,
    createContentDigest,
    createNodeId,
    getNodesByType,
}, pluginOptions) => {

    const { createNode, createParentChildLink } = actions

    const fileNodes = getNodesByType('File');

    console.log(pluginOptions);

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

        SwaggerParser.parse(filePath)
            .then(api => {
                const { info } = api;

                const infoNode = {
                    ...info,
                    id: createNodeId(`${name} ${info.title} ${info.version}`),
                    name: name,
                    children: [],
                    internal: {
                        content: "",
                        contentDigest: createContentDigest(info),
                        type: "SwaggerOpenApiInfo",
                    },
                    parent: fileNode.id
                }

                createNode(infoNode)
                createParentChildLink({ parent: fileNode, child: infoNode })
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
  `
  createTypes(typeDefs)
}