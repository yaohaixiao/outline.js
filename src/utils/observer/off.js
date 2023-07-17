import has from './has'
import _removeSubscriber from './_removeSubscriber'
import _removeSubscriberByToken from './_removeSubscriberByToken'

/**
 * 取消订阅主题
 * ========================================================================
 * @method off
 * @param {String} topic - （必须）订阅的主题
 * @param {Function|String} [token] - （可选）订阅主题的处理器函数或者唯一 Id 值
 */
const off = (topic, token) => {
  if (!has(topic)) {
    return false
  }

  if (token) {
    _removeSubscriberByToken(token)
  } else {
    _removeSubscriber(topic)
  }
}

export default off
