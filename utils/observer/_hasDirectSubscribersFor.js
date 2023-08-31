import _subscribers from './_subscribers'
import hasOwn from '../lang/hasOwn'

/**
 * 判断是否存在与给定 topic 完全匹配的订阅者信息
 * ========================================================================
 * @method _hasDirectSubscribersFor
 * @param {String} topic - （必须）订阅主题字符串
 * @returns {Boolean}
 */
const _hasDirectSubscribersFor = (topic) => {
  return hasOwn(_subscribers, topic) && _subscribers[topic].length > 0
}

export default _hasDirectSubscribersFor
