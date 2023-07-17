import { CAPTURE_EVENTS } from './enum'
import _delete from './_delete'

/**
 * （私有方法）取消 type 类型的代理事件绑定
 * ========================================================================
 * 如果没有设置 handler，则销毁 this.$options 绑定的所有符合 type 事件类型的事件绑定
 * ========================================================================
 * @method _off
 * @param {HTMLElement} el - （必须）取消事件绑定的 DOM 元素
 * @param {String} type - （必须）事件类型
 * @param {Function} fn - （必须）事件处理器回调函数
 * @private
 */
const _off = (el, type, fn) => {
  const capture = CAPTURE_EVENTS.indexOf(type) > -1

  /* istanbul ignore else */
  if (fn._delegateListener) {
    fn = fn._delegateListener
    delete fn._delegateListener
  }

  // 移除缓存的 _listeners 数据
  _delete(el, type, fn)

  el.removeEventListener(type, fn, capture)
}

export default _off
