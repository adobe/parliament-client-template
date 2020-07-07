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
import { SearchField } from "@react-spectrum/searchfield"
import Magnifier from "@spectrum-icons/workflow/Magnify"

const SearchBar = props => {
  const gitRemote = props.gitRemote
  const searchUrl = `${gitRemote.protocol}://${gitRemote.resource}/${gitRemote.full_name}/search?q=`
  return (
    <SearchField
      aria-label="Search"
      icon={<Magnifier />}
      placeholder="Enter text"
      onSubmit={e => (document.location.href = `${searchUrl}${e}`)}
    />
  )
}

export default SearchBar
