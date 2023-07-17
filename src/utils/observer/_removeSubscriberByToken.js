import _subscribers from './_subscribers'
import _removeSubscriber from './_removeSubscriber'

/**
 * 通过订阅者 token 值删除订阅者信息
 * ========================================================================
 * @method _removeSubscriberByToken
 * @param {String} token - 订阅者 token 字符串
 * @returns {boolean}
 * @private
 */
const _removeSubscriberByToken = (token) => {
  const keys = Object.keys(_subscribers)
  let index = -1

  if (!token || keys.length < 1) {
    return false
  }

  keys.forEach((subject) => {
    const subscriber = _subscribers[subject]
    let topic

    subscriber.forEach((execution, j) => {
      if (execution.callback === token || execution.token === token) {
        topic = execution.topic
        subscriber.splice(index, j)
      }
    })

    /* istanbul ignore else */
    if (subscriber.length < 1) {
      _removeSubscriber(topic)
    }
  })
}

export default _removeSubscriberByToken
