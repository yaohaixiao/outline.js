const toTree = (list, nodeKey, parentKey) => {
  const map = {}
  const roots = []

  list.forEach((item, i) => {
    // initialize the map
    map[item[nodeKey]] = i
    // initialize the children
    item.children = []
  })

  list.forEach((item) => {
    const node = list[map[item[parentKey]]]

    if (item[parentKey] !== -1) {
      // if you have dangling branches check that map[node.parentId] exists
      node.children.push(item)
    } else {
      roots.push(item)
    }
  })

  return roots
}

export default toTree
