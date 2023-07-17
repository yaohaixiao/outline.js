/**
 * 获取 options 节点下匹配 selector 选择器的 DOM 节点
 * ========================================================================
 * Element.matches() 方法可以用来判断 DOM 元素是否与给定的选择器匹配，事件代理判断是
 * 否触发绑定的代理事件回调函数，关键就是使用 Element.matches() 辨别当前事件触发的目
 * 标 DOM 元素是否为事件代理所期望触发的目标。
 * ========================================================================
 * @method matches
 * @see https://developer.mozilla.org/en-US/docs/web/api/element/matches
 * @param {HTMLElement} el - （必须）DOM 元素
 * @param {String} selector - （必须）匹配 DOM 元素的选择器
 * @returns {Boolean}
 */
const matches = (el, selector = '') => {
  const sel = selector.replace(/^>/i, '')

  if (!selector || !sel || !el) {
    return false
  }

  /* istanbul ignore else */
  if (el.matches) {
    return el.matches(sel)
  } else if (el.msMatchesSelector) {
    return el.msMatchesSelector(sel)
  } else {
    return false
  }
}

export default matches
