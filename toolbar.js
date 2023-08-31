import Base from './base'

import isString from './utils/types/isString'
import isFunction from './utils/types/isFunction'
import isObject from './utils/types/isObject'
import isArray from './utils/types/isArray'
import later from './utils/lang/later'
import cloneDeep from './utils/lang/cloneDeep'
import createElement from './utils/dom/createElement'
import addClass from './utils/dom/addClass'
import hasClass from './utils/dom/hasClass'
import removeClass from './utils/dom/removeClass'
import on from './utils/event/on'
import off from './utils/event/off'
import paint from './utils/icons/paint'

import _createButton from './_createButton'

const DISABLED = 'outline-toolbar_disabled'
const HIDDEN = 'outline-toolbar_hidden'

class Toolbar extends Base {
  constructor(options) {
    super()

    this.attrs = cloneDeep(Toolbar.DEFAULTS)
    this.$el = null
    this.disabled = false
    this.closed = false
    this.buttons = []

    if (options) {
      this.initialize(options)
    }
  }

  initialize(options) {
    let created

    this.attr(options)
    created = this.attr('created')
    this.disabled = this.attr('disabled')
    this.closed = this.attr('closed')

    if (isFunction(created)) {
      created.call(this)
    }

    this.render().addListeners()

    return this
  }

  isDisabled(name) {
    const buttons = this.attr('buttons')
    let button

    if (name) {
      button = buttons.find((option) => option.name === name)

      return button?.disabled
    }

    return this.disabled
  }

  isClosed() {
    return this.closed
  }

  highlight(name) {
    const button = this.buttons.find((item) => item.name === name)
    const ACTIVE = 'outline-toolbar_active'
    let $button

    if ($button) {
      return this
    }

    $button = button.$el

    if (hasClass($button, ACTIVE)) {
      removeClass($button, ACTIVE)
    } else {
      addClass($button, ACTIVE)
    }

    return this
  }

  render() {
    const mounted = this.attr('mounted')
    const buttons = this.attr('buttons') || []
    const rounded = this.attr('rounded')
    const placement = this.attr('placement')
    const $buttons = []

    paint()

    buttons.forEach((button) => {
      const $button = _createButton(button, rounded)

      $buttons.push($button)
      this.buttons.push({
        name: button.name,
        $el: $button
      })
    })

    this.$el = createElement(
      'div',
      {
        id: 'outline-toolbar',
        className: `outline-toolbar outline-toolbar_${placement}`
      },
      $buttons
    )
    document.body.appendChild(this.$el)

    if (this.closed) {
      this.hide()
    }

    if (this.disabled) {
      this.disable()
    }

    if (isFunction(mounted)) {
      mounted.call(this)
    }

    return this
  }

  add(button) {
    const $el = this.$el
    const buttons = this.attr('buttons')
    const action = button.action
    const $fragment = document.createDocumentFragment()
    let type

    if (isObject(button)) {
      buttons.push(button)
      $fragment.appendChild(_createButton(button))
    } else if (isArray(button)) {
      button.forEach((item) => {
        $fragment.appendChild(_createButton(item))
      })
    }
    $el.appendChild($fragment)

    if (action && isFunction(action.handler)) {
      type = action.type || 'click'
      on($el, `.${button.name}`, type, action.handler)
    }

    return this
  }

  remove(name) {
    const $el = this.$el
    const buttons = this.attr('buttons')
    const button = buttons.find((option) => option.name === name)
    let index = -1
    let $button

    if (!button) {
      return this
    }

    buttons.forEach((button, i) => {
      if (button.name === name) {
        index = i
      }
    })

    if (index > -1) {
      this.attr().buttons.splice(index, 1)
    }

    $button = $el.querySelector(`.${name}`)
    this.switch(name, false)
    $el.removeChild($button)

    return this
  }

  switch(name, enabled) {
    const $el = this.$el
    const buttons = this.attr('buttons')
    const button = buttons.find((option) => option.name === name)
    let action
    let type
    let listener
    let $button

    if (!button) {
      return this
    }

    buttons.forEach((option) => {
      if (option.name === name) {
        button.disabled = !enabled
      }
    })

    action = button.action
    $button = $el.querySelector(`.${name}`)

    if (action) {
      type = action.type || 'click'
      listener = action.handler
    }

    if (enabled) {
      removeClass($button, DISABLED)

      if (type && listener) {
        on($el, `.${name}`, type, listener)
      }
    } else {
      addClass($button, DISABLED)

      if (type && listener) {
        off($el, type, listener)
      }
    }

    return this
  }

  disable(name) {
    const disabled = this.attr('afterDisabled')

    if (name) {
      this.switch(name, false)
    } else {
      addClass(this.$el, DISABLED)
      this.removeListeners()
      this.disabled = true

      if (isFunction(disabled)) {
        disabled.call(this)
      }
    }

    return this
  }

  enable(name) {
    const enabled = this.attr('afterEnabled')

    if (name) {
      this.switch(name, true)
    } else {
      this.disabled = false
      removeClass(this.$el, DISABLED)
      this.addListeners()

      if (isFunction(enabled)) {
        enabled.call(this)
      }
    }

    return this
  }

  show(name) {
    const opened = this.attr('afterOpened')
    const button = this.attr('buttons').find((option) => option.name === name)
    const $el = this.$el
    let $button

    if (name) {
      if (!button) {
        return this
      }

      $button = $el.querySelector(`.${name}`)
      removeClass($button, HIDDEN)
    } else {
      removeClass($el, HIDDEN)
      this.closed = false

      if (isFunction(opened)) {
        later(() => {
          opened.call(this)
        }, 310)
      }
    }

    return this
  }

  hide(name) {
    const closed = this.attr('afterClosed')
    const button = this.attr('buttons').find((option) => option.name === name)
    const $el = this.$el
    let $button

    if (name) {
      if (!button) {
        return this
      }
      $button = $el.querySelector(`.${name}`)
      addClass($button, HIDDEN)
    } else {
      addClass($el, HIDDEN)
      this.closed = true

      if (isFunction(closed)) {
        later(() => {
          closed.call(this)
        }, 310)
      }
    }

    return this
  }

  toggle() {
    if (this.isClosed()) {
      this.show()
    } else {
      this.hide()
    }

    return this
  }

  destroy() {
    const beforeDestroy = this.attr('beforeDestroy')
    const afterDestroy = this.attr('afterDestroy')
    let $el = this.$el

    if (isFunction(beforeDestroy)) {
      beforeDestroy.call(this)
    }

    this.removeListeners()
    document.body.removeChild($el)
    $el = null

    this.attr(Toolbar.DEFAULTS)
    this.disabled = false
    this.closed = false
    this.buttons = []

    if (isFunction(afterDestroy)) {
      afterDestroy.call(this)
    }

    return this
  }

  refresh() {
    const $el = this.$el
    const buttons = this.attr('buttons') || []

    this.removeListeners()
    $el.innerHTML = ''

    buttons.forEach((button) => {
      this.$el.appendChild(_createButton(button))
    })

    this.addListeners()

    return this
  }

  addListeners() {
    const buttons = this.attr('buttons')
    const $el = this.$el

    if (!buttons || buttons.length < 1) {
      return this
    }

    buttons.forEach((button) => {
      const action = button.action
      const disabled = this.disabled
      let type
      let listener
      let context
      let command

      if (disabled) {
        return false
      }

      if (action) {
        listener = action.handler
        if (isString(listener)) {
          command = listener
          action.handler = function () {
            this.$emit(command, button.name)
          }
          listener = action.handler
        }

        type = action.type || 'click'
        context = action.context
      }

      if (isFunction(listener)) {
        on($el, `.${button.name}`, type, listener, context || this, true)
      }
    })

    return this
  }

  removeListeners() {
    const buttons = this.attr('buttons')
    const $el = this.$el

    if (!buttons || buttons.length < 1) {
      return this
    }

    buttons.forEach((button) => {
      const action = button.action
      const disabled = this.disabled
      let type
      let listener

      if (disabled) {
        return false
      }

      if (action) {
        listener = action.handler
        type = action.type || 'click'
      }

      if (isFunction(listener)) {
        off($el, type, listener)
      }
    })

    return this
  }
}

Toolbar.DEFAULTS = {
  placement: 'ltr',
  closed: false,
  disabled: false,
  rounded: true,
  buttons: [],
  created: null,
  mounted: null,
  afterClosed: null,
  afterOpened: null,
  afterDisabled: null,
  afterEnabled: null,
  beforeDestroy: null,
  afterDestroy: null
}

export default Toolbar
