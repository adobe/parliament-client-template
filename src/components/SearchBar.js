/** @jsx jsx */
import { jsx } from "@emotion/core"
import Search from "@react/react-spectrum/Search"
import Magnifier from "@react/react-spectrum/Icon/Magnify"

const SearchBar = props => {
  const gitRemote = props.gitRemote
  const searchUrl = `${gitRemote.protocol}://${gitRemote.resource}/${gitRemote.full_name}/search?q=`
  return (
    <Search
      aria-label="Search"
      icon={<Magnifier data-testid="searchicon" />}
      placeholder="Enter text"
      onSubmit={e => (document.location.href = `${searchUrl}${e}`)}
    />
  )
}

export default SearchBar
