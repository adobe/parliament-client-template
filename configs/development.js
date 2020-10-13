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
        patterns: process.env.GATSBY_SOURCE_PATTERNS.replace(/ /g, ""),
      },
    },
    {
      resolve: `swagger-to-graphql-source`,
      options: {
        contentRoot: path.resolve(path.dirname(__dirname), "src/content"),
        sourcePatterns: process.env.SWAGGER_SOURCE_PATTERNS,
      },
    },
    {
      resolve: `@adobe/gatsby-source-github-file-contributors`,
      options: {
        pages: {
          root: "", // root of the page paths (below) in the Github repo
          paths: ["src/content"], // relative path of the pages from the config
          extensions: ["md", "mdx"], // page extensions to filter for
          prefix: "src/content",
        },
        repo: {
          token: process.env.GATSBY_GIT_CORP_TOKEN,
          owner: "devrel",
          name: "analytics-2.0-apis",
          branch: "master",
          api: "https://git.corp.adobe.com/api/graphql",
        },
      },
    },
  ],
}
