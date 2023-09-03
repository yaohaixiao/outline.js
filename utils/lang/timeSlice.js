/**
 * timeSlice.js 时间切片功能函数
 * ====================================================
 * Created By: Yaohaixiao
 * Update: 2022.11.27
 */
import isFunction from '../types/isFunction'

const queen = []
let isHandling

function runIdle(idleDeadline) {
  while (idleDeadline.timeRemaining() > 0 && queen.length) {
    const fn = queen.shift()

    if (!isFunction(fn)) {
      return false
    }

    fn()
  }

  if (queen.length) {
    isHandling = requestIdleCallback(runIdle)
  } else {
    isHandling = 0
  }
}

/**
 * 时间切片功能函数：主要用于优化长时任务的性能，将长时任务分解成
 * 多个短时间任务
 * ====================================================
 * @param {Function} fn - 需要在空闲时执行的回调函数
 * @return {(function(): (boolean|undefined))|*|boolean}
 */
const timeSlice = (fn) => {
  queen.push(fn)

  if (!isHandling) {
    requestIdleCallback(runIdle)
  }
}

export default timeSlice
