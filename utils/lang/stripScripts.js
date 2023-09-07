/**
 * 移除字符串中的 JavaScript 代码
 * ====================================================
 * @param {String} str
 * @returns {String}
 */
const stripScripts = (str) => {
  return str.replace(/<script[^>]*>.*?<\/script>/gi, '')
}

export default stripScripts
