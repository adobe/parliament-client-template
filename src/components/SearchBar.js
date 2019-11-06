import React from "react"
import Search from "@react/react-spectrum/Search"
import Magnifier from "@react/react-spectrum/Icon/Magnify"

const SearchBar = () => {
  return (
    <div style={{ width: "256px", marginTop: "24px" }}>
      <Search
        icon={<Magnifier data-testid="searchicon" />}
        placeholder="Enter text"
      />
    </div>
  )
}

export default SearchBar
