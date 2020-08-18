const path = require("path")

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const projectRootDir = path.dirname(__dirname)

module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `external`,
        path: `${projectRootDir}/src/content`,
      },
    },
    {
      resolve: `link-local-project`,
      options: {
        contentDir: `${projectRootDir}/src/content`,
        localProjectDir: process.env.LOCAL_PROJECT_DIRECTORY,
        patterns: process.env.GATSBY_SOURCE_PATTERNS,
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
