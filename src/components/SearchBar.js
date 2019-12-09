/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import Search from "@react/react-spectrum/Search"
import Magnifier from "@react/react-spectrum/Icon/Magnify"

const SearchBar = props => {
  const gitRemote = props.gitRemote
  const searchUrl = `${gitRemote.protocol}://${gitRemote.resource}/${gitRemote.full_name}/search?q=`
  return (
    <div
      css={css`
        width: 256px;
        margin-top: 24px;
      `}
    >
      <Search
        icon={<Magnifier data-testid="searchicon" />}
        placeholder="Enter text"
        onSubmit={e => (document.location.href = `${searchUrl}${e}`)}
      />
    </div>
  )
}

export default SearchBar
