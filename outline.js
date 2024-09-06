import later from '@/utils/lang/later'
import cloneDeep from '@/utils/lang/cloneDeep'

import isFunction from '@/utils/types/isFunction'
import isString from '@/utils/types/isString'
import isElement from '@/utils/types/isElement'

import addClass from '@/utils/dom/addClass'
import scrollTo from '@/utils/dom/scrollTo'
import getScrollElement from '@/utils/dom/getScrollElement'

import getChapters from '@/chapters/getChapters'

import Component from '@/base/component'
import Anchors from '@/anchors/anchors'
import Drawer from '@/drawer/drawer'
import Navigator from '@/navigator/navigator'
import Reader from '@/reader/reader'
import Toolbar from '@/toolbar/toolbar'

class Outline extends Component {
  constructor(options) {
    super()

    this.version = '3.39.3'
    this.name = 'outline'
    this._default()

    if (options) {
      this.initialize(options)
    }
  }

  _default() {
    const options = Outline.DEFAULTS

    this.attrs = cloneDeep(options)
    this.$article = null
    this.$scrollElement = null

    return this
  }

  initialize(options) {
    let articleElement = ''
    let scrollElement = ''
    let $article = null

    this.attr(options)

    articleElement = this.attr('articleElement')
    scrollElement = this.attr('scrollElement')

    if (isString(articleElement)) {
      $article = document.querySelector(articleElement)
    } else if (isElement(articleElement)) {
      $article = articleElement
    }
    this.$article = $article
    this.$scrollElement = getScrollElement(scrollElement)

    this.$emit('created', { ...this.attr() })
    this.render().addListeners()

    return this
  }

  isExpanded() {
    const position = this.attr('position')
    const drawer = this.drawer
    const navigator = this.navigator
    const count = this.count()

    if (count < 0) {
      return false
    }

    if (position === 'relative') {
      return !drawer.isClosed()
    } else {
      return !navigator.isClosed()
    }
  }

  getChapters(isTreeStructured = false) {
    const articleElement = this.$article
    const selector = this.attr('selector')
    const showCode = this.attr('showCode')
    const chapterTextFilter = this.attr('chapterTextFilter')

    return getChapters({
      articleElement,
      selector,
      showCode,
      chapterTextFilter,
      isTreeStructured
    })
  }

  count() {
    return this.getChapters().length
  }

  render() {
    const hasToolbar = this.attr('hasToolbar')
    const $scrollElement = this.$scrollElement

    this._renderReader()._renderAnchors()._renderNavigator()._renderToolbar()

    if ($scrollElement && hasToolbar) {
      this.$emit('toolbar:update', {
        top: $scrollElement.scrollTop,
        min: 0,
        max: $scrollElement.scrollHeight
      })
    }

    this.$emit('mounted')

    return this
  }

  _renderReader() {
    const option = this.attr('reader')

    if (!option.target) {
      return this
    }

    addClass(this.$article, 'outline-article')
    this.reader = new Reader(option)

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
    const anchorLinkFilter = this.attr('anchorLinkFilter')

    this.anchors = new Anchors({
      articleElement,
      stickyHeight,
      scrollElement,
      selector,
      showCode,
      anchorURL,
      afterScroll,
      chapterTextFilter,
      anchorLinkFilter
    })

    return this
  }

  _renderNavigator() {
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
    let OPTIONS

    if (count < 1) {
      return this
    }

    OPTIONS = {
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
      OPTIONS.customClass = customClass
    }

    OPTIONS.parentElement = parentElement
    this.navigator = new Navigator(OPTIONS)

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
        context: this,
        handler: this.toTop
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
      name: 'toggle',
      icon: 'menu',
      size: 18,
      action: {
        context: this,
        handler: this.toggle
      }
    }
    const READING = {
      name: 'reading',
      icon: 'file',
      size: 18,
      action: {
        context: this,
        handler: 'toolbar:action:reading'
      }
    }
    const PRINT = {
      name: 'print',
      icon: 'print',
      size: 20,
      action: {
        handler: 'toolbar:action:print'
      }
    }
    const DOWN = {
      name: 'down',
      icon: 'down',
      size: 20,
      action: {
        context: this,
        handler: this.toBottom
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

    this.toolbar = new Toolbar({
      placement,
      buttons
    })

    if (position === 'relative' && showNavModalFirst) {
      this.toolbar.hide()
    }

    return this
  }

  refresh() {
    const chapters = this.getChapters()

    this.$emit('anchors:refresh', chapters)
    this.$emit('navigator:refresh', chapters)
    this.$emit('reader:refresh')

    this.$emit('refresh', chapters)

    return this
  }

  addButton(button) {
    this.$emit('toolbar:add:button', button)

    return this
  }

  removeButton(name) {
    this.$emit('toolbar:remove:button', name)
    return this
  }

  toTop() {
    const afterScroll = this.attr('afterScroll')
    const toolbar = this.toolbar
    const navigator = this.navigator
    const count = this.count()
    const afterTop = () => {
      toolbar.hide('up')
      toolbar.show('down')

      if (count > 0) {
        navigator.highlight(0)
        navigator.playing = false
        scrollTo(navigator.$main, 0)
      }

      if (isFunction(afterScroll)) {
        afterScroll.call(toolbar, 'up')
      }
    }

    if (count > 0) {
      navigator.playing = true
    }
    this.scrollTo(0, afterTop)

    return this
  }

  toBottom() {
    const afterScroll = this.attr('afterScroll')
    const $scrollElement = this.$scrollElement
    const toolbar = this.toolbar
    const navigator = this.navigator
    const count = this.count()
    const top = Math.floor(
      $scrollElement.scrollHeight - $scrollElement.clientHeight
    )
    const afterDown = () => {
      const $main = navigator.$main
      toolbar.hide('down')
      toolbar.show('up')

      if (count > 0) {
        navigator.highlight(count - 1)
        scrollTo($main, $main.scrollHeight)
        navigator.playing = false
      }

      if (isFunction(afterScroll)) {
        afterScroll.call(toolbar, 'bottom')
      }
    }

    if (count > 0) {
      navigator.playing = true
    }

    this.scrollTo(top, afterDown)

    return this
  }

  scrollTo(top, afterScroll) {
    scrollTo(this.$scrollElement, top, afterScroll)
    return this
  }

  enterReading() {
    this.$emit('toolbar:toggle')
    this.$emit('reader:enter')

    return this
  }

  exitReading() {
    this.$emit('toolbar:toggle')
    this.$emit('reader:exit')

    return this
  }

  switchReading() {
    this.$emit('toolbar:toggle')
    this.$emit('reader:toggle')

    return this
  }

  expand() {
    const position = this.attr('position')
    const toolbar = this.toolbar
    const drawer = this.drawer
    const navigator = this.navigator
    const count = this.count()

    if (count < 1) {
      return this
    }

    if (position !== 'relative') {
      navigator.show()
      toolbar.highlight('toggle')
    } else {
      toolbar.hide()

      later(() => {
        drawer.open()
      })
    }

    return this
  }

  collapses() {
    const position = this.attr('position')
    const toolbar = this.toolbar
    const drawer = this.drawer
    const navigator = this.navigator
    const count = this.count()

    if (count < 1) {
      return this
    }

    if (position !== 'relative') {
      navigator.hide()
      toolbar.highlight('toggle')
    } else {
      toolbar.show()

      later(() => {
        drawer.close()
      })
    }

    return this
  }

  toggle() {
    if (this.isExpanded()) {
      this.collapses()
    } else {
      this.expand()
    }

    return this
  }

  print() {
    this.$emit('reader:print')

    return this
  }

  _destroy() {
    const count = this.count()
    let anchors = this.anchors
    let navigator = this.navigator
    let drawer = this.drawer
    let reader = this.reader
    let toolbar = this.toolbar
    let isOutside = false

    this.removeListeners()

    if (reader) {
      reader.destroy()
    }

    if (count > 0 && navigator) {
      isOutside = navigator.isOutside()

      navigator.destroy()

      if (isOutside && drawer) {
        drawer.destroy()
      }
    }

    if (anchors) {
      anchors.destroy()
    }

    if (toolbar) {
      toolbar.destroy()
    }

    return this
  }

  destroy() {
    this.$emit('beforeDestroy')

    this._destroy()._default()

    this.$emit('destroyed')

    return this
  }

  addListeners() {
    const hasToolbar = this.attr('hasToolbar')

    if (!hasToolbar) {
      return this
    }

    this.$on('toolbar:update', this.onToolbarUpdate)

    return this
  }

  removeListeners() {
    const hasToolbar = this.attr('hasToolbar')

    if (!hasToolbar) {
      return this
    }

    this.$off('toolbar:update')

    return this
  }
}

Outline.use = (plugin, options) => {
  const plugins = this.plugins
  const name = plugin.name

  if (!name) {
    throw new Error('Plugin name required')
  }

  if (plugins.exists(name)) {
    return this
  }

  plugins.register(plugin, options)

  return this
}

Outline.DEFAULTS = (() => {
  const OPTIONS = {
    articleElement: '#article',
    selector: 'h2,h3,h4,h5,h6',
    parentElement: '#aside',
    scrollElement: 'html,body',
    title: '目录',
    position: 'relative',
    placement: 'rtl',
    animationCurrent: true,
    showCode: false,
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
      enterReadingTip: '进入阅读模式，按 ESC 键可退出阅读模式',
      allowSpeak: false
    },
    customClass: '',
    afterSticky: null,
    afterToggle: null,
    afterScroll: null,
    chapterTextFilter: null,
    anchorLinkFilter: null
  }

  return cloneDeep(OPTIONS)
})()

if (window?.jQuery) {
  const $ = window.jQuery

  // 将 Outline 扩展为一个 jquery 插件
  // eslint-disable-next-line no-undef
  $.extend($.fn, {
    outline: function (options) {
      // eslint-disable-next-line no-undef
      let $article = $(this)

      return new Outline(
        // eslint-disable-next-line no-undef
        $.extend({}, options, {
          articleElement: $article
        })
      )
    }
  })
}

export default Outline
