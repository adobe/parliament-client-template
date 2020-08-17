const path = require('path')
const glob = require("fast-glob")

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
    });
    //const api = await SwaggerParser.parse(path.resolve('./src/data/magento-admin.json'))

    //console.log(api.paths);

}