import isString from './utils/types/isString'
import isFunction from './utils/types/isFunction'
import isElement from './utils/types/isElement'
import timeSlice from './utils/lang/timeSlice'
import toTree from './utils/lang/toTree'
import later from './utils/lang/later'
import scrollTo from './utils/dom/scrollTo'
import _getScrollElement from './utils/dom/_getScrollElement'
import offsetTop from './utils/dom/offsetTop'
import on from './utils/event/on'
import off from './utils/event/off'
import stop from './utils/event/stop'
import paint from './utils/icons/paint'

import _updateHeading from './_updateHeading'
import _resetHeading from './_resetHeading'
import getChapters from './getChapters'

import Base from './base'

class Anchors extends Base {
  constructor(options) {
    super()

    this.attrs = Anchors.DEFAULTS
    this.$articleElement = null
    this.$scrollElement = null
    this.$headings = []
    this.chapters = []

    if (options) {
      this.initialize(options)
    }
  }

  initialize(options) {
    const showCode = this.attr('showCode') || true
    let created
    let scrollElement
    let selector
    let $articleElement
    let articleElement

    this.attr(options)
    articleElement = this.attr('articleElement')
    scrollElement = this.attr('scrollElement')
    selector = this.attr('selector')
    created = this.attr('created')

    if (isString(articleElement)) {
      $articleElement = document.querySelector(articleElement)
    } else if (isElement(articleElement)) {
      $articleElement = articleElement
    }

    if (!$articleElement) {
      return this
    }

    this.$articleElement = $articleElement
    this.$scrollElement = _getScrollElement(scrollElement)
    console.time('query headings')
    this.$headings = [...$articleElement.querySelectorAll(selector)]
    console.timeEnd('query headings')

    if (this.$headings.length < 1) {
      return this
    }

    console.time('getChapters')
    this.chapters = getChapters(
      this.$headings,
      showCode,
      this.attr('chapterTextFilter')
    )
    console.timeEnd('getChapters')

    if (isFunction(created)) {
      created.call(this)
    }

    this.render().addListeners()

    return this
  }

  getChapters(isTreeStructured = false) {
    const chapters = this.chapters
    return isTreeStructured ? toTree(chapters, 'id', 'pid') : chapters
  }

  count() {
    return this.chapters.length
  }

  render() {
    const mounted = this.attr('mounted')
    const hasAnchor = this.attr('hasAnchor')
    const isAtStart = this.attr('isAtStart')
    const showCode = this.attr('showCode')
    const anchorURL = this.attr('anchorURL')
    const count = this.count()
    const $headings = [...this.$headings]
    const chapters = this.getChapters()
    const update = (headings) => {
      console.time('update anchors once')
      headings.forEach(($heading, i) => {
        const chapterCode = chapters[i].code
        _updateHeading($heading, i, {
          hasAnchor,
          isAtStart,
          showCode,
          chapterCode,
          anchorURL
        })
      })
      console.timeEnd('update anchors once')
    }

    console.time('paint svg')
    paint()
    console.timeEnd('paint svg')

    console.time('update anchors')
    console.log('count', count)
    if (count > 400) {
      console.log('timeSlice')
      while ($headings.length > 0) {
        const $once = $headings.splice(0, 400)
        timeSlice(() => {
          update($once)
        })
      }
    } else {
      console.log('one time')
      update($headings)
    }
    console.timeEnd('update anchors')

    if (isFunction(mounted)) {
      mounted.call(this)
    }

    return this
  }

  scrollTo(top, after) {
    const el = this.$scrollElement

    scrollTo(el, top, after)

    return this
  }

  destroy() {
    const hasAnchor = this.attr('hasAnchor')
    const isAtStart = this.attr('isAtStart')
    const beforeDestroy = this.attr('beforeDestroy')
    const afterDestroy = this.attr('afterDestroy')
    const $headings = this.$headings

    if (isFunction(beforeDestroy)) {
      beforeDestroy.call(this)
    }

    this.removeListeners()
    $headings.forEach(($heading) => {
      _resetHeading($heading, hasAnchor, isAtStart)
    })

    this.attr(Anchors.DEFAULTS)
    this.$articleElement = null
    this.$scrollElement = null
    this.$headings = []
    this.chapters = []

    if (isFunction(afterDestroy)) {
      afterDestroy.call(this)
    }

    return this
  }

  onAnchorTrigger(evt) {
    const anchorURL = this.attr('anchorURL')
    const afterScroll = this.attr('afterScroll')
    const stickyHeight = this.attr('stickyHeight')
    const $anchor = evt.delegateTarget
    const $heading = $anchor.parentNode
    const top = offsetTop($heading) - (stickyHeight + 10)
    const $scrollElement = this.$scrollElement
    const min = 0
    const max = $scrollElement.scrollHeight - $scrollElement.clientHeight
    const after = () => {
      if (isFunction(afterScroll)) {
        afterScroll.call(this, 'anchor')
      }

      later(() => {
        this.$emit('toolbar:update', {
          top,
          min,
          max
        })
      })
    }

    this.scrollTo(top, after)

    if (!anchorURL) {
      stop(evt)
    }

    return this
  }

  addListeners() {
    const $articleElement = this.$articleElement

    on(
      $articleElement,
      '.outline-heading__anchor',
      'click',
      this.onAnchorTrigger,
      this,
      true
    )

    return this
  }

  removeListeners() {
    const $articleElement = this.$articleElement

    off($articleElement, 'click', this.onAnchorTrigger)

    return this
  }
}

Anchors.DEFAULTS = {
  scrollElement: 'html,body',
  articleElement: '#article',
  selector: 'h1,h2,h3,h4,h5,h6',
  stickyHeight: 0,
  anchorURL: '',
  hasAnchor: true,
  isAtStart: true,
  showCode: false,
  created: null,
  mounted: null,
  afterScroll: null,
  beforeDestroy: null,
  afterDestroy: null,
  chapterTextFilter: null
}

export default Anchors
