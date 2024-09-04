import toString from '@/utils/lang/toString'

/**
 * 检测数据是否为 Array 类型
 * ========================================================================
 * @method isArray
 * @param {*} o
 * @returns {boolean}
 */
const isArray = (o) => {
  if (Array.isArray) {
    return Array.isArray(o)
  } else {
    return toString(o) === '[object Array]'
  }
}

export default isArray
