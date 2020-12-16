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

/** @jsx jsx */
import { css, jsx } from "@emotion/react"
import { Link, graphql } from "gatsby"

import { View } from "@adobe/react-spectrum"
import {
  Footer,
  Grid,
  GridNav,
  GridContent,
  GridFooter,
  GridHeader,
  Heading1,
} from "@adobe/parliament-ui-components"

import DocLayout from "../components/doclayout"
import SEO from "../components/seo"
import SiteMenu from "../components/SiteMenu"
import HeaderBar from "../components/HeaderBar"

import "../components/layout.css"

const compare = (a, b) => {
  const idA = a.login.toLowerCase()
  const idB = b.login.toLowerCase()

  let comparison = 0
  if (idA > idB) {
    comparison = 1
  } else if (idA < idB) {
    comparison = -1
  }
  return comparison
}

const Authors = props => {
  const { data, location, pageContext } = props
  const siteTitle = data.site.siteMetadata.title
  const { authors, pages, gitRemote } = pageContext

  return (
    <DocLayout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Grid>
        <GridHeader>
          <HeaderBar location={location} siteTitle={siteTitle} pages={pages} />
        </GridHeader>
        <GridNav className="spectrum--light">
          <SiteMenu
            currentPage={props.location.pathname}
            pages={pages}
            gitRemote={gitRemote}
          />
        </GridNav>
        <GridContent
          css={css`
            background-color: white;
          `}
        >
          <div
            css={css`
              @media screen and (min-width: 1201px) {
                display: none;
              }
              @media screen and (max-width: 1200px) {
                float: right;
              }
            `}
          ></div>
          <Heading1>Authors</Heading1>
          <View marginTop="size-300">
            {authors.sort(compare).map((author, index) => (
              <p>
                <Link
                  to={`/author/${author.login}`}
                  key={`author-${author.login}`}
                >
                  {author.name}
                </Link>
              </p>
            ))}
          </View>
        </GridContent>
        <GridFooter>
          <Footer />
        </GridFooter>
      </Grid>
    </DocLayout>
  )
}

export default Authors

export const pageQuery = graphql`
  query AuthorsQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
