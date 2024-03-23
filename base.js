import isString from './utils/types/isString'
import hasOwn from './utils/lang/hasOwn'
import isObject from './utils/types/isObject'
import extend from './utils/lang/extend'
import publish from './utils/observer/emit'
import subscribe from './utils/observer/on'
import unsubscribe from './utils/observer/off'

class Base {
  constructor(options) {
    this.attrs = {}

    if (options) {
      this.initialize(options)
    }
  }

  initialize(options) {
    this.attr(options).render().addListeners()
    return this
  }

  attr(prop, value) {
    const attrs = this.attrs

    if (isString(prop)) {
      // 只能扩展 attrs 中已有的属性
      if (value && hasOwn(attrs, prop)) {
        // 更新单个配置信息
        attrs[prop] = value
        return this
      }

      // 只传递 prop 参数，则返回对应的属性值
      return attrs[prop]
    } else if (isObject(prop)) {
      // 批量更新配置信息
      extend(attrs, prop)

      return this
    } else if (arguments.length === 0) {
      // 不传递参数，直接返回整个
      return attrs
    }

    return this
  }

  render() {
    return this
  }

  refresh() {
    return this
  }

  destroy() {
    this.removeListeners()
    return this
  }

  reload(options) {
    let attrs = this.attr()

    if (options) {
      attrs = this.attr(options)
    }

    this.destroy().initialize(attrs)

    return this
  }

  $emit(event, data) {
    publish(event, data)
    return this
  }

  $on(event, callback) {
    subscribe(event, callback, this)
    return this
  }

  $off(event, callback) {
    unsubscribe(event, callback)
    return this
  }

  addListeners() {
    return this
  }

  removeListeners() {
    return this
  }
}

export default Base
