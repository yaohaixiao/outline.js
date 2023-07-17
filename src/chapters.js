import isString from './utils/types/isString'
import isObject from './utils/types/isObject'
import isFunction from './utils/types/isFunction'
import isElement from './utils/types/isElement'
import extend from './utils/lang/extend'
import later from './utils/lang/later'
import hasOwn from './utils/lang/hasOwn'
import emit from './utils/event/emit'
import on from './utils/event/on'
import off from './utils/event/off'
import stop from './utils/event/stop'
import createElement from './utils/dom/createElement'
import scrollTo from './utils/dom/scrollTo'
import addClass from './utils/dom/addClass'
import intersection from './utils/dom/intersection'
import removeClass from './utils/dom/removeClass'
import offsetTop from './utils/dom/offsetTop'

import _getScrollElement from './utils/dom/_getScrollElement'
import _paintChapters from './_paintChapters'

const DEFAULTS = {
  parentElement: '',
  scrollElement: '',
  active: 0,
  closed: false,
  showChapterCode: true,
  isNeedDoLayout: false,
  chapters: [],
  created: null,
  mounted: null,
  afterClosed: null,
  afterOpened: null,
  afterScroll: null,
  beforeDestroy: null,
  afterDestroy: null
}

class Chapters {
  constructor(options) {
    this.attrs = DEFAULTS

    this.$el = null
    this.$list = null
    this.$placeholder = null
    this.$parentElement = null
    this.$scrollElement = null
    this.chapters = []
    this.closed = false
    this.active = 0
    this.offsetTop = 0
    this.$active = null
    this.timer = null
    this.playing = false

    if (options) {
      this.initialize(options)
    }
  }

  initialize(options) {
    let created
    let parentElement
    let scrollElement
    let $parent

    this.attr(options)
    created = this.attr('created')
    parentElement = this.attr('parentElement')
    scrollElement = this.attr('scrollElement')

    if (isString(parentElement)) {
      $parent = document.querySelector(parentElement)
    } else if (isElement(parentElement)) {
      $parent = parentElement
    }
    this.$parentElement = $parent
    this.$scrollElement = _getScrollElement(scrollElement)

    this.chapters = this.attr('chapters')
    this.closed = this.attr('closed')
    this.active = this.attr('active')

    if (isFunction(created)) {
      created.call(this)
    }

    this.render().addListeners()

    this.$active = document.querySelector(`#chapter-${this.active}`)

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
      return this.attrs
    }

    return this
  }

  isClosed() {
    return this.closed
  }

  render() {
    const mounted = this.attr('mounted')
    const showChapterCode = this.attr('showChapterCode')
    const $parentElement = this.$parentElement
    let $el
    let $list
    let $placeholder

    if (!$parentElement) {
      return this
    }

    $list = createElement(
      'ul',
      {
        className: 'outline-chapters__list'
      },
      ['']
    )
    this.$list = $list

    $placeholder = createElement(
      'div',
      {
        className: 'outline-chapters__placeholder'
      },
      ['']
    )
    this.$placeholder = $placeholder

    $el = createElement(
      'nav',
      {
        id: 'outline-chapters',
        className: 'outline-chapters'
      },
      [$list, $placeholder]
    )
    this.$el = $el

    $parentElement.appendChild($el)
    _paintChapters($list, this.chapters, showChapterCode)

    this.offsetTop = offsetTop(document.querySelector('#outline-chapters'))

    if (isFunction(mounted)) {
      mounted.call(this)
    }

    this.onObserver()

    return this
  }

  highlight(id) {
    const $anchor = this.$el.querySelector(`#outline-anchor-${id}`)
    const HIGHLIGHT = 'outline-chapters_active'
    const $placeholder = this.$placeholder
    let top

    if (this.$active) {
      removeClass(this.$active, HIGHLIGHT)
    }

    this.active = parseInt($anchor.getAttribute('data-id'), 10)
    this.$active = $anchor
    addClass(this.$active, HIGHLIGHT)

    top = 30 * this.active
    $placeholder.style.top = `calc(1em + ${top}px)`

    return this
  }

  doLayout() {
    const FIXED = 'outline-chapters_fixed'
    const $el = this.$el
    const top = this.offsetTop
    const scrollTop = this.$scrollElement.scrollTop

    if (this.isClosed()) {
      return this
    }

    if (scrollTop >= top + 10) {
      addClass($el, FIXED)
    } else {
      removeClass($el, FIXED)
    }

    return this
  }

  scrollTo(top, afterScroll) {
    const $scrollElement = this.$scrollElement

    scrollTo($scrollElement, top, afterScroll, 100)

    return this
  }

  show() {
    const opened = this.attr('afterOpened')

    removeClass(this.$el, 'outline-chapters_hidden')
    this.closed = false

    if (isFunction(opened)) {
      opened.call(this)
    }

    return this
  }

  hide() {
    const closed = this.attr('afterClosed')

    addClass(this.$el, 'outline-chapters_hidden')
    this.closed = true

    if (isFunction(closed)) {
      closed.call(this)
    }

    return this
  }

  toggle() {
    if (this.closed) {
      this.show()
    } else {
      this.hide()
    }

    return this
  }

  destroy() {
    const beforeDestroy = this.attr('beforeDestroy')
    const afterDestroy = this.attr('afterDestroy')

    if (isFunction(beforeDestroy)) {
      beforeDestroy.call(this)
    }

    this.removeListeners()
    this.$parentElement.removeChild(this.$el)

    this.attr(DEFAULTS)
    this.$el = null
    this.$list = null
    this.$placeholder = null
    this.$parentElement = null
    this.$scrollElement = null
    this.chapters = []
    this.active = 0
    this.offsetTop = 0
    this.$active = null
    this.closed = false

    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    }

    if (isFunction(afterDestroy)) {
      afterDestroy.call(this)
    }

    return this
  }

  reload(options) {
    this.destroy().initialize(this.attr(options))
    return this
  }

  onObserver() {
    let timer = null

    intersection(
      (id) => {
        if (this.playing) {
          return false
        }

        if (timer) {
          clearTimeout(timer)
        }

        timer = later(() => {
          this.highlight(id)
        }, 100)
      },
      { context: this }
    )

    return this
  }

  onSelect(evt) {
    let afterScroll = this.attr('afterScroll')
    const $anchor = evt.delegateTarget
    const id = $anchor.getAttribute('data-id')
    const headingId = $anchor.href.split('#')[1]
    const $heading = document.querySelector(`#${headingId}`)

    if (!isFunction(afterScroll)) {
      afterScroll = () => {
        later(() => {
          this.playing = false
        })
      }
    }

    this.playing = true
    this.scrollTo($heading.offsetTop, afterScroll)
    this.highlight(id)

    stop(evt)

    return this
  }

  onScroll() {
    if (this.timer) {
      clearTimeout(this.timer)
    }

    this.timer = later(() => {
      this.doLayout()
    }, 100)

    return this
  }

  addListeners() {
    const $el = this.$el
    const isNeedDoLayout = this.attr('isNeedDoLayout')
    const $scrollElement = this.$scrollElement
    const tagName = $scrollElement.tagName.toLowerCase()
    let $element = $scrollElement

    on($el, '.outline-chapters__anchor', 'click', this.onSelect, this, true)

    if (!isNeedDoLayout) {
      return this
    }

    if (tagName === 'html' || tagName === 'body') {
      $element = window
    }

    emit($element, 'scroll', this.onScroll, this, true)

    return this
  }

  removeListeners() {
    const $el = this.$el
    const isNeedDoLayout = this.attr('isNeedDoLayout')
    const $scrollElement = this.$scrollElement
    const tagName = $scrollElement.tagName.toLowerCase()
    let $element = $scrollElement

    off($el, 'click', this.onSelect)

    if (!isNeedDoLayout) {
      return this
    }

    if (tagName === 'html' || tagName === 'body') {
      $element = window
    }

    off($element, 'scroll', this.onScroll)

    return this
  }
}

export default Chapters
