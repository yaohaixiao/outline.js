import isObject from '../../utils/types/isObject'
import isArray from '../../utils/types/isArray'

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
  let clone = {}

  if (obj === null) {
    return null
  }

  if (isArray(obj)) {
    clone = Array.from(obj)
  } else {
    clone = Object.assign({}, obj)
    Object.keys(clone).forEach((key) => {
      return (clone[key] = isObject(obj[key]) ? cloneDeep(obj[key]) : obj[key])
    })
  }

  return clone
}

export default cloneDeep
