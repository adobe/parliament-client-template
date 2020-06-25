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
