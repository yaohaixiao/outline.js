/**
 * 删除 DOM 元素缓存的 _listeners 数据
 * ========================================================================
 * @method _delete
 * @param {HTMLElement} el - 要删除 listener 的 DOM 元素
 * @param {String} type - 事件类型（名称）
 * @param {Function} [fn] - 事件处理器回调函数
 */
const _delete = function (el, type, fn) {
  const listeners = el._listeners
  let index = -1

  if (listeners.length < 1) {
    return false
  }

  // 移除缓存的 _listeners 数据
  listeners.forEach((listener, i) => {
    const handler = listener.fn

    if (type === listener.type) {
      index = i

      if (handler === fn) {
        index = i
      }
    }
  })

  /* istanbul ignore else */
  if (index > -1) {
    listeners.splice(index, 1)
  }
}

export default _delete
