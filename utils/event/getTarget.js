import resolveTextNode from '@/utils/dom/resolveTextNode'

/**
 * 返回触发事件的 target DOM 元素
 * ========================================================================
 * @method getTarget
 * @param {Event} evt - Event 对象
 * @return {HTMLElement} - Event 对象的 target DOM 元素
 */
const getTarget = function (evt) {
  const target = evt.target

  return resolveTextNode(target)
}

export default getTarget
