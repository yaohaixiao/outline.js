/**
 * 函数防抖：当持续触发事件时，一定时间段内没有再触发事件，事件处理函数才会执行一次，如果设
 * 定的时间到来之前，又一次触发了事件，就重新开始延时。
 * ========================================================================
 * @method debounce
 * @param {Function} fn - 要采用防抖技术执行的函数
 * @param {Number} ms - 等待时间（单位：毫秒）
 * @returns {Function}
 *
 * @example
 * window.addEventListener(
 *   'resize',
 *   debounce(() => {
 *     console.log(window.innerWidth);
 *     console.log(window.innerHeight);
 *   }, 250)
 * );
 * // => Will log the window dimensions at most every 250ms
 */
const debounce = (fn, ms = 300) => {
  let timer

  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      fn.apply(this, args)
    }, ms)
  }
}

export default debounce
