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
        local: path.resolve(path.dirname(__dirname), 'src/content')
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `external`,
        path: `${path.resolve(path.dirname(__dirname))}/src/content`,
      },
    },
    {
      resolve: `swagger-to-graphql-source`,
      options: {
        contentRoot: path.resolve(path.dirname(__dirname),'src/content'),
        sourcePatterns: process.env.SWAGGER_SOURCE_PATTERNS
      },
    }
  ],
}
