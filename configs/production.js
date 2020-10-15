const path = require("path")
const GitUrlParse = require(`git-url-parse`)

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const gitInfo = GitUrlParse(process.env.GATSBY_SOURCE)
const apiUrl =
  gitInfo.source === `github.com`
    ? `https://api.github.com/graphql`
    : `https://git.corp.adobe.com/api/graphql`
const patterns = process.env.GATSBY_SOURCE_PATTERNS.replace(/ /g, "").split(",")

const contentSourcePath = path.resolve(
  path.dirname(__dirname),
  ".cache/gatsby-source-git"
)

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
        contentRoot: contentSourcePath,
        sourcePatterns: process.env.SWAGGER_SOURCE_PATTERNS,
      },
    },
    {
      resolve: `@adobe/gatsby-source-github-file-contributors`,
      options: {
        pages: {
          root: "", // root of the page paths (below) in the Github repo
          paths: [".cache/gatsby-source-git"], // relative path of the pages from the config
          extensions: ["md", "mdx"], // page extensions to filter for
          prefix: ".cache/gatsby-source-git",
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
