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
import { SearchField } from "@adobe/parliament-ui-components"

const Search = ({ searchIndex, gitRemote }) => {
  const [index, setIndex] = useState(Index.load(searchIndex))

  const search = searchTerm => {
    console.log(searchTerm)
    const results = index
      .search(searchTerm, { expand: true })
      // Map over each ID and return the full document
      .map(({ ref }) => {
        return index.documentStore.getDoc(ref)
      })
    console.log(results)
    navigate("/searchResults/", {
      state: { results },
    })
    /*
    this.setState({
      query,
      // Query the index with search string to get an \[\] of IDs
      results: this.index
        .search(query, { expand: true })
        // Map over each ID and return the full document
        .map(({ ref }) => {
          return this.index.documentStore.getDoc(ref)
        }),
    })
    */
  }

  return (
    <SearchField
      onSubmit={searchTerm => {
        search(searchTerm)
      }}
    />
  )
}

export default Search
