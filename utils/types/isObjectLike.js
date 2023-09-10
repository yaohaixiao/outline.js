import isObject from './isObject'

/**
 * 检测测试数据是否为类似 Object 类型
 * ========================================================================
 * @method isObjectLike
 * @param {Object} val - 要检测的数据
 * @returns {Boolean} 'val' 是类似 Object 类型，返回 true，否则返回 false
 */
const isObjectLike = (val) => {
  return isObject(val) && val !== null
}

export default isObjectLike
