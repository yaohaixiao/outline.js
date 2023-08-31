/**
 * 在某些情况下，某些浏览器（例如：Safari 浏览器）会返回实际的目标元素内部的文本节点。
 * resolveTextNode() 方法则会返回实际的目标节点。
 * ========================================================================
 * @method resolveTextNode
 * @param {HTMLElement|Text} el - 要解析的节点
 * @return {*|HTMLElement} - 实际的目标 DOM 节点
 */
const resolveTextNode = function (el) {
  if (el && el.nodeType === 3) {
    return el.parentNode
  }

  return el
}

export default resolveTextNode
