import TreeDataSource from "@react/react-spectrum/TreeDataSource"

const data = [
  {
    label: "Overview",
    url: "/hypermedia/overview",
  },
  {
    label: "Cache",
    url: "/hypermedia/cache",
  },
  {
    label: "Store",
    url: "/hypermedia/store",
    children: [
      {
        label: "Users",
        url: "/hypermedia/users",
        children: [{ label: "User", url: "/hypermedia/user" }],
      },
      { label: "User Accessess", url: "/hypermedia/user_accessess" },
      {
        label: "Carts",
        url: "/hypermedia/carts",
        children: [{ label: "Cart", url: "/hypermedia/cart" }],
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
