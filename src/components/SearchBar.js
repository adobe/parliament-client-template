/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import Search from "@react/react-spectrum/Search"
import Magnifier from "@react/react-spectrum/Icon/Magnify"

const SearchBar = () => {
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
      />
    </div>
  )
}

export default SearchBar
