/**
 * timeSlice.js 时间切片功能函数
 * ====================================================
 * Created By: Yaohaixiao
 * Update: 2023.09.04
 */
import isFunction from '../../utils/types/isFunction'
import later from './later'

const queue = []
let isHandling
let done

// Shim from https://developers.google.com/web/updates/2015/08/using-requestidlecallback
if (typeof window.requestIdleCallback === 'undefined') {
  window.requestIdleCallback = function (cb) {
    const start = Date.now()
    return later(function () {
      cb({
        didTimeout: false,
        timeRemaining: function () {
          return Math.max(0, 50 - (Date.now() - start))
        }
      })
    }, 10)
  }

  window.cancelIdleCallback = function (id) {
    clearTimeout(id)
  }
}

function runIdle(idleDeadline) {
  while (idleDeadline.timeRemaining() > 0 && queue.length) {
    const fn = queue.shift()

    if (!isFunction(fn)) {
      return false
    }

    fn()
  }

  if (queue.length) {
    isHandling = requestIdleCallback(runIdle)
  } else {
    isHandling = 0

    if (isFunction(done)) {
      done()
      done = null
    }
  }
}

/**
 * 时间切片功能函数：主要用于优化长时任务的性能，将长时任务分解成
 * 多个短时间任务
 * ====================================================
 * @param {Function} fn - 需要在空闲时执行的回调函数
 * @param {Function} afterComplete - queen 的
 * @return {(function(): (boolean|undefined))|*|boolean}
 */
const timeSlice = (fn, afterComplete = null) => {
  queue.push(fn)

  if (isFunction(afterComplete)) {
    done = afterComplete
  }

  if (!isHandling) {
    requestIdleCallback(runIdle)
  }
}

export default timeSlice
