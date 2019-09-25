import TreeDataSource from "@react/react-spectrum/TreeDataSource"

const data = [
  {
    label: "Test 1",
    url: "aaa",
    children: [
      {
        label: "Child 1",
        url: "bbb",
        children: [
          { label: "Sub Child 1", url: "ccc" },
          { label: "Sub Child 2" },
          { label: "Sub Child 3" },
          { label: "Sub Child 4" },
          { label: "Sub Child 5" },
          { label: "Sub Child 6" },
          { label: "Sub Child 7" },
          { label: "Sub Child 8" },
        ],
      },
      { label: "Child 2" },
    ],
  },
  { label: "Test 2" },
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
