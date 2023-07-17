import _hasDirectSubscribersFor from './_hasDirectSubscribersFor'
import _hasSubscribers from './_hasSubscribers'

/**
 * 判断是否存在包含 topic 指定的订阅者信息
 * ========================================================================
 * @method has
 * @param {String} topic - （必须）主题名称
 * @param {Boolean} [isDirect] - （可选）是否为直接的主题，默认值：true
 * @returns {Boolean}
 */
const has = (topic, isDirect = true) => {
  return isDirect ? _hasDirectSubscribersFor(topic) : _hasSubscribers(topic)
}

export default has
