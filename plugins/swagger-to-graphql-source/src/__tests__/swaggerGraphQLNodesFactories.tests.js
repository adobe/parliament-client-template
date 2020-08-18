const { createInfoNode } = require("../swaggerGraphQLNodesFactories")
const SwaggerParser = require("@apidevtools/swagger-parser")

const path = require("path")

const DATA_PATH = path.resolve(__dirname, "data/swagger.json")

const parentFile = {
    name: "parentFile.name",
    id: "parentFile.id"
}
const createNodeId = jest.fn(data => data)
const createContentDigest = jest.fn((data) => {})

const gatsbyNodeApi = {
  createNodeId,
  createContentDigest,
}

test("create info node", async () => {
  const api = await SwaggerParser.parse(DATA_PATH)

  const props = { api, parentFile, gatsbyNodeApi }

  const nodeData = createInfoNode(props)

  expect(nodeData).toMatchSnapshot()
})
