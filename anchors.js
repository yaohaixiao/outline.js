import isString from './utils/types/isString'
import isFunction from './utils/types/isFunction'
import isElement from './utils/types/isElement'
import cloneDeep from './utils/lang/cloneDeep'
import timeSlice from './utils/lang/timeSlice'
import later from './utils/lang/later'
import scrollTo from './utils/dom/scrollTo'
import _getScrollElement from './utils/dom/_getScrollElement'
import offsetTop from './utils/dom/offsetTop'
import on from './utils/event/on'
import off from './utils/event/off'
import stop from './utils/event/stop'
import paint from './utils/icons/paint'

import _updateHeading from './_updateHeading'
import _removeHeading from './_removeHeading'
import getChapters from './getChapters'

import Base from './base'

class Anchors extends Base {
  constructor(options) {
    super()

    this._default()

    if (options) {
      this.initialize(options)
    }
  }

  _default() {
    this.attrs = cloneDeep(Anchors.DEFAULTS)

    this.$articleElement = null
    this.$scrollElement = null
    this.$headings = []

    return this
  }

  initialize(options) {
    let created
    let scrollElement
    let $articleElement
    let articleElement

    this.attr(options)

    articleElement = this.attr('articleElement')
    scrollElement = this.attr('scrollElement')
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
    this.$headings = this.getHeadings()

    if (this.$headings.length < 1) {
      return this
    }

    if (isFunction(created)) {
      created.call(this)
    }

    this.render().addListeners()

    return this
  }

  getHeadings() {
    const $articleElement = this.$articleElement
    const selector = this.attr('selector')

    return [...$articleElement.querySelectorAll(selector)]
  }

  count() {
    return this.getHeadings().length
  }

  render() {
    const articleElement = this.attr('articleElement')
    const selector = this.attr('selector')
    const showCode = this.attr('showCode') || true
    const chapterTextFilter = this.attr('chapterTextFilter')
    const mounted = this.attr('mounted')
    const chapters = getChapters({
      articleElement,
      selector,
      showCode,
      chapterTextFilter
    })

    paint()

    this._paint(chapters)

    if (isFunction(mounted)) {
      mounted.call(this)
    }

    return this
  }

  erase() {
    this._remove()

    return this
  }

  _paint(chapters) {
    const LIMIT = 400
    const hasAnchor = this.attr('hasAnchor')
    const isAtStart = this.attr('isAtStart')
    const showCode = this.attr('showCode')
    const anchorURL = this.attr('anchorURL')
    const count = this.count()
    const $headings = [...this.$headings]
    const update = (headings, group) => {
      headings.forEach(($heading, i) => {
        const id = i + group * LIMIT
        const chapterCode = chapters[id].code
        _updateHeading($heading, id, {
          hasAnchor,
          isAtStart,
          showCode,
          chapterCode,
          anchorURL
        })
      })
    }
    let groupIndex = -1

    // 针对超长的文章，进行 timeSlice 处理
    if (count > LIMIT) {
      groupIndex += 1
      // 同步绘制 Limit 以内的标题链接（可以确保 50ms 完成绘制）
      update($headings.splice(0, LIMIT), 0)
      // 采用 timeSlice 处理机制绘制剩余的标题
      while ($headings.length > 0) {
        const once = $headings.splice(0, LIMIT)
        timeSlice(
          () => {
            update(once, (groupIndex += 1))
          },
          () => {
            this.$emit('anchors:all:paint')
          }
        )
      }
    } else {
      update($headings, 0)
    }

    return this
  }

  _remove() {
    const hasAnchor = this.attr('hasAnchor')
    const isAtStart = this.attr('isAtStart')
    const $headings = this.$headings

    $headings.forEach(($heading) => {
      _removeHeading($heading, hasAnchor, isAtStart)
    })

    return this
  }

  refresh(chapters) {
    const articleElement = this.attr('articleElement')
    const selector = this.attr('selector')
    const showCode = this.attr('showCode') || true
    const chapterTextFilter = this.attr('chapterTextFilter')

    this.$headings = this.getHeadings()

    this.erase()._paint(
      chapters ||
        getChapters({
          articleElement,
          selector,
          showCode,
          chapterTextFilter
        })
    )

    return this
  }

  scrollTo(top, after) {
    const el = this.$scrollElement

    scrollTo(el, top, after)

    return this
  }

  destroy() {
    const beforeDestroy = this.attr('beforeDestroy')
    const afterDestroy = this.attr('afterDestroy')

    if (isFunction(beforeDestroy)) {
      beforeDestroy.call(this)
    }

    this.removeListeners()._remove()._default()

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

  onRefresh(chapters) {
    this.refresh(chapters)

    return this
  }

  addListeners() {
    const $articleElement = this.$articleElement

    if (this.count() < 1) {
      return this
    }

    on(
      $articleElement,
      '.outline-heading__anchor',
      'click',
      this.onAnchorTrigger,
      this,
      true
    )

    this.$on('anchors:refresh', this.onRefresh)

    return this
  }

  removeListeners() {
    const $articleElement = this.$articleElement

    if (this.count() < 1) {
      return this
    }

    off($articleElement, 'click', this.onAnchorTrigger)
    this.$off('anchors:refresh', this.onRefresh)

    return this
  }
}

Anchors.DEFAULTS = (() => {
  const OPTIONS = {
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

  return cloneDeep(OPTIONS)
})()

export default Anchors
