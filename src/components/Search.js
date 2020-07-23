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
import { navigate } from "gatsby"
import { Index } from "elasticlunr"
import {
  Item,
  Menu,
  Popover,
  SearchField,
} from "@adobe/parliament-ui-components"

//import Menu from "./Menu"
//import Popover from "./Popover"

const Search = ({ searchIndex, gitRemote }) => {
  const [index] = useState(Index.load(searchIndex))
  const [results, setResults] = useState([])
  const [items, setItems] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  const search = searchTerm => {
    const searchResults = index
      .search(searchTerm, { expand: true })
      .map(({ ref }) => {
        return index.documentStore.getDoc(ref)
      })
    console.log(searchResults)

    setResults(searchResults)
    const topResults = searchResults.slice(0, 5)
    setItems(topResults)
    if (searchResults.length > 0) setIsOpen(true)
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
          navigate("/searchResults/", {
            state: { results },
          })
        }}
      />
      <Popover
        isOpen={isOpen}
        style={{
          position: "absolute",
          left: "0px",
          top: "32px",
          zIndex: "1000",
        }}
      >
        <Menu items={items}>
          <Item isDivider />
          <Item>There are {results.length} matches</Item>
        </Menu>
      </Popover>
    </div>
  )
}

export default Search
