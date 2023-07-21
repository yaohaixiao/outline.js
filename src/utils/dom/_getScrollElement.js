import isString from '../types/isString'
import isElement from '../types/isElement'

/**
 * 通过给的 scrollElement 参数，获取滚动 DOM 元素
 * ========================================================================
 * @method _getScrollElement
 * @param {String|HTMLElement} scrollElement
 * @returns {Element}
 * @private
 */
const _getScrollElement = (scrollElement = null) => {
  let $rootElements
  let $scrollElement

  if (!scrollElement) {
    $rootElements = document.querySelectorAll('html,body')
    $scrollElement =
      $rootElements[0].scrollTop - $rootElements[1].scrollTop >= 0
        ? $rootElements[0]
        : $rootElements[1]
  } else {
    if (isString(scrollElement)) {
      $scrollElement = document.querySelector(scrollElement)
    } else if (isElement(scrollElement)) {
      $scrollElement = scrollElement
    }
  }

  return $scrollElement
}

export default _getScrollElement
