import Base from './base'

import isString from './utils/types/isString'
import isFunction from './utils/types/isFunction'
import isElement from './utils/types/isElement'
import later from './utils/lang/later'
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
import publish from './utils/observer/emit'

import _getScrollElement from './utils/dom/_getScrollElement'
import _paintChapters from './_paintChapters'

class Chapters extends Base {
  constructor(options) {
    super()

    this.attrs = Chapters.DEFAULTS
    this.$el = null
    this.$title = null
    this.$main = null
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

    if (this.chapters.length < 1) {
      return this
    }

    this.render().addListeners()

    this.$active = document.querySelector(`#chapter-${this.active}`)

    return this
  }

  isClosed() {
    return this.closed
  }

  isSticky() {
    const position = this.attr('position')
    return position === 'sticky'
  }

  isFixed() {
    const position = this.attr('position')
    return position === 'fixed'
  }

  isInside() {
    return this.isFixed() || this.isSticky()
  }

  isOutside() {
    return !this.isInside()
  }

  render() {
    const FIXED = 'outline-chapters_fixed'
    const HIDDEN = 'outline-chapters_hidden'
    const mounted = this.attr('mounted')
    const title = this.attr('title')
    const showCode = this.attr('showCode')
    const customClass = this.attr('customClass')
    const $parentElement = this.$parentElement
    const $fragment = document.createDocumentFragment()
    const contents = []
    let $title = null
    let $el
    let $main
    let $list
    let $placeholder

    if (!$parentElement) {
      return this
    }

    if (this.isInside()) {
      $title = createElement(
        'h2',
        {
          className: 'outline-chapters__title'
        },
        [title]
      )
      this.$title = $title
      contents.push($title)
    }

    $list = createElement(
      'ul',
      {
        className: `outline-chapters__list ${FIXED} ${HIDDEN}`
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

    $main = createElement(
      'div',
      {
        className: 'outline-chapters__main'
      },
      [$list, $placeholder]
    )
    this.$main = $main
    contents.push($main)

    $el = createElement(
      'nav',
      {
        id: 'outline-chapters',
        className: 'outline-chapters'
      },
      contents
    )
    this.$el = $el

    if (this.isSticky()) {
      addClass($el, 'outline-chapters_sticky')
    }

    if (customClass) {
      addClass($el, customClass)
    }

    $fragment.appendChild($el)
    $parentElement.appendChild($fragment)
    _paintChapters($list, this.chapters, showCode)
    removeClass($list, FIXED)
    removeClass($list, HIDDEN)

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
    $placeholder.style.top = `calc(0.5em + ${top}px)`

    return this
  }

  sticky() {
    const FIXED = 'outline-chapters_fixed'
    const $el = this.$el
    const top = this.offsetTop
    const scrollTop = this.$scrollElement.scrollTop

    if (this.isClosed()) {
      return this
    }

    if (scrollTop >= top) {
      addClass($el, FIXED)
    } else {
      removeClass($el, FIXED)
    }

    return this
  }

  scrollTo(top, after) {
    const el = this.$scrollElement

    scrollTo(el, top, after, 100)

    return this
  }

  show() {
    const HIDDEN = 'outline-chapters_hidden'
    const opened = this.attr('afterOpened')

    removeClass(this.$el, HIDDEN)
    if (this.isInside()) {
      removeClass(this.$parentElement, HIDDEN)
    }
    this.closed = false

    if (isFunction(opened)) {
      opened.call(this)
    }

    return this
  }

  hide() {
    const HIDDEN = 'outline-chapters_hidden'
    const closed = this.attr('afterClosed')

    addClass(this.$el, HIDDEN)
    if (this.isInside()) {
      addClass(this.$parentElement, HIDDEN)
    }
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

    this.attr(Chapters.DEFAULTS)
    this.$el = null
    this.$title = null
    this.$main = null
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

  onObserver() {
    let timer = null

    intersection(
      ($heading) => {
        const id = $heading.getAttribute('data-id')

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
    const $anchor = evt.delegateTarget
    const id = $anchor.getAttribute('data-id')
    const headingId = $anchor.href.split('#')[1]
    const $heading = document.querySelector(`#${headingId}`)
    const top = $heading.offsetTop
    const min = 0
    const max = this.$scrollElement.scrollHeight
    const afterScroll = this.attr('afterScroll')
    const after = () => {
      if (isFunction(afterScroll)) {
        afterScroll.call(this)
      }

      later(() => {
        this.playing = false
        publish('update:toolbar', {
          top,
          min,
          max
        })
      })
    }

    this.playing = true
    if (this.isFixed()) {
      this.sticky()
      later(() => {
        this.scrollTo(top, after)
        this.highlight(id)
      }, 10)
    } else {
      this.scrollTo(top, after)
      this.highlight(id)
    }

    stop(evt)

    return this
  }

  onScroll() {
    const $scrollElement = this.$scrollElement

    if (this.timer) {
      clearTimeout(this.timer)
    }

    this.timer = later(() => {
      const top = $scrollElement.scrollTop
      const min = 0
      const max = $scrollElement.scrollHeight - $scrollElement.clientHeight

      if (this.isFixed()) {
        this.sticky()
      }

      publish('update:toolbar', {
        top,
        min,
        max
      })
    }, 50)

    return this
  }

  addListeners() {
    const $el = this.$el
    const $scrollElement = this.$scrollElement
    const tagName = $scrollElement.tagName.toLowerCase()
    let $element = $scrollElement

    if (tagName === 'html' || tagName === 'body') {
      $element = window
    }

    on($el, '.outline-chapters__anchor', 'click', this.onSelect, this, true)
    emit($element, 'scroll', this.onScroll, this, true)

    return this
  }

  removeListeners() {
    const $el = this.$el
    const $scrollElement = this.$scrollElement
    const tagName = $scrollElement.tagName.toLowerCase()
    let $element = $scrollElement

    if (tagName === 'html' || tagName === 'body') {
      $element = window
    }

    off($el, 'click', this.onSelect)
    off($element, 'scroll', this.onScroll)

    return this
  }
}

Chapters.DEFAULTS = {
  parentElement: '',
  scrollElement: '',
  selector: '',
  active: 0,
  closed: false,
  showCode: true,
  position: 'relative',
  chapters: [],
  created: null,
  mounted: null,
  afterClosed: null,
  afterOpened: null,
  afterScroll: null,
  beforeDestroy: null,
  afterDestroy: null
}

export default Chapters
