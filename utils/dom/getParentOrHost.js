/**
 * 获取 DOM 元素的父节点
 * ========================================================================
 * @method getParentOrHost
 * @param {*|HTMLElement} el - （必须）要获取父节点的 DOM 元素
 * @returns {*|HTMLElement}
 */
const getParentOrHost = (el) => {
  return el.host && el !== document && el.host.nodeType
    ? el.host
    : el.parentNode
}

export default getParentOrHost
