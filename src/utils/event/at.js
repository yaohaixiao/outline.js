import isFunction from '../types/isFunction'
import off from './off'

import { CAPTURE_EVENTS } from './enum'

/**
 * 绑定事件
 * ========================================================================
 * @method at
 * @param {HTMLElement|String|Object} el - （必须）绑定代理事件的 DOM 节点
 * @param {String|Function} type - （必须）事件类型或者事件处理器回调函数
 * @param {Function|Object} fn - （必须） 事件处理器回调函数或者传递给事件处理器回调函数的数据对象
 * @param {Object|Boolean} [data] - （可选）传递给事件处理器回调函数的数据对象或者事件处理器回调函数的 this 上下文指向，
 * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向，或者是否仅触发一次
 * 当设置为 true 时，则事件处理器回调函数的 this 上下文指向为 data 对象
 * @param {Boolean} once - （可选）是否仅触发一次
 */
const at = (el, type, fn, data, context, once = false) => {
  // CAPTURE_EVENTS 中的特殊事件，采用事件捕获模型
  const capture = CAPTURE_EVENTS.indexOf(type) > -1
  const listener = function (evt) {
    let overrideContext = context || el

    // 当设置为 true 时，则事件处理器回调函数的
    // this 上下文指向为 data 对象
    if (context === true) {
      overrideContext = data
    }

    // 仅触发一次
    /* istanbul ignore else */
    if (once === true) {
      off(el, type, listener)
    }

    fn.call(overrideContext, evt, data)
  }

  if (!isFunction(fn)) {
    return false
  }

  if (!el._listeners) {
    el._listeners = []
  }

  // 缓存 options 元素绑定的事件处理器
  el._listeners.push({
    el,
    type,
    fn: listener,
    data,
    context,
    capture
  })

  // 缓存包装后的事件处理器
  fn._delegateListener = listener

  el.addEventListener(type, listener, capture)
}

export default at
