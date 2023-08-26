import isArray from '../types/isArray'

/**
 * 深拷贝对象函数
 * ========================================================================
 * @methods cloneDeep
 * @param {Object} obj - 深拷贝的对象
 * @returns {Array|Object|*}
 *
 * @example
 * const arr = cloneDeep([2,3,4,6])
 * => [2,3,4,6]
 */
const cloneDeep = (obj) => {
  let clone

  if (obj === null) {
    return null
  }

  clone = Object.assign({}, obj)

  Object.keys(clone).forEach((key) => {
    return (clone[key] =
      typeof obj[key] === 'object' ? cloneDeep(obj[key]) : obj[key])
  })

  if (isArray(obj)) {
    clone.length = obj.length

    return Array.from(clone)
  }

  return clone
}

export default cloneDeep
