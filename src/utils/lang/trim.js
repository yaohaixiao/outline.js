import isString from '../types/isString'

/**
 * 清楚字符串起始位置所有的空格
 * ========================================================================
 * @method trim
 * @param {string} str
 * @returns {string|Boolean}
 */
const trim = (str) => {
  if (!isString(str)) {
    return false
  }
  return str.replace(/(^\s+)|(\s+$)/g, '')
}

export default trim
