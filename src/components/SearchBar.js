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
import { jsx } from "@emotion/core"
import { useState } from "react"

import "@spectrum-css/icon"
import "@spectrum-css/search"
import "@spectrum-css/textfield"
import "@spectrum-css/vars"

const SearchBar = props => {
  const gitRemote = props.gitRemote
  const [searchTerm, setSearchTerm] = useState("")
  const [searchUrl] = useState(
    `${gitRemote.protocol}://${gitRemote.resource}/${gitRemote.full_name}/search?q=`
  )

  return (
    <form
      className="spectrum-Search"
      onSubmit={e => {
        e.preventDefault()
        document.location.href = `${searchUrl}${searchTerm}`
      }}
    >
      <div className="spectrum-Textfield">
        <svg
          viewBox="0 0 36 36"
          className="spectrum-Icon spectrum-Textfield-icon"
          focusable="false"
          aria-hidden="true"
          role="img"
        >
          <path d="M33.173 30.215L25.4 22.443a12.826 12.826 0 1 0-2.957 2.957l7.772 7.772a2.1 2.1 0 0 0 2.958-2.958zM6 15a9 9 0 1 1 9 9 9 9 0 0 1-9-9z"></path>
        </svg>
        <input
          aria-label="search"
          type="search"
          placeholder="Search"
          name="search"
          value={searchTerm}
          className="spectrum-Textfield-input spectrum-Search-input"
          autocomplete="off"
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
    </form>
  )
}

export default SearchBar
