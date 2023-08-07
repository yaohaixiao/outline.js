import Base from './base'

import isString from './utils/types/isString'
import isFunction from './utils/types/isFunction'
import isElement from './utils/types/isElement'
import later from './utils/lang/later'
import at from './utils/event/at'
import on from './utils/event/on'
import off from './utils/event/off'
import stop from './utils/event/stop'
import createElement from './utils/dom/createElement'
import scrollTo from './utils/dom/scrollTo'
import addClass from './utils/dom/addClass'
import intersection from './utils/dom/intersection'
import removeClass from './utils/dom/removeClass'
import offsetTop from './utils/dom/offsetTop'
import setProperty from './utils/dom/setProperty'
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
    this.offsetWidth = 0
    this.$active = null
    this.scrollTimer = null
    this.resizeTimer = null
    this.playing = false
    this.Observer = null

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

  _paintEdge() {
    const STICKY = 'outline-chapters_sticky'
    const FIXED = 'outline-chapters_fixed'
    const HIDDEN = 'outline-chapters_hidden'
    const title = this.attr('title')
    const customClass = this.attr('customClass')
    const $parentElement = this.$parentElement
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
        // 为优化性能，添加了 _fixed 和 _hidden
        // fixed 为了让 $list 脱离流布局
        // hidden 让 $list 不可见
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
      this.calculateStickyHeight()
      addClass($el, STICKY)
    }

    if (customClass) {
      addClass($el, customClass)
    }

    $parentElement.appendChild($el)

    return this
  }

  render() {
    const FIXED = 'outline-chapters_fixed'
    const HIDDEN = 'outline-chapters_hidden'
    const showCode = this.attr('showCode')
    const mounted = this.attr('mounted')
    const $parentElement = this.$parentElement
    let $el
    let $list

    if (!$parentElement) {
      return this
    }

    this._paintEdge()

    $list = this.$list
    _paintChapters($list, this.chapters, showCode)
    removeClass($list, FIXED)
    removeClass($list, HIDDEN)

    $el = this.$el
    this.offsetTop = offsetTop($el)
    this.offsetWidth = $el.offsetWidth

    if (this.isFixed()) {
      this.sticky()
      setProperty('--outline-chapters-width', `${this.offsetWidth}px`)
    }

    if (isFunction(mounted)) {
      mounted.call(this)
    }

    this.onObserver()

    return this
  }

  highlight(id) {
    const $anchor = this.$el.querySelector(`#chapter__anchor-${id}`)
    const HIGHLIGHT = 'outline-chapters_active'
    const $placeholder = this.$placeholder
    let top

    if (!$anchor) {
      return this
    }

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
    const afterSticky = this.attr('afterSticky')
    const FIXED = 'outline-chapters_fixed'
    const $el = this.$el
    const top = this.offsetTop
    const scrollTop = this.$scrollElement.scrollTop
    let isStickying

    if (!this.isFixed()) {
      return this
    }

    isStickying = !!(scrollTop >= top)

    if (isStickying) {
      addClass($el, FIXED)
    } else {
      removeClass($el, FIXED)
    }

    if (isFunction(afterSticky)) {
      afterSticky.call(this, this.isClosed(), isStickying)
    }

    return this
  }

  calculateStickyHeight() {
    const documentElement = document.documentElement
    const height = Math.max(
      documentElement.clientHeight || 0,
      window.innerHeight || 0
    )
    setProperty('--outline-sticky-height', `${height}px`)
    return this
  }

  scrollTo(top, after) {
    const el = this.$scrollElement

    scrollTo(el, top, after)

    return this
  }

  show() {
    const FOLDED = 'outline-chapters_folded'
    const HIDDEN = 'outline-chapters_hidden'
    const opened = this.attr('afterOpened')
    const $el = this.$el
    const $parent = this.$parentElement

    if (this.isInside()) {
      removeClass($parent, HIDDEN)
      removeClass($el, HIDDEN)
      later(() => {
        removeClass($parent, FOLDED)
        removeClass($el, FOLDED)
      }, 30)
    } else {
      removeClass($el, HIDDEN)
    }
    this.closed = false

    if (isFunction(opened)) {
      opened.call(this)
    }

    return this
  }

  hide() {
    const FOLDED = 'outline-chapters_folded'
    const HIDDEN = 'outline-chapters_hidden'
    const closed = this.attr('afterClosed')
    const $el = this.$el
    const $parent = this.$parentElement

    if (this.isInside()) {
      addClass($parent, FOLDED)
      addClass($el, FOLDED)
      later(() => {
        addClass($parent, HIDDEN)
        addClass($el, HIDDEN)
      })
    } else {
      addClass($el, HIDDEN)
    }
    this.closed = true

    if (isFunction(closed)) {
      closed.call(this)
    }

    return this
  }

  toggle() {
    const afterToggle = this.attr('afterToggle')
    const top = this.offsetTop
    const scrollTop = this.$scrollElement.scrollTop
    let isStickying

    if (this.isClosed()) {
      this.show()
    } else {
      this.hide()
    }

    if (isFunction(afterToggle)) {
      later(() => {
        isStickying = !!(scrollTop >= top)
        afterToggle.call(this, this.isClosed(), isStickying)
      })
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

    if (this.scrollTimer) {
      clearTimeout(this.scrollTimer)
      this.scrollTimer = null
    }

    if (this.resizeTimer) {
      clearTimeout(this.resizeTimer)
      this.resizeTimer = null
    }

    if (isFunction(afterDestroy)) {
      afterDestroy.call(this)
    }

    if (this.Observer) {
      this.Observer = null
    }

    return this
  }

  onObserver() {
    const selector = this.attr('selector')
    let timer = null

    this.Observer = intersection(
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
      {
        selector,
        context: this
      }
    )

    return this
  }

  onSelect(evt) {
    const stickyHeight = this.attr('stickyHeight')
    const $anchor = evt.delegateTarget
    const id = $anchor.getAttribute('data-id')
    const headingId = $anchor.href.split('#')[1]
    const $heading = document.querySelector(`#${headingId}`)
    const top = offsetTop($heading) - (stickyHeight + 10)
    const min = 0
    const max = this.$scrollElement.scrollHeight
    const afterScroll = this.attr('afterScroll')
    const after = () => {
      if (isFunction(afterScroll)) {
        afterScroll.call(this, 'chapter')
      }

      later(() => {
        this.playing = false
        publish('toolbar:update', {
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

    if (this.scrollTimer) {
      clearTimeout(this.scrollTimer)
    }

    this.scrollTimer = later(() => {
      const top = $scrollElement.scrollTop
      const min = 0
      const max = $scrollElement.scrollHeight - $scrollElement.clientHeight

      if (this.isFixed()) {
        this.sticky()
      }

      publish('toolbar:update', {
        top,
        min,
        max
      })
    }, 100)

    return this
  }

  onResize() {
    if (this.resizeTimer) {
      clearTimeout(this.resizeTimer)
    }

    this.resizeTimer = later(() => {
      this.calculateStickyHeight()
    })

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
    at($element, 'scroll', this.onScroll, this, true)
    if (this.isSticky()) {
      at($element, 'resize', this.onResize, this, true)
    }

    return this
  }

  removeListeners() {
    const selector = this.attr('selector')
    const $el = this.$el
    const $scrollElement = this.$scrollElement
    const tagName = $scrollElement.tagName.toLowerCase()
    let $element = $scrollElement

    if (tagName === 'html' || tagName === 'body') {
      $element = window
    }

    off($el, 'click', this.onSelect)
    off($element, 'scroll', this.onScroll)

    if (this.isSticky()) {
      at($element, 'resize', this.onResize)
    }

    if (this.Observer) {
      document.querySelectorAll(selector).forEach((section) => {
        this.Observer.unobserve(section)
      })
    }

    return this
  }
}

Chapters.DEFAULTS = {
  parentElement: '',
  scrollElement: '',
  selector: '.outline-heading',
  active: 0,
  closed: false,
  showCode: true,
  position: 'relative',
  stickyHeight: 0,
  chapters: [],
  created: null,
  mounted: null,
  afterClosed: null,
  afterOpened: null,
  afterScroll: null,
  beforeDestroy: null,
  afterDestroy: null,
  afterSticky: null
}

export default Chapters
