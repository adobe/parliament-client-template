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
const projectRootDir = path.dirname(__dirname)

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  pathPrefix: `${process.env.GATSBY_SITE_PATH_PREFIX}`,
  siteMetadata: {
    title: `${process.env.GATSBY_SOURCE_TITLE}`,
    description: ``,
    author: `@adobedevs`,
    newton: `${process.env.NEWTON_URL}`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: "@adobe/gatsby-add-launch-script",
      options: {
        scriptUrl: `${process.env.GATSBY_LAUNCH_SRC}`,
        includeInDevelopment: false,
      },
    },
    {
      resolve: `gatsby-plugin-emotion`,
      options: {},
    },
    {
      resolve: `gatsby-transformer-yaml-full`,
      options: {
        typeName: `YamlFile`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${projectRootDir}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        path: `${projectRootDir}/src/markdown-pages`,
      },
    },
    {
      resolve: "gatsby-plugin-svgr-loader",
      options: {
        rule: {
          include: /images/,
        },
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `${projectRootDir}/src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `@adobe/gatsby-remark-afm`,
            options: {
              directory: `${
                process.env.NODE_ENV === `development`
                  ? `${projectRootDir}/src/content`
                  : `${projectRootDir}/.cache/gatsby-source-git/`
              }`,
            },
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              removeAccents: true,
              icon: false,
            },
          },
          `gatsby-plugin-catch-links`,
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
            },
          },
          {
            resolve: `gatsby-remark-copy-linked-files`,
            options: {
              ignoreFileExtensions: [`png`, `jpg`, `jpeg`, `bmp`, `tiff`, `md`],
            },
          },
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 970,
            },
          },
          `gatsby-remark-embedder`,
        ],
      },
    },
    {
      resolve: `@adobe/parliament-transformer-navigation`,
      options: {},
    },
  ],
}
