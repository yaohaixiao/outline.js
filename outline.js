import later from './utils/lang/later'
import cloneDeep from './utils/lang/cloneDeep'
import toTree from './utils/lang/toTree'
import isFunction from './utils/types/isFunction'
import isString from './utils/types/isString'
import isElement from './utils/types/isElement'
import addClass from './utils/dom/addClass'
import scrollTo from './utils/dom/scrollTo'
import _getScrollElement from './utils/dom/_getScrollElement'

import Base from './base'
import Anchors from './anchors'
import Drawer from './drawer'
import Chapters from './chapters'
import Reader from './reader'
import Toolbar from './toolbar'

import getChapters from './getChapters'

const ENTER_READING_TIP = '进入阅读模式，按 ESC 键可退出阅读模式'

class Outline extends Base {
  constructor(options) {
    super()

    this.attrs = cloneDeep(Outline.DEFAULTS)
    this.$article = null
    this.buttons = []

    this.anchors = null
    this.drawer = null
    this.chapters = null
    this.reader = null
    this.toolbar = null

    this.reading = false

    if (options) {
      this.initialize(options)
    }
  }

  initialize(options) {
    let articleElement = ''

    this.attr(options)

    articleElement = this.attr('articleElement')

    if (isString(articleElement)) {
      this.$article = document.querySelector(articleElement)
    } else if (isElement(articleElement)) {
      this.$article = articleElement
    }

    this.$emit('created', { ...this.attr() })
    this.render().addListeners()

    return this
  }

  getChapters(isTreeStructured = false) {
    const $article = this.$article
    const selector = this.attr('selector')
    const showCode = this.attr('showCode') || true
    const chapterTextFilter = this.attr('chapterTextFilter')
    let $headings = []
    let chapters = []

    if (!$article) {
      return chapters
    }

    $headings = [...$article.querySelectorAll(selector)]
    chapters = getChapters($headings, showCode, chapterTextFilter)

    return isTreeStructured ? toTree(chapters, 'id', 'pid') : chapters
  }

  count() {
    return this.getChapters().length
  }

  render() {
    const hasToolbar = this.attr('hasToolbar')
    const scrollElement = this.attr('scrollElement')
    let $scrollElement

    if (isString(scrollElement)) {
      $scrollElement = document.querySelector(scrollElement)
    } else if (isElement(scrollElement)) {
      $scrollElement = scrollElement
    }

    this._renderReader()._renderAnchors()._renderChapters()._renderToolbar()

    if ($scrollElement && hasToolbar) {
      this.onToolbarUpdate({
        top: $scrollElement.scrollTop,
        min: 0,
        max: $scrollElement.scrollHeight
      })
    }

    this.$emit('mounted')

    return this
  }

  refresh() {
    const chapters = this.getChapters()

    this.anchors.refresh(chapters)
    this.chapters.refresh(chapters)
    this.$paper.refresh()

    return this
  }

  _renderReader() {
    const option = this.attr('reader')

    if (!option.target) {
      return this
    }

    addClass(this.$article, 'outline-article')

    new Reader(option)

    return this
  }

  _renderAnchors() {
    const articleElement = this.attr('articleElement')
    const selector = this.attr('selector')
    const stickyHeight = this.attr('stickyHeight')
    const scrollElement = this.attr('scrollElement')
    const showCode = this.attr('showCode')
    const anchorURL = this.attr('anchorURL')
    const afterScroll = this.attr('afterScroll')
    const chapterTextFilter = this.attr('chapterTextFilter')

    this.anchors = new Anchors({
      articleElement,
      stickyHeight,
      scrollElement,
      selector,
      showCode,
      anchorURL,
      afterScroll,
      chapterTextFilter
    })

    return this
  }

  _renderChapters() {
    const title = this.attr('title')
    const stickyHeight = this.attr('stickyHeight')
    const scrollElement = this.attr('scrollElement')
    const customClass = this.attr('customClass')
    const showCode = this.attr('showCode')
    const animationCurrent = this.attr('animationCurrent')
    const closeOnClickModal = this.attr('closeOnClickModal')
    const showNavModalFirst = this.attr('showNavModalFirst')
    const position = this.attr('position')
    const placement = this.attr('placement')
    const afterSticky = this.attr('afterSticky')
    const afterToggle = this.attr('afterToggle')
    const afterScroll = this.attr('afterScroll')
    const count = this.count()
    let parentElement = this.attr('parentElement')
    let CHAPTERS_OPTIONS

    if (count < 1) {
      return this
    }

    CHAPTERS_OPTIONS = {
      scrollElement,
      showCode,
      animationCurrent,
      position,
      title,
      stickyHeight,
      chapters: this.getChapters(),
      afterSticky,
      afterToggle,
      afterScroll
    }

    if (position === 'relative') {
      this.drawer = new Drawer({
        placement,
        title,
        size: 'tiny',
        hasOffset: true,
        hasPadding: false,
        closeOnClickModal,
        customClass,
        afterClosed: () => {
          const toolbar = this.toolbar
          toolbar.toggle()
        }
      })
      parentElement = this.drawer.$main

      if (showNavModalFirst) {
        this.drawer.open()
      }
    } else {
      CHAPTERS_OPTIONS.customClass = customClass
    }

    CHAPTERS_OPTIONS.parentElement = parentElement
    this.chapters = new Chapters(CHAPTERS_OPTIONS)

    return this
  }

  _renderToolbar() {
    const position = this.attr('position')
    const hasToolbar = this.attr('hasToolbar')
    const showNavModalFirst = this.attr('showNavModalFirst')
    const placement = this.attr('placement')
    const homepage = this.attr('homepage')
    const git = this.attr('git')
    const tags = this.attr('tags')
    const issues = this.attr('issues')
    const tools = this.attr('tools')
    const option = this.attr('reader')
    const count = this.count()
    const UP = {
      name: 'up',
      icon: 'up',
      size: 20,
      action: {
        type: 'click',
        handler: 'toolbar:action:up'
      }
    }
    const HOME = {
      name: 'homepage',
      icon: 'homepage',
      size: 20,
      link: homepage
    }
    const GIT = {
      name: 'github',
      icon: 'github',
      size: 20,
      link: git
    }
    const TAGS = {
      name: 'tags',
      icon: 'tags',
      size: 20,
      link: tags
    }
    const ISSUES = {
      name: 'issues',
      icon: 'issues',
      size: 20,
      link: issues
    }
    const MENU = {
      name: 'menu',
      icon: 'menu',
      size: 18,
      action: {
        type: 'click',
        handler: 'toolbar:action:toggle'
      }
    }
    const READING = {
      name: 'reading',
      icon: 'file',
      size: 18,
      action: {
        type: 'click',
        handler: 'toolbar:action:reading'
      }
    }
    const PRINT = {
      name: 'print',
      icon: 'print',
      size: 20,
      action: {
        type: 'click',
        handler: 'toolbar:action:print'
      }
    }
    const DOWN = {
      name: 'down',
      icon: 'down',
      size: 20,
      action: {
        type: 'click',
        handler: 'toolbar:action:down'
      }
    }
    const buttons = []

    if (!hasToolbar) {
      return this
    }

    buttons.push(UP)
    if (count > 0) {
      buttons.push(MENU)
    }
    if (homepage) {
      buttons.push(HOME)
    }
    if (git) {
      buttons.push(GIT)
    }
    if (tags) {
      buttons.push(TAGS)
    }
    if (issues) {
      buttons.push(ISSUES)
    }
    if (option.target) {
      buttons.push(READING)
      if (isFunction(print)) {
        buttons.push(PRINT)
      }
    }
    if (tools?.length > 0) {
      buttons.push(...tools)
    }
    buttons.push(DOWN)
    this.buttons = [...buttons]

    this.toolbar = new Toolbar({
      placement,
      buttons
    })

    if (position === 'relative' && showNavModalFirst) {
      this.toolbar.hide()
    }

    return this
  }

  addButton(button) {
    const toolbar = this.toolbar
    const buttons = this.buttons
    buttons.splice(-1, 0, button)
    toolbar.attr({
      buttons
    })
    toolbar.refresh()
    return this
  }

  removeButton(name) {
    this.toolbar.remove(name)
    return this
  }

  toTop() {
    const afterScroll = this.attr('afterScroll')
    const toolbar = this.toolbar
    const chapters = this.chapters
    const count = this.count()
    const afterTop = () => {
      toolbar.hide('up')
      toolbar.show('down')

      if (count > 0) {
        chapters.highlight(0)
        chapters.playing = false
      }

      if (isFunction(afterScroll)) {
        afterScroll.call(toolbar, 'up')
      }
    }

    if (count > 0) {
      chapters.playing = true
    }
    this.scrollTo(0, afterTop)

    return this
  }

  toBottom() {
    const afterScroll = this.attr('afterScroll')
    const $scrollElement = _getScrollElement(this.attr('scrollElement'))
    const toolbar = this.toolbar
    const chapters = this.chapters
    const count = this.count()
    const top = Math.floor(
      $scrollElement.scrollHeight - $scrollElement.clientHeight
    )
    const afterDown = () => {
      toolbar.hide('down')
      toolbar.show('up')

      if (count > 0) {
        chapters.highlight(count - 1)
        chapters.playing = false
      }

      if (isFunction(afterScroll)) {
        afterScroll.call(toolbar, 'bottom')
      }
    }

    if (count > 0) {
      chapters.playing = true
    }
    this.scrollTo(top, afterDown)

    return this
  }

  scrollTo(top, afterScroll) {
    const scrollElement = this.attr('scrollElement')
    scrollTo(scrollElement, top, afterScroll)
    return this
  }

  enterReading() {
    this.reader.enter()
    this.toolbar.toggle()

    return this
  }

  exitReading() {
    this.reader.exit()
    this.toolbar.toggle()

    return this
  }

  switchReading() {
    const reader = this.reader

    if (!reader) {
      return this
    }

    reader.toggle()

    return this
  }

  toggle() {
    const position = this.attr('position')
    const toolbar = this.toolbar
    const drawer = this.drawer
    const chapters = this.chapters
    const count = this.count()

    if (count < 1) {
      return this
    }

    if (position !== 'relative') {
      chapters.toggle()
      toolbar.highlight('menu')
    } else {
      toolbar.toggle()

      later(() => {
        drawer.toggle()
      })
    }

    return this
  }

  print() {
    this.reader.print()

    return this
  }

  destroy() {
    let anchors = this.anchors
    let chapters = this.chapters
    let drawer = this.drawer
    let reader = this.reader
    let toolbar = this.toolbar
    let isOutside = false
    const count = this.count()

    this.$emit('beforeDestroy')

    this.removeListeners()

    if (reader) {
      reader.destroy()
      reader = null
    }

    if (count > 0 && chapters) {
      isOutside = chapters.isOutside()

      chapters.destroy()
      chapters = null

      if (isOutside && drawer) {
        drawer.destroy()
        drawer = null
      }
    }

    if (anchors) {
      anchors.destroy()
      anchors = null
    }

    if (toolbar) {
      toolbar.destroy()
      toolbar = null
    }

    this.attr(Outline.DEFAULTS)

    return this
  }

  onToggle() {
    this.toggle()
    return this
  }

  onScrollTop() {
    this.toTop()
    return this
  }

  onScrollBottom() {
    this.toBottom()
    return this
  }

  onToolbarUpdate({ top, min, max }) {
    const toolbar = this.toolbar
    const current = Math.ceil(top)

    if (current <= min) {
      toolbar.hide('up')
      toolbar.show('down')
    } else if (current >= max) {
      toolbar.hide('down')
      toolbar.show('up')
    } else if (current > min && current < max) {
      toolbar.show('up')
      toolbar.show('down')
    }

    return this
  }

  addListeners() {
    const hasToolbar = this.attr('hasToolbar')

    if (!hasToolbar) {
      return this
    }

    this.$on('toolbar:update', this.onToolbarUpdate)
    this.$on('toolbar:action:up', this.onScrollTop)
    this.$on('toolbar:action:toggle', this.onToggle)
    this.$on('toolbar:action:down', this.onScrollBottom)

    return this
  }

  removeListeners() {
    const hasToolbar = this.attr('hasToolbar')

    if (!hasToolbar) {
      return this
    }

    this.$off('toolbar:update')
    this.$off('toolbar:action:up')
    this.$off('toolbar:action:toggle')
    this.$off('toolbar:action:down')

    return this
  }
}

Outline.DEFAULTS = {
  articleElement: '#article',
  selector: 'h2,h3,h4,h5,h6',
  title: '目录',
  scrollElement: 'html,body',
  position: 'relative',
  parentElement: '#aside',
  placement: 'rtl',
  animationCurrent: true,
  showCode: true,
  hasToolbar: true,
  closeOnClickModal: true,
  showNavModalFirst: false,
  anchorURL: '',
  stickyHeight: 0,
  homepage: '',
  git: '',
  tags: '',
  issues: '',
  tools: [],
  reader: {
    target: '',
    title: '',
    enterReadingTip: ENTER_READING_TIP
  },
  customClass: '',
  afterSticky: null,
  afterToggle: null,
  afterScroll: null,
  chapterTextFilter: null
}

if (window.jQuery) {
  // 将 Outline 扩展为一个 jquery 插件
  // eslint-disable-next-line no-undef
  jQuery.extend(jQuery.fn, {
    outline: function (options) {
      // eslint-disable-next-line no-undef
      let $article = jQuery(this)

      return new Outline(
        // eslint-disable-next-line no-undef
        jQuery.extend({}, options, {
          articleElement: $article
        })
      )
    }
  })
}

export default Outline
