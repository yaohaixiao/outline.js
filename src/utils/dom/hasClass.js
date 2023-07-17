/**
 * 检测 DOM 节点是否包含名为 className 的样式
 * ========================================================================
 * @method hasClass
 * @param {HTMLElement|Object} el - DOM 节点
 * @param {String} className - 样式名称
 * @returns {*}
 */
const hasClass = (el, className) => {
  let allClass = el.className

  if (!allClass) {
    return false
  }

  return allClass.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}

export default hasClass
