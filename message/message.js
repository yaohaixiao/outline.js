import isString from '../utils/types/isString'
import isPlainObject from '../utils/types/isPlainObject'
import isFunction from '../utils/types/isFunction'

import extend from '../utils/lang/extend'
import later from '../utils/lang/later'
import stripScripts from '../utils/lang/stripScripts'
import encodeHTML from '../utils/lang/encodeHTML'
import cloneDeep from '../utils/lang/cloneDeep'
import guid from '../utils/lang/guid'

import createElement from '../utils/dom/createElement'
import addClass from '../utils/dom/addClass'
import removeClass from '../utils/dom/removeClass'
import setAttribute from '../utils/dom/setAttribute'
import setAttributes from '../utils/dom/setAttributes'

import paint from '../utils/icons/paint'
import icon from '../utils/icons/icon'

import on from '../utils/event/on'
import off from '../utils/event/off'

import Component from '../base/component'

import SYMBOLS from './symbols'

const TYPES = ['info', 'success', 'warning', 'error']
const instances = []
let instance

paint(SYMBOLS)

class Message extends Component {
  constructor(options) {
    super()

    this._default().initialize(options)

    return this
  }

  _default() {
    this.attrs = cloneDeep(Message.DEFAULTS)

    this.$el = null
    this.id = ''
    this.closed = false
    this.visible = false
    this.offset = -50
    this.timer = null
    this.destroyed = false

    return this
  }

  initialize(options) {
    this.attr(options)
    this.id = this.attr('id')
    this.offset = this.attr('offset') || -50

    this.$emit('created', { ...this.attr() })
    this.render().addListeners()

    if (this.attr('visible') && this.getText()) {
      this.open()
    }

    return this
  }

  isClosed() {
    return this.closed
  }

  isDestroyed() {
    return this.destroyed
  }

  _getClassName() {
    const type = this.attr('type')
    const effect = this.attr('effect')
    const round = this.attr('round')
    const closable = this.attr('closable')
    const visible = this.attr('visible')
    const customClass = this.attr('customClass')
    const className = [
      'outline-message',
      `outline-message_${type}`,
      `outline-message_${effect}`
    ]

    if (round) {
      className.push('outline-message_round')
    }

    if (!closable) {
      className.push('outline-message_full-width')
    }

    if (visible) {
      className.push('outline-message_visible')
    }

    if (customClass) {
      className.push(customClass)
    }

    return className
  }

  getText() {
    const dangerouslyUseHTMLString = this.attr('dangerouslyUseHTMLString')
    let message = this.attr('message')
    let text = ''

    if (!dangerouslyUseHTMLString) {
      text = encodeHTML(stripScripts(message))
    } else {
      text = message
    }

    return text
  }

  render() {
    const type = this.attr('type')
    const message = this.attr('message')
    const effect = this.attr('effect')
    const round = this.attr('round')
    const closable = this.attr('closable')
    const dangerouslyUseHTMLString = this.attr('dangerouslyUseHTMLString')
    const className = this._getClassName()
    const iconName = effect === 'light' ? `circle-${type}` : type
    const children = []
    let iconSize = 20
    let $type
    let $message
    let $text
    let $close
    let $el

    if (round && effect === 'default') {
      iconSize = 12
    }

    if (effect !== 'plain') {
      $type = icon(iconName, {
        iconSet: 'outline',
        size: iconSize
      })
      addClass($type, 'outline-message__icon')
      children.push($type)
    }

    if (!dangerouslyUseHTMLString) {
      $text = document.createTextNode(encodeHTML(stripScripts(message)))
    } else {
      $text = document.createDocumentFragment()
      $text.innerHTML = message
    }
    $message = createElement(
      'p',
      {
        className: 'outline-message__content'
      },
      [$text]
    )
    children.push($message)

    if (closable) {
      $close = icon('close', {
        iconSet: 'outline',
        size: 18
      })
      addClass($close, 'outline-message__close')
      children.push($close)
    }

    $el = createElement(
      'div',
      {
        className: className.join(' ')
      },
      children
    )
    $el.style.cssText = `top:-50px;`
    this.$el = $el
    document.body.appendChild(this.$el)

    this.$emit('mounted')

    return this
  }

  _refreshIcon() {
    const HIDDEN = '.outline-message_hidden'
    const $el = this.$el
    let iconSize = 20
    let type
    let effect
    let round
    let iconName
    let $icon
    let $svg
    let $use

    if (this.isDestroyed()) {
      return this
    }

    $icon = $el.querySelector('.outline-icon')

    if (!$icon) {
      return this
    }

    type = this.attr('type')
    effect = this.attr('effect')
    round = this.attr('round')

    if (effect === 'plain') {
      addClass($icon, HIDDEN)
    } else {
      removeClass($icon, HIDDEN)

      if (round && effect === 'default') {
        iconSize = 12
      }
    }

    $svg = $icon.querySelector('.outline-icon__svg')
    setAttributes($svg, {
      style: `width:${iconSize}px;height:${iconSize}px;`
    })

    $use = $svg.querySelector('use')
    iconName = effect === 'light' ? `circle-${type}` : type
    setAttribute($use, 'xlink:href', `#outline-icon-${iconName}`)

    return this
  }

  _refreshMessage() {
    const $el = this.$el
    let $message
    let dangerouslyUseHTMLString
    let message
    let text

    if (this.isDestroyed()) {
      return this
    }

    $message = $el.querySelector('.outline-message__content')
    dangerouslyUseHTMLString = this.attr('dangerouslyUseHTMLString')
    message = this.attr('message')

    if (!dangerouslyUseHTMLString) {
      text = encodeHTML(stripScripts(message))
    } else {
      text = message
    }

    $message.innerHTML = text

    return this
  }

  _refreshClose() {
    const HIDDEN = '.outline-message_hidden'
    const $el = this.$el
    let $close
    let closable

    if (this.isDestroyed()) {
      return this
    }

    $close = $el.querySelector('.outline-message__close')
    closable = this.attr('closable')

    if ($close) {
      if (closable) {
        addClass($close, HIDDEN)
      } else {
        removeClass($close, HIDDEN)
      }
    }

    return this
  }

  _refreshEl() {
    const $el = this.$el
    let className

    if (this.isDestroyed()) {
      return this
    }

    className = this._getClassName()
    setAttribute($el, 'className', className.join(' '))

    return this
  }

  refresh(options) {
    if (!isPlainObject(options)) {
      return this
    }

    this.attr(options)
      ._refreshIcon()
      ._refreshMessage()
      ._refreshClose()
      ._refreshEl()

    return this
  }

  clearTimer() {
    if (this.isDestroyed()) {
      return this
    }

    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    }

    return this
  }

  startTimer(duration) {
    if (this.isDestroyed()) {
      return this
    }

    this.timer = later(() => {
      this.$emit('opened')
      this.close()
    }, duration * 1000)

    return this
  }

  open(options) {
    const $el = this.$el
    let offset
    let duration
    let top
    let cssRules

    if (this.isDestroyed()) {
      return this
    }

    if (this.isClosed()) {
      this.refresh(options)
    }

    offset = this.attr('offset')
    duration = this.attr('duration')
    top = offset && offset >= this.offset ? offset : this.offset
    cssRules = `top:${top}px;`

    this.clearTimer()

    this.$emit('beforeOpen')

    later(() => {
      this.visible = true

      addClass($el, 'outline-message_visible')
      $el.style.cssText = cssRules

      if (duration > 0) {
        this.startTimer(duration)
      }
    }, 100)

    return this
  }

  close() {
    const $el = this.$el
    const cssRules = `top:-50px;`
    let destroyAfterClosed
    let beforeClose

    if (this.isDestroyed()) {
      return this
    }

    destroyAfterClosed = this.attr('destroyAfterClosed')
    beforeClose = this.attr('beforeClose')

    if (isFunction(beforeClose)) {
      beforeClose.call(this)
    }

    $el.style.cssText = cssRules
    removeClass($el, 'outline-message_visible')

    this.visible = false
    this.closed = true

    later(() => {
      this.$emit('closed')

      if (destroyAfterClosed) {
        this.destroy()
      }
    }, 500)

    return this
  }

  destroy() {
    this.$emit('beforeDestroy')

    if (this.isDestroyed()) {
      return this
    }

    this.removeListeners()

    document.body.removeChild(this.$el)

    clearTimeout(this.timer)
    this._default()

    this.$emit('afterDestroy')

    return this
  }

  onMouseEnter() {
    this.clearTimer()
    return this
  }

  onMouseLeave() {
    const duration = this.attr('duration')
    const delay = this.attr('delay')

    if (duration <= 0) {
      return this
    }

    this.startTimer(delay)

    return this
  }

  onClose() {
    this.clearTimer()
    this.close()
    return this
  }

  addListeners() {
    const $el = this.$el

    on(
      $el,
      '.outline-message__content',
      'mouseenter',
      this.onMouseEnter,
      this,
      true
    )
    on(
      $el,
      '.outline-message__content',
      'mouseleave',
      this.onMouseLeave,
      this,
      true
    )
    on($el, '.outline-message__close', 'click', this.onClose, this, true)

    return this
  }

  removeListeners() {
    const $el = this.$el

    off($el, 'mouseenter', this.onMouseEnter)
    off($el, 'mouseleave', this.onMouseLeave)
    off($el, 'click', this.onClose)

    return this
  }
}

Message.DEFAULTS = (() => {
  const OPTIONS = {
    id: '',
    type: 'info',
    effect: 'default',
    round: false,
    offset: 30,
    duration: 3,
    delay: 2,
    message: '',
    customClass: '',
    closable: true,
    visible: true,
    dangerouslyUseHTMLString: false,
    destroyAfterClosed: false,
    beforeClose: null
  }

  return cloneDeep(OPTIONS)
})()

TYPES.forEach((type) => {
  Message[type] = (options) => {
    const config = {}
    const id = guid(`outline-message-`)
    const beforeClose =
      options && options.beforeClose ? options.beforeClose : null
    let offset = options && options.offset ? options.offset : 30

    if (isString(options)) {
      config.message = options
    } else {
      if (isPlainObject(options)) {
        extend(config, options)
      }
    }

    config.id = id
    config.type = type
    config.offset = offset
    config.visible = false
    config.destroyAfterClosed = true
    config.beforeClose = () => {
      Message.close(id, beforeClose)
    }

    instance = new Message(config)
    instances.forEach((item) => {
      offset += item.$el.offsetHeight + 16
    })
    instance.offset = offset
    if (config.message) {
      instance.open()
    }
    instances.push(instance)

    return instance
  }
})

// 关闭指定 id 消息的静态方法
Message.close = (id, beforeClose) => {
  const len = instances.length
  let index = -1
  let i
  let offsetHeight

  instances.forEach((instance, i) => {
    // 在 instances 中通过 id 找到要关闭的消息
    if (id === instance.id) {
      offsetHeight = instance.$el.offsetHeight
      index = i

      // 关闭消息
      if (isFunction(beforeClose)) {
        beforeClose.call(instance)
      }

      instances.splice(i, 1)
    }
  })

  if (len <= 1 || index === -1 || index > instances.length - 1) {
    return false
  }

  i = index

  // 界面中的消息逐个向上收起
  for (; i < len - 1; i += 1) {
    const dom = instances[i].$el

    dom.style['top'] = parseInt(dom.style['top'], 10) - offsetHeight - 16 + 'px'
  }
}

// 关闭所有消息的静态方法
Message.clear = () => {
  let i = instances.length - 1
  for (; i >= 0; i -= 1) {
    instances[i].close()
  }
}

export default Message
