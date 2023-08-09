import isElement from '../types/isElement'
/**
 * 检测 DOM 节点是否包含名为 className 的样式
 * ========================================================================
 * @method hasClass
 * @param {HTMLElement} el - DOM 节点
 * @param {String} className - 样式名称
 * @returns {Boolean}
 */
const hasClass = (el, className) => {
  const pattern = new RegExp('(\\s|^)' + className + '(\\s|$)')
  let allClass
  let classList

  if (!isElement(el)) {
    return false
  }

  allClass = el.className

  if (!allClass) {
    return false
  }

  classList = el.classList

  if (classList?.contains) {
    return el.classList.contains(className)
  }

  return !!pattern.exec(allClass)
}

export default hasClass
