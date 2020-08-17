const path = require('path')
const glob = require("fast-glob")
const SwaggerParser = require("@apidevtools/swagger-parser");

exports.sourceNodes = async ({
    actions,
    createContentDigest,
    createNodeId,
    getNodesByType,
}, pluginOptions) => {

    const { createNode } = actions

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

        console.log(fileInfo);

        const { dir, base } = fileInfo
        const filePath = path.resolve(contentRoot, dir, base);

        console.log(filePath);

        SwaggerParser.parse(filePath)
            .then(api => {
                console.log(api);

            })

    });

}