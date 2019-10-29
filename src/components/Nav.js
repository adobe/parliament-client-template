import React from "react"
import "regenerator-runtime/runtime"
import { navigate } from "gatsby"
import Heading from "@react/react-spectrum/Heading"
import { SideNav, SideNavItem } from "@react/react-spectrum/SideNav"
import Folder from "@react/react-spectrum/Icon/Folder"
import WebPage from "@react/react-spectrum/Icon/WebPage"

const nav = data => {
  return data.map((node, index) => {
    return (
      <SideNavItem
        key={index}
        aria-current="page"
        isNested={false}
        disabled={false}
        defaultExpanded={true}
        icon={!node.children ? <WebPage /> : <Folder />}
        onClick={() => {
          if (node.url) navigate(node.url)
        }}
        label={node.label}
        target="_self"
        value={node.label}
      >
        {node.children ? nav(node.children) : ""}
      </SideNavItem>
    )
  })
}

const defaultFocus = data => {
  for (let page of data) {
    if (page.url === document.location.pathname) {
      console.log("returning " + page.label)
      return page.label
    } else if (page.children) {
      return defaultFocus(page.children)
    }
  }
}

const Nav = ({ data }) => {
  return (
    <nav>
      <Heading variant="subtitle3">Topics</Heading>
      <SideNav
        autoFocus={true}
        defaultValue={defaultFocus(data)}
        isNested={false}
        manageTabIndex={false}
        typeToSelect
        variant="multiLevel"
      >
        {nav(data)}
      </SideNav>
    </nav>
  )
}

export default Nav
