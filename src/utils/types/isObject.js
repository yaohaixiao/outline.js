import toString from '../lang/toString'

/**
 * 检测数据是否为 Object 类型
 * ========================================================================
 * @method isObject
 * @param {*} o
 * @returns {boolean}
 */
const isObject = (o) => {
  return toString.apply(o) === '[object Object]' && o !== null
}

export default isObject
