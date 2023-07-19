import Base from './base'
import Anchors from './anchors'
import Drawer from './drawer'
import Chapters from './chapters'
import Toolbar from './toolbar'

import isFunction from './utils/types/isFunction'
import later from './utils/lang/later'
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

  getChapters() {
    return this.anchors.getChapters()
  }

  render() {
    this._renderAnchors()._renderChapters()._renderToolbar()

    return this
  }

  _renderAnchors() {
    const articleElement = this.attr('articleElement')
    const selector = this.attr('selector')
    const scrollElement = this.attr('scrollElement')
    const showCode = this.attr('showCode')
    const anchorURL = this.attr('anchorURL')

    this.anchors = new Anchors({
      articleElement: articleElement,
      scrollElement: scrollElement,
      selector,
      showCode,
      anchorURL
    })

    return this
  }

  _renderChapters() {
    const title = this.attr('title')
    const scrollElement = this.attr('scrollElement')
    const customClass = this.attr('customClass')
    const showCode = this.attr('showCode')
    const position = this.attr('position')
    const placement = this.attr('placement')
    const count = this.anchors.count()
    let parentElement = this.attr('parentElement')
    let CHAPTERS_OPTIONS = {
      scrollElement: scrollElement,
      showCode,
      position,
      title,
      chapters: this.anchors.getChapters()
    }

    if (count < 1) {
      return this
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
    const placement = this.attr('placement')
    const count = this.anchors.count()
    const UP = {
      name: 'up',
      icon: 'up',
      size: 20,
      action: {
        type: 'click',
        handler: this.onScrollTop,
        context: this
      }
    }
    const MENU = {
      name: 'menu',
      icon: 'menu',
      size: 20,
      action: {
        type: 'click',
        handler: this.onToggle,
        context: this
      }
    }
    const DOWN = {
      name: 'down',
      icon: 'down',
      size: 20,
      action: {
        type: 'click',
        handler: this.onScrollBottom,
        context: this
      }
    }
    const buttons = []

    buttons.push(UP)
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

  toTop(afterScroll) {
    const toolbar = this.toolbar
    const chapters = this.chapters
    const count = this.anchors.count()
    const afterTop = () => {
      toolbar.hide('up')
      toolbar.show('down')

      if (count > 1) {
        chapters.highlight(0)
      }
      chapters.playing = false

      if (isFunction(afterScroll)) {
        afterScroll.call(this)
      }
    }

    chapters.playing = true
    this.scrollTo(0, afterTop)

    return this
  }

  toBottom(afterScroll) {
    const anchors = this.anchors
    const toolbar = this.toolbar
    const chapters = this.chapters
    const count = anchors.count()
    const top = anchors.$scrollElement.scrollHeight
    const afterDown = () => {
      toolbar.hide('down')
      toolbar.show('up')

      chapters.playing = false

      if (isFunction(afterScroll)) {
        afterScroll.call(this)
      }
    }

    chapters.playing = true
    if (count > 0) {
      chapters.highlight(anchors.count() - 1)
    }
    this.scrollTo(top, afterDown)

    return this
  }

  scrollTo(top, afterScroll) {
    this.anchors.scrollTo(top, afterScroll)
    return this
  }

  toggle() {
    const toolbar = this.toolbar
    const drawer = this.drawer
    const chapters = this.chapters
    const count = this.anchors.count()

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

    return this
  }

  destroy() {
    const anchors = this.anchors
    const chapters = this.chapters
    const count = anchors.count()

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

  onUpdateToolbar({ top, min, max }) {
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
    subscribe('update:toolbar', this.onUpdateToolbar, this)
    return this
  }

  removeListeners() {
    unsubscribe('update:toolbar')
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
  customClass: ''
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
