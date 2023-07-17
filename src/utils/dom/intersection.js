import isFunction from '../types/isFunction'

/**
 * 通用的 IntersectionObserver 观察者处理器
 * ========================================================================
 * @method intersection
 * @param {Function} fn
 * @param {Object} [props]
 * @param {Object|HTMLElement} [props.root]
 * @param {Object} [props.context]
 * @param {String} [props.selector]
 * @param {String} [props.attr]
 * @param {String} [props.rootMargin]
 */
const intersection = (fn, props) => {
  const root = props.root || null
  const context = props.root || null
  const selector = props.selector || '.outline-heading'
  const attr = props.attr || 'data-id'
  const rootMargin = props.rootMargin || '0px 0px -90% 0px'
  const options = {
    rootMargin: rootMargin
  }
  const Observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const prop = entry.target.getAttribute(attr)
      if (entry.intersectionRatio > 0) {
        if (isFunction(fn)) {
          fn(prop, context)
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
