import Anchors from './anchors'
import Drawer from './drawer'
import Chapters from './chapters'
import Toolbar from './toolbar'

import isString from './utils/types/isString'
import isObject from './utils/types/isObject'
import extend from './utils/lang/extend'
import hasOwn from './utils/lang/hasOwn'

import subscribe from './utils/observer/on'
import unsubscribe from './utils/observer/off'

class Outline {
  constructor(options) {
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

  render() {
    const articleElement = this.attr('articleElement')
    const scrollElement = this.attr('scrollElement')
    const selector = this.attr('selector')
    const showCode = this.attr('showCode')
    const position = this.attr('position')
    const anchorURL = this.attr('anchorURL')
    let parentElement = this.attr('parentElement')

    this.anchors = new Anchors({
      articleElement: articleElement,
      scrollElement: scrollElement,
      selector,
      showCode,
      anchorURL
    })
    if (position === 'relative') {
      this.drawer = new Drawer({
        placement: 'ltr',
        title: '目录',
        size: 'tiny',
        hasOffset: true,
        hasPadding: false,
        afterClosed: () => {
          this.toolbar.highlight('menu')
        }
      })
      parentElement = this.drawer.$main
    }
    this.chapters = new Chapters({
      parentElement: parentElement,
      scrollElement: scrollElement,
      showCode,
      position,
      chapters: this.anchors.getChapters()
    })
    this.toolbar = new Toolbar({
      buttons: [
        {
          name: 'up',
          icon: 'up',
          size: 20,
          action: {
            type: 'click',
            handler: this.onScrollTop,
            context: this
          }
        },
        {
          name: 'menu',
          icon: 'menu',
          size: 20,
          action: {
            type: 'click',
            handler: this.onToggle,
            context: this
          }
        },
        {
          name: 'down',
          icon: 'down',
          size: 20,
          action: {
            type: 'click',
            handler: this.onScrollBottom,
            context: this
          }
        }
      ]
    })

    return this
  }

  toTop() {
    const toolbar = this.toolbar
    const chapters = this.chapters
    const hideUp = () => {
      toolbar.hide('up')
      toolbar.show('down')
      chapters.highlight(0)
      chapters.playing = false
    }

    chapters.playing = true
    this.scrollTo(0, hideUp)

    return this
  }

  toBottom() {
    const toolbar = this.toolbar
    const chapters = this.chapters
    const anchors = this.anchors
    const top = chapters.$scrollElement.scrollHeight
    const hideDown = () => {
      toolbar.hide('down')
      toolbar.show('up')
      chapters.playing = false
    }

    chapters.playing = true
    chapters.highlight(anchors.count() - 1)
    this.scrollTo(top, hideDown)

    return this
  }

  scrollTo(top, afterScroll) {
    this.chapters.scrollTo(top, afterScroll)
    return this
  }

  toggle() {
    const toolbar = this.toolbar
    const drawer = this.drawer
    const chapters = this.chapters

    toolbar.highlight('menu')

    if (chapters.isInside()) {
      chapters.toggle()
    } else {
      drawer.toggle()
    }

    return this
  }

  destroy() {
    const chapters = this.chapters

    this.removeListeners()

    this.attr(Outline.DEFAULTS)
    this.anchors.destroy()
    chapters.destroy()
    if (chapters.isOutside()) {
      this.drawer.destroy()
    }
    this.toolbar.destroy()

    return this
  }

  reload(options) {
    this.destroy().initialize(this.attr(options))
    return this
  }

  onToggle() {
    this.toggle()
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

    if (top <= min) {
      toolbar.hide('up')
      toolbar.show('down')
    } else if (top >= max) {
      toolbar.hide('down')
      toolbar.show('up')
    } else if (top > min && top < max) {
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
  scrollElement: 'html,body',
  parentElement: '#aside',
  selector: 'h2,h3,h4,h5,h6',
  position: 'relative',
  showCode: true,
  anchorURL: ''
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
