import hasClass from './hasClass'

/**
 * 给 DOM 节点添加名为 className 的样式
 * ========================================================================
 * @method addClass
 * @param {HTMLElement|Object} el - DOM 节点
 * @param {String} className - 样式名称
 * @returns {Boolean}
 */
const addClass = (el, className) => {
  let allClass = el.className

  if (hasClass(el, className)) {
    return false
  }

  allClass += allClass.length > 0 ? ' ' + className : className

  el.className = allClass
}

export default addClass
