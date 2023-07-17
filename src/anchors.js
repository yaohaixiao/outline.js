// 在文章的标题生成 anchor 链接
import isString from './utils/types/isString'
import isFunction from './utils/types/isFunction'
import isObject from './utils/types/isObject'
import isElement from './utils/types/isElement'
import extend from './utils/lang/extend'
import hasOwn from './utils/lang/hasOwn'
import scrollTo from './utils/dom/scrollTo'
import _getScrollElement from './utils/dom/_getScrollElement'
import on from './utils/event/on'
import off from './utils/event/off'
import stop from './utils/event/stop'
import { paintSvgSprites } from './utils/icons'

import _updateHeading from './_updateHeading'
import _resetHeading from './_resetHeading'
import getChapters from './getChapters'

const DEFAULTS = {
  root: '#article',
  selector: 'h1,h2,h3,h4,h5,h6',
  scrollElement: '',
  anchorURL: '',
  hasHeadingAnchor: true,
  isAnchorAtStart: true,
  showChapterCode: false,
  created: null,
  mounted: null,
  afterScroll: null,
  beforeDestroy: null,
  afterDestroy: null
}

class Anchors {
  constructor(options) {
    this.attrs = DEFAULTS

    this.$root = null
    this.$scrollElement = null
    this.$headings = []

    this.chapters = []

    if (options) {
      this.initialize(options)
    }
  }

  initialize(options) {
    let created
    let scrollElement
    let selector
    let $root
    let root

    this.attr(options)
    created = this.attr('created')
    scrollElement = this.attr('scrollElement')
    selector = this.attr('selector')
    root = this.attr('root')

    if (isString(root)) {
      $root = document.querySelector(root)
    } else if (isElement(root)) {
      $root = root
    }

    if (!$root) {
      return this
    }

    this.$root = $root
    this.$scrollElement = _getScrollElement(scrollElement)
    this.$headings = [...$root.querySelectorAll(selector)]
    this.chapters = getChapters(this.$headings)

    if (isFunction(created)) {
      created.call(this)
    }

    this.render().addListeners()

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

  getChapters() {
    return this.chapters
  }

  render() {
    const mounted = this.attr('mounted')
    const hasHeadingAnchor = this.attr('hasHeadingAnchor')
    const isAnchorAtStart = this.attr('isAnchorAtStart')
    const showChapterCode = this.attr('showChapterCode')
    const anchorURL = this.attr('anchorURL')
    const $headings = this.$headings
    const chapters = this.getChapters()

    paintSvgSprites()

    $headings.forEach(($heading, i) => {
      const chapterCode = chapters[i].code
      _updateHeading($heading, i, {
        hasHeadingAnchor,
        isAnchorAtStart,
        showChapterCode,
        chapterCode,
        anchorURL
      })
    })

    if (isFunction(mounted)) {
      mounted.call(this)
    }

    return this
  }

  scrollTo(top, afterScroll) {
    const $scrollElement = this.$scrollElement

    scrollTo($scrollElement, top, afterScroll, 100)

    return this
  }

  destroy() {
    const hasHeadingAnchor = this.attr('hasHeadingAnchor')
    const isAnchorAtStart = this.attr('isAnchorAtStart')
    const beforeDestroy = this.attr('beforeDestroy')
    const afterDestroy = this.attr('afterDestroy')
    const $headings = this.$headings

    if (isFunction(beforeDestroy)) {
      beforeDestroy.call(this)
    }

    this.removeListeners()
    $headings.forEach(($heading) => {
      _resetHeading($heading, hasHeadingAnchor, isAnchorAtStart)
    })

    this.attr(DEFAULTS)
    this.$root = null
    this.$scrollElement = null
    this.$headings = []
    this.chapters = []

    if (isFunction(afterDestroy)) {
      afterDestroy.call(this)
    }

    return this
  }

  reload(options) {
    this.destroy().initialize(this.attr(options))
    return this
  }

  onAnchorTrigger(evt) {
    const anchorURL = this.attr('anchorURL')
    const afterScroll = this.attr('afterScroll')
    const $anchor = evt.delegateTarget
    const $heading = $anchor.parentNode

    this.scrollTo($heading.offsetTop, afterScroll)

    if (!anchorURL) {
      stop(evt)
    }

    return this
  }

  addListeners() {
    const $root = this.$root

    on(
      $root,
      '.outline-heading__anchor',
      'click',
      this.onAnchorTrigger,
      this,
      true
    )

    return this
  }

  removeListeners() {
    const $root = this.$root

    off($root, 'click', this.onAnchorTrigger)

    return this
  }
}

export default Anchors
