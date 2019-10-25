import TreeDataSource from "@react/react-spectrum/TreeDataSource"

const data = [
  {
    label: "Readme",
    url: "/README.md",
  },
  {
    label: "Postman",
    children: [
      {
        label: "Readme",
        url: "/postman/README.md",
      },
    ],
  },
]

class HypermediaDataSource extends TreeDataSource {
  async getChildren(item) {
    if (!item) {
      return data
    }

    return item.children || []
  }

  hasChildren(item) {
    return !!item.children
  }

  itemsForDrop(dropTarget, dataTransfer) {
    let files = Array.from(dataTransfer.files)
    if (files.length) {
      return files.map(file => ({ label: file.name }))
    }
  }

  isItemEqual(a, b) {
    return a.label === b.label
  }
}

export default HypermediaDataSource
