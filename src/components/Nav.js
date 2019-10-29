import React, { useEffect, useState, Fragment } from "react"
import "regenerator-runtime/runtime"
import { navigate } from "gatsby"
import Heading from "@react/react-spectrum/Heading"
import Folder from "@react/react-spectrum/Icon/Folder"
import Layers from "@react/react-spectrum/Icon/Layers"
import WebPage from "@react/react-spectrum/Icon/WebPage"

import { TreeView, TreeViewDataSource } from "@react/react-spectrum/TreeView"
import HypermediaDataSource from "../components/HypermediaDataSource"

const renderItem = (showIcons, item) => {
  // return item.item.label ? item.item.label : item.label
  let icon = item.hasChildren ? <Folder size="S" /> : <WebPage size="S" />
  return (
    <span id={item.item.label}>
      {showIcons ? icon : null}
      {item.item.label ? item.item.label : item.label}
    </span>
  )
}

const hmds = new HypermediaDataSource()
const tvds = new TreeViewDataSource(hmds)

const Nav = ({ data }) => {
  useEffect(() => {
    hmds.setData(data)
    tvds.loadData()
  }, [])

  const [selectedItem, setSelectedItem] = useState({
    label: "Test 1",
    url: "/hypermedia/overview/",
    children: [{ label: "Child 1" }, { label: "Child 2" }],
  })

  return (
    <nav>
      <Heading variant="subtitle3">Topics</Heading>
      <TreeView
        dataSource={tvds}
        renderItem={renderItem}
        onSelectionChange={item => {
          console.log(JSON.stringify(item))
          console.log("selected change")
          if (Array.isArray(item)) {
            let page = item[0]
            console.log(page)
            if (page && page.url) {
              navigate(page.url)
            } else if (page) {
              setSelectedItem(page)
              tvds.toggleItem(page)
            } else {
              tvds.toggleItem(selectedItem)
            }
          }
        }}
        allowsSelection
      />
    </nav>
  )
}

export default Nav
