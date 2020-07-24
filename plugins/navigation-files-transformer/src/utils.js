const { GraphQLJSON } = require("gatsby/graphql")

const reduceGraphQLToJson = nodes => {
  return nodes
    .map(({ id, parent, children, internal, ...rest }) => Object.keys(rest))
    .reduce((a, f) => a.concat(f), [])
    .reduce((o, name) => ({ ...o, [name]: GraphQLJSON }), {})
}

module.exports = reduceGraphQLToJson
