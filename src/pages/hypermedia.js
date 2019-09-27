import React, { useState } from "react"
import "regenerator-runtime/runtime"
import { withPrefix } from "gatsby"
// import Link from "@react/react-spectrum/Link"
import Heading from "@react/react-spectrum/Heading"
import Folder from "@react/react-spectrum/Icon/Folder"
import Layers from "@react/react-spectrum/Icon/Layers"
import { TreeView, TreeViewDataSource } from "@react/react-spectrum/TreeView"

import HypermediaLayout from "../components/hypermedialayout"
import HypermediaDataSource from "../components/HypermediaDataSource"
import SEO from "../components/seo"

const renderItem = (showIcons, item) => {
  // return item.item.label ? item.item.label : item.label
  let icon = item.hasChildren ? <Folder size="S" /> : <Layers size="S" />
  return (
    <span id={item.item.label}>
      {showIcons ? icon : null}
      {item.item.label ? item.item.label : item.label}
    </span>
  )
}

const tvds = new TreeViewDataSource(new HypermediaDataSource())

const Hypermedia = () => {
  const [selectedItem, setSelectedItem] = useState({
    label: "Test 1",
    url: "/hypermedia/overview/",
    children: [{ label: "Child 1" }, { label: "Child 2" }],
  })
  return (
    <HypermediaLayout>
      <SEO title="Hypermedia Example" />
      <Heading>Hypermedia Example</Heading>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ width: "25%", height: "60vh" }}>
          <TreeView
            dataSource={tvds}
            renderItem={renderItem}
            onSelectionChange={item => {
              console.log(item)
              console.log("selected change")
              if (Array.isArray(item)) {
                console.log(item[0])
                if (item[0]) {
                  setSelectedItem(item[0])
                  tvds.toggleItem(item[0])
                } else {
                  tvds.toggleItem(selectedItem)
                }
              }
            }}
            allowsSelection
          />
        </div>
        <div style={{ width: "75%" }} id="content">
          <iframe
            src={withPrefix(selectedItem.url)}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>
    </HypermediaLayout>
  )
}

export default Hypermedia
