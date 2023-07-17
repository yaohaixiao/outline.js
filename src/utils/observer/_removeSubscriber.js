import _subscribers from './_subscribers'
import hasOwn from '../lang/hasOwn'

/**
 * 删除与给定 topic 相同的订阅者信息
 * ========================================================================
 * @method _removeSubscriber
 * @param {String} topic - （必须）订阅主题字符串
 * @returns {Boolean}
 */
const _removeSubscriber = (topic) => {
  if (!hasOwn(_subscribers, topic)) {
    return false
  }

  delete _subscribers[topic]
}

export default _removeSubscriber
