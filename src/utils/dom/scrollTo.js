import easeInQuad from '../lang/easeInQuad'
import isFunction from '../types/isFunction'
import _getScrollElement from './_getScrollElement'

/**
 * 指定 rootElement DOM 节点滚动到指定 top 位置
 * ========================================================================
 * @method scrollTo
 * @param {HTMLElement|Object} [scrollElement] - （必须）要滚动的 DOM 节点
 * @param {Number} top - （必须）滚动的 scrollTop 数值
 * @param {Function} [afterStop] - （可选）滚动完成的回调函数
 */
const scrollTo = (scrollElement, top, afterStop) => {
  const $scrollElement = _getScrollElement(scrollElement)
  let scrollTop = $scrollElement.scrollTop
  let step = 0
  const distance = top - scrollTop
  const MAX_HEIGHT = $scrollElement.scrollHeight
  const MAX_TOP = top - MAX_HEIGHT <= 0 ? top : MAX_HEIGHT
  const stop = (top) => {
    if (isFunction(afterStop)) {
      afterStop(top)
    }

    return false
  }
  const play = () => {
    step += 1

    // 向上滚动
    if (distance < 0) {
      scrollTop -= easeInQuad(step)
      $scrollElement.scrollTop = scrollTop

      if (scrollTop <= top) {
        $scrollElement.scrollTop = top
        return stop(top)
      }
    } else {
      scrollTop += easeInQuad(step)
      $scrollElement.scrollTop = scrollTop

      if (scrollTop >= MAX_TOP) {
        $scrollElement.scrollTop = MAX_TOP
        return stop(MAX_TOP)
      }
    }

    requestAnimationFrame(play)
  }

  requestAnimationFrame(play)
}

export default scrollTo
