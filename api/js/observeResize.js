import debounce from './debounce'
import isFunction from '@/utils/types/isFunction'
import isElement from '@/utils/types/isElement'

/**
 * 通用的 ResizeObserver 观察者处理器
 * ========================================================================
 * @method observeResize
 * @since 1.8.0
 * @see https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/ResizeObserverEntry/contentBoxSize
 * @see https://developer.mozilla.org/zh-CN/docs/Web/CSS/writing-mode
 * @param {HTMLElement} el
 * @param {Function} callback
 * @param {Number} [delay]
 * @return {ResizeObserver|boolean}
 */
const observeResize = (el, callback, delay = 300) => {
  let observer
  let fn

  if (!isElement(el) || !isFunction(callback)) {
    return false
  }

  fn = debounce(callback, delay)
  observer = new ResizeObserver((entries) => {
    for (const entry of entries) {
      fn(entry)
    }
  })

  observer.observe(el)

  return observer
}

export default observeResize
