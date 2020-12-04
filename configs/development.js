/**
 *  Copyright 2020 Adobe. All rights reserved.
 *  This file is licensed to you under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License. You may obtain a copy
 *  of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software distributed under
 *  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 *  OF ANY KIND, either express or implied. See the License for the specific language
 *  governing permissions and limitations under the License.
 */

const path = require("path")
const GitUrlParse = require(`git-url-parse`)

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const projectRootDir = path.dirname(__dirname)
const gitInfo = GitUrlParse(process.env.GATSBY_SOURCE)
const apiUrl =
  gitInfo.source === `github.com`
    ? `https://api.github.com/graphql`
    : `https://git.corp.adobe.com/api/graphql`

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
          owner: gitInfo.owner,
          name: gitInfo.name,
          branch: process.env.GATSBY_SOURCE_BRANCH,
          api: apiUrl,
        },
      },
    },
  ],
}
