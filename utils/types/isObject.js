import toString from '../lang/toString'
import isFunction from './isFunction'

/**
 * 检测数据是否为 Object 类型
 * ========================================================================
 * @method isObject
 * @param {*} o
 * @returns {boolean}
 */
const isObject = (o) => {
  return (
    (toString(o) === '[object Object]' ||
      typeof o === 'object' ||
      isFunction(o)) &&
    o !== null
  )
}

export default isObject
