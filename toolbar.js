import isString from './utils/types/isString'
import isFunction from './utils/types/isFunction'
import isObject from './utils/types/isObject'
import isArray from './utils/types/isArray'
import later from './utils/lang/later'
import guid from './utils/lang/guid'
import cloneDeep from './utils/lang/cloneDeep'
import createElement from './utils/dom/createElement'
import addClass from './utils/dom/addClass'
import hasClass from './utils/dom/hasClass'
import removeClass from './utils/dom/removeClass'
import on from './utils/event/on'
import off from './utils/event/off'
import paint from './utils/icons/paint'

import Base from './base'
import Command from './command'
import Commands from './commands'

import _createButton from './_createButton'

const DISABLED = 'outline-toolbar_disabled'
const HIDDEN = 'outline-toolbar_hidden'
const ACTIVE = 'outline-toolbar_active'

class Toolbar extends Base {
  constructor(options) {
    super()

    this._default()

    if (options) {
      this.initialize(options)
    }
  }

  _default() {
    this.attrs = cloneDeep(Toolbar.DEFAULTS)

    this.disabled = false
    this.closed = false

    this.$el = null
    this.buttons = []
    this.commands = null

    return this
  }

  initialize(options) {
    let created

    this.attr(options)

    this.disabled = this.attr('disabled')
    this.closed = this.attr('closed')
    this.commands = new Commands()

    created = this.attr('created')

    if (isFunction(created)) {
      created.call(this)
    }

    this.render().addListeners()

    return this
  }

  isHighlight(name) {
    const button = this.get(name)

    if (!button) {
      return false
    }

    return hasClass(button.$el, ACTIVE)
  }

  isDisabled(name) {
    let button

    if (name) {
      button = this.get(name)

      return button.disabled
    }

    return this.disabled
  }

  isExist(name) {
    const button = this.get(name)
    return !!button
  }

  isClosed() {
    return this.closed
  }

  _getCommand(button) {
    const _self = this
    const { action, name } = button
    let command = null
    let handler = null
    let context
    let listener

    if (!action) {
      return command
    }

    handler = action.handler
    context = action.context || this

    if (isFunction(handler)) {
      listener = handler
    } else if (isString(handler)) {
      listener = function () {
        _self.$emit(handler, name)
      }
    }

    if (isFunction(listener)) {
      command = new Command(name, listener.bind(context))
    }

    return command
  }

  get(name) {
    return this.buttons.find((button) => button.name === name)
  }

  render() {
    const mounted = this.attr('mounted')
    const buttons = this.attr('buttons') || []
    const placement = this.attr('placement')

    paint()

    this.$el = createElement('div', {
      id: guid('outline-toolbar'),
      className: `outline-toolbar outline-toolbar_${placement}`
    })
    this._paint(buttons)
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

  erase() {
    this.$el.innerHTML = ''
    return this
  }

  _paint(buttons) {
    const rounded = this.attr('rounded')
    const $fragment = document.createDocumentFragment()

    buttons.forEach((button) => {
      const $button = _createButton(button, rounded)
      const command = this._getCommand(button)
      const { name, disabled, context } = button

      $fragment.appendChild($button)

      if (!this.isExist(name)) {
        this.buttons.push({
          $el: $button,
          name,
          disabled: disabled || false,
          context: context || this
        })

        if (command) {
          this.commands.add(command)
        }
      }
    })

    this.$el.appendChild($fragment)

    return this
  }

  _remove() {
    document.body.removeChild(this.$el)
    return this
  }

  refresh(buttons) {
    this.attr({ buttons })
    this.erase()._paint(buttons)
    return this
  }

  add(button) {
    const $el = this.$el
    const $fragment = document.createDocumentFragment()
    const buttons = this.attr('buttons') || []
    const { name, disabled, context } = button
    const command = this._getCommand(button)
    const _add = (button) => {
      const $button = _createButton(button)

      $fragment.appendChild($button)

      buttons.push(button)
      this.buttons.push({
        $el: $button,
        name,
        disabled: disabled || false,
        context: context || this,
        command
      })

      if (command) {
        this.commands.add(command)
      }
    }

    if (isObject(button)) {
      _add(button)
    } else if (isArray(button)) {
      button.forEach((item) => {
        if (isObject(item)) {
          _add(item)
        }
      })
    }
    $el.appendChild($fragment)

    return this
  }

  remove(name) {
    const $el = this.$el
    const buttons = this.buttons
    const button = this.get(name)
    let index = -1

    if (!button) {
      return this
    }

    index = buttons.indexOf(button)

    if (index > -1) {
      buttons.splice(index, 1)
      this.attr('buttons').splice(index, 1)
    }

    this._disable(name)
    $el.removeChild(button.$el)

    return this
  }

  _disable(name) {
    const button = this.get(name)
    const command = this.commands.get(name)

    if (!button || button.disabled) {
      return this
    }

    button.disabled = true

    if (command) {
      this.commands.del(command)
    }

    addClass(button.$el, DISABLED)

    return this
  }

  _enable(name) {
    const button = this.get(name)
    const command = this.commands.get(name)

    if (!button || !button.disabled) {
      return this
    }

    button.disabled = false

    if (command) {
      this.commands.add(command)
    }

    removeClass(button.$el, DISABLED)

    return this
  }

  disable(name) {
    const disabled = this.attr('afterDisabled')

    if (name) {
      this._disable(name)
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
      this._enable(name)
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
    const button = this.get(name)
    const $el = this.$el

    if (name) {
      if (!button) {
        return this
      }

      removeClass(button.$el, HIDDEN)
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
    const button = this.get(name)
    const $el = this.$el

    if (name) {
      if (!button) {
        return this
      }

      addClass(button.$el, HIDDEN)
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

  toggle(name) {
    if (this.isClosed()) {
      this.show(name)
    } else {
      this.hide(name)
    }

    return this
  }

  highlight(name) {
    const button = this.get(name)
    let $button

    if (!button) {
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

  destroy() {
    const beforeDestroy = this.attr('beforeDestroy')
    const afterDestroy = this.attr('afterDestroy')

    if (isFunction(beforeDestroy)) {
      beforeDestroy.call(this)
    }

    this.commands.clear()
    this.removeListeners()._remove()._default()

    if (isFunction(afterDestroy)) {
      afterDestroy.call(this)
    }

    return this
  }

  execute(name) {
    if (this.isDisabled(name)) {
      return this
    }

    this.commands.execute(name)

    return this
  }

  onExecute(evt) {
    const $button = evt.delegateTarget
    let cmd = ''

    if ($button) {
      cmd = $button.getAttribute('data-cmd')

      if (cmd) {
        this.execute(cmd)
      }
    }

    return this
  }

  _updateToolbar({ top, min, max }) {
    const current = Math.ceil(top)

    if (current <= min) {
      this.hide('up')
      this.show('down')
    } else if (current >= max) {
      this.hide('down')
      this.show('up')
    } else if (current > min && current < max) {
      this.show('up')
      this.show('down')
    }

    return this
  }

  onToolbarUpdate({ top, min, max }) {
    this._updateToolbar({ top, min, max })
    return this
  }

  onAddButton(buttons) {
    this.attr({
      buttons
    })
    this.refresh(buttons)

    return this
  }

  onRemoveButton(name) {
    this.remove(name)
    return this
  }

  addListeners() {
    const buttons = this.attr('buttons') || []
    const $el = this.$el

    if (!buttons || buttons.length < 1) {
      return this
    }

    on($el, `.outline-toolbar__button`, 'click', this.onExecute, this, true)

    this.$on('toolbar:update', this.onToolbarUpdate)
    this.$on('toolbar:add:button', this.onAddButton)
    this.$on('toolbar:remove:button', this.onRemoveButton)
    this.$on('toolbar:toggle', this.toggle)

    return this
  }

  removeListeners() {
    const buttons = this.attr('buttons') || []
    const $el = this.$el

    if (!buttons || buttons.length < 1) {
      return this
    }

    off($el, '.outline-toolbar__button', this.onExecute)

    this.$off('toolbar:update')
    this.$off('toolbar:add:button')
    this.$off('toolbar:remove:button')
    this.$off('toolbar:toggle')

    return this
  }
}

Toolbar.DEFAULTS = (() => {
  const OPTIONS = {
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

  return cloneDeep(OPTIONS)
})()

export default Toolbar
