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
import getStyle from './utils/dom/getStyle'
import setProperty from './utils/dom/setProperty'
import _getScrollElement from './utils/dom/_getScrollElement'
import cloneDeep from './utils/lang/cloneDeep'

import _paintChapters from './_paintChapters'
import inBounding from './utils/dom/inBounding'

import Base from './base'

class Navigator extends Base {
  constructor(options) {
    super()

    this._default()

    this.scrollTimer = null
    this.resizeTimer = null
    this.observerTimer = null
    this.Observer = null

    if (options) {
      this.initialize(options)
    }
  }

  _default() {
    this.attrs = cloneDeep(Navigator.DEFAULTS)

    this.$el = null
    this.$title = null
    this.$main = null
    this.$list = null
    this.$placeholder = null
    this.$parentElement = null
    this.$scrollElement = null
    this.$active = null

    this.chapters = []
    this.active = 0
    this.offsetWidth = 0
    this.offsetTop = 0
    this.playing = false
    this.closed = false

    return this
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

  count() {
    return this.chapters.length
  }

  _paintEdge() {
    const $fragment = document.createDocumentFragment()
    const STICKY = 'outline-navigator_sticky'
    const HIDDEN = 'outline-navigator_hidden'
    const title = this.attr('title')
    const animationCurrent = this.attr('animationCurrent')
    const customClass = this.attr('customClass')
    const $parentElement = this.$parentElement
    const children = []
    const contents = []
    let $title = null
    let $el
    let $main
    let $list
    let $placeholder

    if (!$parentElement) {
      return this
    }

    if (this.isInside() && title) {
      $title = createElement(
        'h2',
        {
          className: 'outline-navigator__title'
        },
        title
      )
      this.$title = $title
      contents.push($title)
    }

    $list = createElement('ul', {
      // 为优化性能，添加了 _fixed 和 _hidden
      // fixed 为了让 $list 脱离流布局
      // hidden 让 $list 不可见
      className: `outline-navigator__list`
    })
    this.$list = $list
    children.push($list)

    if (animationCurrent) {
      $placeholder = createElement('div', {
        className: 'outline-navigator__placeholder'
      })
      this.$placeholder = $placeholder
      children.push($placeholder)
    }

    $main = createElement(
      'div',
      {
        className: 'outline-navigator__main'
      },
      children
    )
    this.$main = $main
    contents.push($main)

    $el = createElement(
      'nav',
      {
        id: 'outline-navigator',
        className: `outline-navigator ${HIDDEN}`
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
    $fragment.appendChild($el)
    $parentElement.appendChild($fragment)

    return this
  }

  render() {
    const mounted = this.attr('mounted')
    const $parentElement = this.$parentElement
    const chapters = this.chapters
    const count = this.count()
    let $el

    if (!$parentElement || chapters.length < 1) {
      return this
    }

    if (this.isInside()) {
      addClass($parentElement, 'outline-navigator-parent')
    }

    this._paintEdge()
    $el = this.$el

    this._paint(chapters)

    later(() => {
      this.highlight(this.active)
    }, 60)

    this.offsetTop = offsetTop($el)
    this.offsetWidth = $el.offsetWidth

    if (this.isFixed()) {
      this.sticky()
      setProperty('--outline-navigator-width', `${this.offsetWidth}px`)
    }

    if (isFunction(mounted)) {
      mounted.call(this)
    }

    if (count < 400) {
      this.onObserver()
    }

    return this
  }

  erase() {
    this.$list.innerHTML = ''

    return this
  }

  _paint(chapters) {
    const HIDDEN = 'outline-navigator_hidden'
    const showCode = this.attr('showCode')
    const $el = this.$el
    const $list = this.$list

    _paintChapters($list, chapters, showCode)
    removeClass($el, HIDDEN)

    return this
  }

  _remove() {
    this.$parentElement.removeChild(this.$el)
    return this
  }

  refresh(chapters) {
    const HIDDEN = 'outline-navigator_hidden'
    const $el = this.$el

    removeClass($el, HIDDEN)
    this.erase()._paint(chapters)

    return this
  }

  _getPlaceholderOffset(index) {
    const $main = this.$main
    const $list = this.$list
    const $anchor = $list.querySelector('.outline-navigator__anchor')
    const animationCurrent = this.attr('animationCurrent')
    const mainPaddingTop = parseInt(getStyle($main, 'padding-top'), 10)
    const mainBorderTop = parseInt(getStyle($main, 'border-top-width'), 10)
    const placeholderPaddingTop = parseInt(getStyle($list, 'padding-top'), 10)
    const placeholderMarginTop = parseInt(getStyle($list, 'margin-top'), 10)
    const placeholderBorderTop = parseInt(
      getStyle($list, 'border-top-width'),
      10
    )
    let height = $anchor.offsetHeight
    let offsetTop = 0
    let top

    if (!animationCurrent) {
      return this
    }

    if (mainPaddingTop) {
      offsetTop += mainPaddingTop
    }

    if (placeholderPaddingTop) {
      offsetTop += placeholderPaddingTop
    }

    if (placeholderMarginTop) {
      offsetTop += placeholderMarginTop
    }

    if (mainBorderTop) {
      offsetTop += mainBorderTop
    }

    if (placeholderBorderTop) {
      offsetTop += placeholderBorderTop
    }

    top = height * index

    return offsetTop + top
  }

  positionPlaceholder(index) {
    const $list = this.$list
    const $placeholder = this.$placeholder
    const $anchor = $list.querySelector('.outline-navigator__anchor')
    const animationCurrent = this.attr('animationCurrent')
    const height = $anchor.offsetHeight
    let offsetTop = 0

    if (!animationCurrent) {
      return this
    }

    offsetTop = this._getPlaceholderOffset(index)

    $placeholder.style.cssText = `transform: translateY(${offsetTop}px);height:${height}px;`

    return this
  }

  highlight(id) {
    const $el = this.$el
    const animationCurrent = this.attr('animationCurrent')
    const ACTIVE = 'outline-navigator_active'
    const HIGHLIGHT = 'outline-navigator_highlight'
    let $anchor = null
    let placeholderOffsetTop = 0

    if (!$el) {
      return this
    }

    $anchor = $el.querySelector(`#chapter__anchor-${id}`)

    if (!$anchor) {
      return this
    }

    this.active = parseInt($anchor.getAttribute('data-id'), 10)

    if (this.$active) {
      removeClass(this.$active, HIGHLIGHT)
      removeClass(this.$active, ACTIVE)
    }

    this.$active = $anchor
    addClass(this.$active, ACTIVE)

    if (animationCurrent) {
      this.positionPlaceholder(this.active)

      later(() => {
        if (!inBounding(this.$active, this.$parentElement)) {
          placeholderOffsetTop = this._getPlaceholderOffset(this.active)
          scrollTo(this.$main, placeholderOffsetTop)
        }
      })
    } else {
      addClass(this.$active, HIGHLIGHT)
    }

    return this
  }

  sticky() {
    const afterSticky = this.attr('afterSticky')
    const FIXED = 'outline-navigator_fixed'
    const $el = this.$el
    const top = this.offsetTop
    const scrollTop = this.$scrollElement.scrollTop
    let isStickying

    if (!this.isFixed()) {
      return this
    }

    isStickying = scrollTop >= top

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
    const FOLDED = 'outline-navigator_folded'
    const HIDDEN = 'outline-navigator_hidden'
    const opened = this.attr('afterOpened')
    const count = this.count()
    const $el = this.$el
    const $parent = this.$parentElement

    if (this.isInside()) {
      if (count > 800) {
        removeClass($parent, HIDDEN)
      } else {
        removeClass($parent, HIDDEN)
        later(() => {
          removeClass($parent, FOLDED)
        }, 30)
      }
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
    const FOLDED = 'outline-navigator_folded'
    const HIDDEN = 'outline-navigator_hidden'
    const closed = this.attr('afterClosed')
    const count = this.count()
    const $el = this.$el
    const $parent = this.$parentElement

    if (this.isInside()) {
      if (count > 800) {
        addClass($parent, HIDDEN)
      } else {
        addClass($parent, FOLDED)
        later(() => {
          addClass($parent, HIDDEN)
        })
      }
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
        isStickying = scrollTop >= top
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

    this.removeListeners()._remove()._default()

    if (this.scrollTimer) {
      clearTimeout(this.scrollTimer)
      this.scrollTimer = null
    }

    if (this.resizeTimer) {
      clearTimeout(this.resizeTimer)
      this.resizeTimer = null
    }

    if (this.observerTimer) {
      clearTimeout(this.observerTimer)
      this.observerTimer = null
    }

    if (this.Observer) {
      this.Observer = null
    }

    if (isFunction(afterDestroy)) {
      afterDestroy.call(this)
    }

    return this
  }

  onObserver() {
    const selector = this.attr('selector')

    this.Observer = intersection(
      ($heading) => {
        const id = $heading.getAttribute('data-id')

        if (this.playing) {
          return false
        }

        if (this.observerTimer) {
          clearTimeout(this.observerTimer)
        }

        this.observerTimer = later(() => {
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
        this.$emit('toolbar:update', {
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

      this.$emit('toolbar:update', {
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

    if (this.count() < 1) {
      return this
    }

    if (tagName === 'html' || tagName === 'body') {
      $element = window
    }

    on($el, '.outline-navigator__anchor', 'click', this.onSelect, this, true)
    at($element, 'scroll', this.onScroll, this, true)
    if (this.isSticky()) {
      at(window, 'resize', this.onResize, this, true)
    }
    this.$on('anchors:all:paint', this.onObserver, this)

    return this
  }

  removeListeners() {
    const selector = this.attr('selector')
    const $el = this.$el
    const $scrollElement = this.$scrollElement
    const tagName = $scrollElement.tagName.toLowerCase()
    let $element = $scrollElement

    if (this.count() < 1) {
      return this
    }

    if (tagName === 'html' || tagName === 'body') {
      $element = window
    }

    off($el, 'click', this.onSelect)
    off($element, 'scroll', this.onScroll)
    if (this.isSticky()) {
      off(window, 'resize', this.onResize)
    }
    this.$off('anchors:all:paint')

    if (this.Observer) {
      document.querySelectorAll(selector).forEach((section) => {
        this.Observer.unobserve(section)
      })
    }

    return this
  }
}

Navigator.DEFAULTS = (() => {
  const OPTIONS = {
    parentElement: '',
    scrollElement: '',
    selector: '.outline-heading',
    active: 0,
    closed: false,
    showCode: true,
    animationCurrent: true,
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

  return cloneDeep(OPTIONS)
})()

export default Navigator
