/**
 * 转义字符串中的 HTML 标签
 *
 * @param {String} str - 需要转义的字符串
 * @returns {String}
 */
const encodeHTML = (str) => {
  const CHARTS = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }

  return str.replace(/[&<>'"]/g, (tag) => {
    return CHARTS[tag] || tag
  })
}

export default encodeHTML
