import closest from '../dom/closest'
import off from './off'
import getTarget from './getTarget'

import { CAPTURE_EVENTS } from './enum'

/**
 * 绑定代理事件
 * ========================================================================
 * @method on
 * @param {HTMLElement|String|Object} el - （必须）绑定代理事件的 DOM 节点
 * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
 * @param {String|Function} type - （必须）事件类型或者事件处理器回调函数
 * @param {Function|Object} fn - （可选） 事件处理器回调函数或者传递给事件处理器回调函数的数据对象
 * @param {Object|Boolean} [data] - （可选）传递给事件处理器回调函数的数据对象或者事件处理器回调函数的 this 上下文指向，
 * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向，或者是否仅触发一次
 * 当设置为 true 时，则事件处理器回调函数的 this 上下文指向为 data 对象
 * @param {Boolean} once - （可选）是否仅触发一次
 */
const on = (el, selector, type, fn, data, context, once = false) => {
  // CAPTURE_EVENTS 中的特殊事件，采用事件捕获模型
  const capture = CAPTURE_EVENTS.indexOf(type) > -1

  const listener = function (evt) {
    const target = getTarget(evt)
    // 通过 Element.matches 方法获得点击的目标元素
    const delegateTarget = closest(target, selector, el)
    let overrideContext = context || el

    evt.delegateTarget = delegateTarget

    // 当设置为 true 时，则事件处理器回调函数的
    // this 上下文指向为 data 对象
    if (context === true) {
      overrideContext = data
    }

    /* istanbul ignore else */
    if (delegateTarget) {
      // 仅触发一次
      /* istanbul ignore else */
      if (once === true) {
        off(el, type, listener)
      }

      fn.call(overrideContext, evt, data)
    }
  }

  if (!el._listeners) {
    el._listeners = []
  }

  // 缓存 options 元素绑定的事件处理器
  el._listeners.push({
    el,
    selector,
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

export default on
