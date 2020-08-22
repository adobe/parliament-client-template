const path = require('path');

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const patterns = process.env.GATSBY_SOURCE_PATTERNS.split(",")

module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-git`,
      options: {
        name: ``,
        remote: `${process.env.GATSBY_SOURCE}`,
        // Optionally supply a branch. If none supplied, you'll get the default branch.
        branch: `${process.env.GATSBY_SOURCE_BRANCH}`,
        // Tailor which files get imported eg. import the docs folder from a codebase.
        patterns: patterns,
      },
    },
    {
      resolve: `swagger-to-graphql-source`,
      options: {
        contentRoot: path.resolve(path.dirname(__dirname),'.cache/gatsby-source-git'),
        sourcePatterns: process.env.SWAGGER_SOURCE_PATTERNS
      },
    }
  ],
}
