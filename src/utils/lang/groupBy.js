/**
 * 给对象的属性通过 prop 属性分组
 * ========================================================================
 * @method groupBy
 * @param {Array} list
 * @param {String} prop
 * @return {Array}
 */
const groupBy = (list, prop) => {
  const groups = {}
  const cb = (o) => {
    return [o[prop]]
  }

  list.forEach((o) => {
    const group = JSON.stringify(cb(o))

    groups[group] = groups[group] || []
    groups[group].push(o)
  })

  return Object.keys(groups).map((group) => {
    return groups[group]
  })
}

export default groupBy
