import Base from './base'
import Anchors from './anchors'
import Drawer from './drawer'
import Chapters from './chapters'
import Toolbar from './toolbar'

import later from './utils/lang/later'
import scrollTo from './utils/dom/scrollTo'
import _getScrollElement from './utils/dom/_getScrollElement'
import subscribe from './utils/observer/on'
import unsubscribe from './utils/observer/off'

class Outline extends Base {
  constructor(options) {
    super()

    this.attrs = Outline.DEFAULTS
    this.anchors = null
    this.drawer = null
    this.chapters = null
    this.toolbar = null

    if (options) {
      this.initialize(options)
    }
  }

  initialize(options) {
    this.attr(options).render().addListeners()
    return this
  }

  getChapters(isTreeStructured = false) {
    return this.anchors.getChapters(isTreeStructured)
  }

  count() {
    return this.anchors.count()
  }

  render() {
    this._renderAnchors()._renderChapters()._renderToolbar()

    return this
  }

  _renderAnchors() {
    const articleElement = this.attr('articleElement')
    const selector = this.attr('selector')
    const stickyHeight = this.attr('stickyHeight')
    const scrollElement = this.attr('scrollElement')
    const showCode = this.attr('showCode')
    const anchorURL = this.attr('anchorURL')

    this.anchors = new Anchors({
      articleElement,
      stickyHeight,
      scrollElement,
      selector,
      showCode,
      anchorURL
    })

    return this
  }

  _renderChapters() {
    const title = this.attr('title')
    const stickyHeight = this.attr('stickyHeight')
    const scrollElement = this.attr('scrollElement')
    const customClass = this.attr('customClass')
    const showCode = this.attr('showCode')
    const position = this.attr('position')
    const placement = this.attr('placement')
    const afterSticky = this.attr('afterSticky')
    const afterToggle = this.attr('afterToggle')
    const count = this.count()
    let parentElement = this.attr('parentElement')
    let CHAPTERS_OPTIONS

    if (count < 1) {
      return this
    }

    CHAPTERS_OPTIONS = {
      scrollElement,
      showCode,
      position,
      title,
      stickyHeight,
      chapters: this.anchors.getChapters(),
      afterSticky,
      afterToggle
    }

    if (position === 'relative') {
      this.drawer = new Drawer({
        placement,
        title,
        size: 'tiny',
        hasOffset: true,
        hasPadding: false,
        customClass,
        afterToggle: (closed) => {
          const toolbar = this.toolbar
          if (closed) {
            toolbar.toggle()
          }
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
    const placement = this.attr('placement')
    const homepage = this.attr('homepage')
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
    const MENU = {
      name: 'menu',
      icon: 'menu',
      size: 18,
      action: {
        type: 'click',
        handler: 'toolbar:action:toggle'
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

    buttons.push(UP)
    if (homepage) {
      buttons.push(HOME)
    }
    if (count > 0) {
      buttons.push(MENU)
    }
    buttons.push(DOWN)

    this.toolbar = new Toolbar({
      placement,
      buttons: buttons
    })

    return this
  }

  toTop() {
    const toolbar = this.toolbar
    const chapters = this.chapters
    const count = this.count()
    const afterTop = () => {
      toolbar.hide('up')
      toolbar.show('down')

      if (count > 0) {
        chapters.highlight(0)
      }
      chapters.playing = false
    }

    chapters.playing = true
    this.scrollTo(0, afterTop)

    return this
  }

  toBottom() {
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

      if (count > 1) {
        chapters.highlight(count - 1)
      }
      chapters.playing = false
    }

    chapters.playing = true
    this.scrollTo(top, afterDown)

    return this
  }

  scrollTo(top, afterScroll) {
    const scrollElement = this.attr('scrollElement')
    scrollTo(scrollElement, top, afterScroll, 100)
    return this
  }

  toggle() {
    const position = this.attr('position')
    const toolbar = this.toolbar
    const drawer = this.drawer
    const chapters = this.chapters
    const count = this.count()

    if (position !== 'relative') {
      chapters.toggle()
      toolbar.highlight('menu')
    } else {
      toolbar.toggle()

      if (count < 1) {
        return this
      }

      later(() => {
        if (chapters.isInside()) {
          chapters.toggle()
        } else {
          drawer.toggle()
        }
      })
    }

    return this
  }

  destroy() {
    const chapters = this.chapters
    const count = this.count()

    this.removeListeners()

    this.attr(Outline.DEFAULTS)
    this.anchors.destroy()
    if (count < 1) {
      chapters.destroy()
      if (chapters.isOutside()) {
        this.drawer.destroy()
      }
    }
    this.toolbar.destroy()

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
    subscribe('toolbar:update', this.onToolbarUpdate, this)
    subscribe('toolbar:action:up', this.onScrollTop, this)
    subscribe('toolbar:action:toggle', this.onToggle, this)
    subscribe('toolbar:action:down', this.onScrollBottom, this)
    return this
  }

  removeListeners() {
    unsubscribe('toolbar:update')
    unsubscribe('toolbar:action:up')
    unsubscribe('toolbar:action:toggle')
    unsubscribe('toolbar:action:down')
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
  showCode: true,
  anchorURL: '',
  stickyHeight: 0,
  customClass: '',
  afterSticky: null,
  afterToggle: null
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
