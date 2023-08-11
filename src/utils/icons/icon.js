import createElement from './createElement'

/**
 * 创建 SVG 图标 DOM 元素
 * ========================================================================
 * @method icon
 * @alias createElement
 * @see createElement
 * @param {String} name
 * @param {Object} [options]
 * @param {Number|Array} [options.size]
 * @param {String} [options.color]
 * @param {String} [options.iconSet]
 * @returns {HTMLElement}
 */
const icon = (name, options = {}) => {
  return createElement(name, options)
}

export default icon
