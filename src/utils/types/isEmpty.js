import isString from './isString'
/**
 * 检测数据是否为空字符串
 * ========================================================================
 * @method isEmpty
 * @param {String} str
 * @returns {boolean}
 */
const isEmpty = (str) => {
  return isString(str) && str === ''
}

export default isEmpty
