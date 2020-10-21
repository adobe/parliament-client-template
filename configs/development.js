const path = require("path")
const GitUrlParse = require(`git-url-parse`)

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const projectRootDir = path.dirname(__dirname)
const gitInfo = GitUrlParse(process.env.GATSBY_SOURCE)
const apiUrl =
  gitInfo.source === `github.com` ? `https://api.github.com/graphql` : `https://git.corp.adobe.com/api/graphql`

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
      resolve: `markdown-cleaner`,
      options: {
        contentDir: `${projectRootDir}/src/content`,
        optionalTags: ["<em>"],
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
          owner: gitInfo.owner,
          name: gitInfo.name,
          branch: process.env.GATSBY_SOURCE_BRANCH,
          api: apiUrl,
        },
      },
    },
  ],
}
