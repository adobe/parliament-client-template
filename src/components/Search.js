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
import { css, jsx } from "@emotion/core"
import { useState } from "react"
import { graphql, navigate, useStaticQuery, Link } from "gatsby"
import { Index } from "elasticlunr"
import { Heading, Text } from "@react-spectrum/text"
import {
  Item,
  Menu,
  Popover,
  SearchField,
} from "@adobe/parliament-ui-components"

import "./search.css"

const Search = ({ gitRemote, pages }) => {
  const { ParliamentSearchIndex } = useStaticQuery(
    graphql`
      query {
        ParliamentSearchIndex
      }
    `
  )

  const [index] = useState(Index.load(ParliamentSearchIndex))
  const [results, setResults] = useState([])
  const [items, setItems] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  const search = searchTerm => {
    const searchResults = index
      .search(searchTerm, { expand: true })
      .map(({ ref }) => {
        return index.documentStore.getDoc(ref)
      })

    setResults(searchResults)
    const docsResultMenuItems = [
      <Item>
        <h5>Docs</h5>
      </Item>,
    ]
    const apiResultMenuItems = [
      <Item>
        <h5>APIs</h5>
      </Item>,
    ]
    for (let result of searchResults) {
      let item = (
        <Link className="searchMenuLink" to={result.path}>
          <Item>{result.title}</Item>
        </Link>
      )
      if (result.type === "apis") {
        apiResultMenuItems.push(item)
      } else {
        docsResultMenuItems.push(item)
      }
    }
    let topResultMenuItems = []
    if (docsResultMenuItems.length > 1)
      topResultMenuItems.push(...docsResultMenuItems)
    if (apiResultMenuItems.length > 1)
      topResultMenuItems.push(...apiResultMenuItems)
    setItems(topResultMenuItems)
    if (searchTerm.length > 0) setIsOpen(true)
  }

  return (
    <div style={{ position: "relative" }}>
      <SearchField
        onClear={() => {
          setIsOpen(false)
          setItems([])
        }}
        onChange={searchTerm => {
          searchTerm.length > 0 ? search(searchTerm) : setIsOpen(false)
        }}
        onSubmit={() => {
          if (results.length > 0) {
            navigate(results[0].path)
          }
        }}
      />
      <Popover
        isOpen={isOpen}
        style={{
          position: "absolute",
          left: "0px",
          top: "32px",
          zIndex: "1000",
          width: "368px",
        }}
      >
        {results.length > 0 ? (
          <Menu>{items}</Menu>
        ) : (
          <div
            css={css`
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              margin-bottom: 64px;
              margin-top: 64px;
            `}
          >
            <Heading level={2}>No Results Found</Heading>
            <Text>
              <em>Try another search term.</em>
            </Text>
          </div>
        )}
      </Popover>
    </div>
  )
}

export default Search
