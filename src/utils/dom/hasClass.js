/**
 * 检测 DOM 节点是否包含名为 className 的样式
 * ========================================================================
 * @method hasClass
 * @param {HTMLElement|Object} el - DOM 节点
 * @param {String} className - 样式名称
 * @returns {Boolean}
 */
const hasClass = (el, className) => {
  const pattern = new RegExp('(\\s|^)' + className + '(\\s|$)')
  const allClass = el.className
  const classList = el.classList

  if (!allClass) {
    return false
  }

  if (classList?.contains) {
    return el.classList.contains(className)
  }

  return !!allClass.match(pattern)
}

export default hasClass
