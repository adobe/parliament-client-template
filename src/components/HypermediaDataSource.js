import TreeDataSource from "@react/react-spectrum/TreeDataSource"

class HypermediaDataSource extends TreeDataSource {
  constructor(data = []) {
    super()
    this._data = data
  }

  setData(data) {
    this.startTransaction()
    this._data = data
    this.endTransaction()
  }

  async getChildren(item) {
    if (!item) {
      return this._data
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
