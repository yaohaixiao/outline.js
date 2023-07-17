import isFunction from '../types/isFunction'

/**
 * later - 延迟执行方法
 * ========================================================================
 * @method later
 * @param {Function} fn
 * @param {Number} [delay]
 * @returns {number|boolean}
 */
const later = (fn, delay = 300) => {
  if (!isFunction(fn)) {
    return false
  }

  return setTimeout(() => {
    fn()
  }, delay)
}

export default later
