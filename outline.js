import later from './utils/lang/later'
import cloneDeep from './utils/lang/cloneDeep'
import isFunction from './utils/types/isFunction'
import isString from './utils/types/isString'
import isElement from './utils/types/isElement'
import addClass from './utils/dom/addClass'
import removeClass from './utils/dom/removeClass'
import scrollTo from './utils/dom/scrollTo'
import _getScrollElement from './utils/dom/_getScrollElement'
import at from './utils/event/at'
import on from './utils/event/on'
import off from './utils/event/off'
import stop from './utils/event/stop'

import Base from './base'
import Anchors from './anchors'
import Drawer from './drawer'
import Chapters from './chapters'
import Toolbar from './toolbar'
import Message from './message'
import paintPrint from './print'

const ENTER_READING_TIP = '进入阅读模式，按 ESC 键可退出阅读模式'

class Outline extends Base {
  constructor(options) {
    super()

    this.attrs = cloneDeep(Outline.DEFAULTS)
    this.anchors = null
    this.drawer = null
    this.chapters = null
    this.toolbar = null
    this.buttons = []
    this.reading = false

    if (options) {
      this.initialize(options)
    }
  }

  initialize(options) {
    this.attr(options)
    this.$emit('created', { ...this.attr() })
    this.render().addListeners()
    return this
  }

  getChapters(isTreeStructured = false) {
    return this.anchors.getChapters(isTreeStructured)
  }

  count() {
    return this.anchors.count()
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

    this._renderPrint()._renderAnchors()._renderChapters()._renderToolbar()

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

  _renderPrint() {
    const option = this.attr('print')
    const articleElement = this.attr('articleElement')
    let $articleElement
    let $print
    let element

    if (!option.element) {
      return this
    }

    if (isString(articleElement)) {
      $articleElement = document.querySelector(articleElement)
    } else if (isElement(articleElement)) {
      $articleElement = articleElement
    }

    addClass($articleElement, 'outline-article')

    element = option.element

    if (isString(element)) {
      $print = document.querySelector(element)
    } else if (isElement(element)) {
      $print = element
    }

    paintPrint($print, option.title)

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
        customClass,
        afterClosed: () => {
          const toolbar = this.toolbar
          toolbar.toggle()
        }
      })
      parentElement = this.drawer.$main
    } else {
      CHAPTERS_OPTIONS.customClass = customClass
    }

    CHAPTERS_OPTIONS.parentElement = parentElement
    this.chapters = new Chapters(CHAPTERS_OPTIONS)

    return this
  }

  _renderToolbar() {
    const hasToolbar = this.attr('hasToolbar')
    const placement = this.attr('placement')
    const homepage = this.attr('homepage')
    const git = this.attr('git')
    const tags = this.attr('tags')
    const issues = this.attr('issues')
    const tools = this.attr('tools')
    const option = this.attr('print')
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
    if (option.element) {
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
    const READING = 'outline-reading'
    const HIDDEN = `${READING}_hidden`
    const $reading = document.querySelector('#outline-print')
    const $siblings = document.querySelectorAll('.outline-print_sibling')
    const options = this.attr('print')
    const enterReadingTip = options.enterReadingTip || ENTER_READING_TIP

    if (this.reading || !$reading) {
      return this
    }

    $siblings.forEach(($sibling) => {
      addClass($sibling, HIDDEN)
    })
    addClass($reading, READING)
    this.reading = true

    this.toolbar.toggle()

    Message.info({
      round: true,
      message: enterReadingTip
    })

    this.$emit('enterReading')

    return this
  }

  exitReading() {
    const READING = 'outline-reading'
    const HIDDEN = `${READING}_hidden`
    const $reading = document.querySelector('#outline-print')
    const $siblings = document.querySelectorAll('.outline-print_sibling')

    if (!this.reading || !$reading) {
      return this
    }

    removeClass($reading, READING)
    $siblings.forEach(($sibling) => {
      removeClass($sibling, HIDDEN)
    })
    this.reading = false

    this.toolbar.toggle()

    this.$emit('exitReading')

    return this
  }

  switchReading() {
    const $print = document.querySelector('#outline-print')

    if (!$print) {
      return this
    }

    if (!this.reading) {
      this.enterReading()
    } else {
      this.exitReading()
    }

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
    if (!isFunction(print)) {
      return this
    }

    print()

    return this
  }

  destroy() {
    let anchors = this.anchors
    let chapters = this.chapters
    let drawer = this.drawer
    let toolbar = this.toolbar
    let isOutside = false
    const count = this.count()
    const $print = document.querySelector('#outline-print')

    this.$emit('beforeDestroy')

    this.removeListeners()

    if ($print) {
      document.body.removeChild($print)
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

  onEnterReading() {
    this.switchReading()
    return this
  }

  onExitReading(evt) {
    const keyCode = evt.keyCode

    if (keyCode === 27 && this.reading) {
      this.switchReading()
      stop(evt)
    }

    return this
  }

  onPrint() {
    this.print()

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
    const $print = document.querySelector('#outline-print')

    if (hasToolbar) {
      this.$on('toolbar:update', this.onToolbarUpdate)
      this.$on('toolbar:action:up', this.onScrollTop)
      this.$on('toolbar:action:toggle', this.onToggle)
      this.$on('toolbar:action:reading', this.onEnterReading)
      this.$on('toolbar:action:down', this.onScrollBottom)
    }

    if ($print) {
      at(document, 'keyup', this.onExitReading, this, true)
      on($print, '.outline-print__close', 'click', this.exitReading, this, true)
      this.$on('toolbar:action:print', this.onPrint)
    }

    return this
  }

  removeListeners() {
    const hasToolbar = this.attr('hasToolbar')
    const $print = document.querySelector('#outline-print')

    if (hasToolbar) {
      this.$off('toolbar:update')
      this.$off('toolbar:action:up')
      this.$off('toolbar:action:toggle')
      this.$off('toolbar:action:down')
    }

    if ($print) {
      off(document, 'keyup', this.onExitReading)
      off($print, 'click', this.exitReading)
      this.$off('toolbar:action:print')
    }

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
  anchorURL: '',
  stickyHeight: 0,
  homepage: '',
  git: '',
  tags: '',
  issues: '',
  tools: [],
  print: {
    element: '',
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
