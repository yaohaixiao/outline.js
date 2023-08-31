import isTypedArray from '../types/isTypedArray'
import _subscribers from './_subscribers'
import has from './has'
import _hasDirectSubscribersFor from './_hasDirectSubscribersFor'

/**
 * （异步）发布订阅主题信息
 * ========================================================================
 * 主题默认是异步发布的。确保在消费者处理主题时，主题的发起者不会被阻止。
 * ========================================================================
 * @method emit
 * @param {String} topic - （必须）主题名称
 * @param {Object} [data] - （可选）数据对象
 * @param {Boolean} [async] - (可选) 是否异步发布
 */
const emit = (topic, data, async = true) => {
  const execute = (topic) => {
    if (!_hasDirectSubscribersFor(topic)) {
      return false
    }

    _subscribers[topic].forEach((subscriber) => {
      // 针对 mqtt 消息服务返回的 Uint8Array 类似的 typed arrays 格式的数据
      // 采用 toString() 方法转化为普通（JSON）字符串
      const message = isTypedArray(data) ? data.toString() : data

      subscriber.callback.call(subscriber.context || subscriber, message)
    })
  }
  const deliver = () => {
    let subscriber = topic
    let position = topic.lastIndexOf('.')

    while (position !== -1) {
      subscriber = subscriber.substring(0, position)
      position = subscriber.lastIndexOf('.')

      execute(subscriber)
    }

    // 执行 topic 对应的处理器
    execute(topic)
    // 执行特殊 topic：'*'（监听全部消息的发布）
    execute('*')
  }

  if (!has(topic)) {
    return false
  }

  if (async) {
    setTimeout(deliver, 10)
  } else {
    deliver()
  }
}

export default emit
