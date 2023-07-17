import isString from '../types/isString'

/**
 * 过滤所有 HTML 标签
 * ========================================================================
 * @method stripTags
 * @param {string} str
 * @returns {string}
 */
const stripTags = (str) => {
  if (!isString(str)) {
    return ''
  }
  return str.replace(/<\/?[^>]+(>|$)/g, '')
}

export default stripTags
