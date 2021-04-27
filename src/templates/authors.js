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
import React from "react"
import { graphql } from "gatsby"

import { Flex, View } from "@adobe/react-spectrum"
import { Heading1 } from "@adobe/parliament-ui-components"

import DocLayout from "../components/doclayout"
import Link from "../components/Link"
import SiteMenu from "../components/SiteMenu"

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

const Authors = ({ location, pageContext }) => {
  const { authors, pages, gitRemote } = pageContext

  return (
    <DocLayout
      location={location}
      title="All Posts"
      pages={pages}
      sideNav={
        <SiteMenu
          currentPage={location.pathname}
          pages={pages}
          gitRemote={gitRemote}
        />
      }
    >
      <Heading1>Authors</Heading1>
      <Flex direction="column" marginTop="size-300" gap="size-100">
        {authors.sort(compare).map((author) => (
          <View elementType="p">
            <Link to={`/author/${author.login}`} key={`author-${author.login}`}>
              {author.name}
            </Link>
          </View>
        ))}
      </Flex>
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
