const createDefinitionNodes = require("../createDefinitionNodes")
const SwaggerParser = require("@apidevtools/swagger-parser")

const path = require("path")

const DATA_PATH = path.resolve(__dirname, "data/swagger.json")

const parentFile = {
  relativePath: "parentFile.relativePath",
  id: "parentFile.id",
}
const createNodeId = jest.fn(data => data)
const createContentDigest = jest.fn(data => "HashString")

const gatsbyApi = {
  createNodeId,
  createContentDigest,
}

test("create definition nodes", async () => {
  const swaggerObject = await SwaggerParser.parse(DATA_PATH)

  const props = { swaggerObject, parentFile, gatsbyApi }

  const nodes = createDefinitionNodes(props)

  expect(nodes).toMatchSnapshot()
})
