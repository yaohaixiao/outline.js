import isFunction from '../types/isFunction'

/**
 * 通用的 IntersectionObserver 观察者处理器
 * ========================================================================
 * @method intersection
 * @param {Function} fn
 * @param {Object} [props]
 * @param {Object|HTMLElement} [props.root]
 * @param {String} [props.selector]
 * @param {Object} [props.context]
 * @param {String} [props.attr]
 * @param {String} [props.rootMargin]
 */
const intersection = (fn, props) => {
  const root = props.root || null
  const selector = props.selector || '.outline-heading'
  const context = props.context || null
  const rootMargin = props.rootMargin || '0px 0px -90% 0px'
  const options = {
    rootMargin: rootMargin
  }
  const Observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0) {
        if (isFunction(fn)) {
          fn.call(context || entry.target, entry.target)
        }
      }
    })
  }, options)

  if (root) {
    options.root = root
  }

  document.querySelectorAll(selector).forEach((section) => {
    Observer.observe(section)
  })
}

export default intersection
