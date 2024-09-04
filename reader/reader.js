import cloneDeep from '@/utils/lang/cloneDeep'
import later from '@/utils/lang/later'
import isString from '@/utils/types/isString'
import isElement from '@/utils/types/isElement'
import isFunction from '@/utils/types/isFunction'
import createElement from '@/utils/dom/createElement'
import addClass from '@/utils/dom/addClass'
import removeClass from '@/utils/dom/removeClass'
import isMobile from '@/utils/dom/isMobile'

import at from '@/utils/event/at'
import stop from '@/utils/event/stop'
import off from '@/utils/event/off'

import Message from '@/message/message'
import Toolbar from '@/toolbar/toolbar'

import Speech from '@/speech'
import Component from '@/component'

import _updateSiblingElements from './utils/_updateSiblingElements'

import './reader.less'

const ENTER_READING_TIP = '进入阅读模式，按 ESC 键可退出阅读模式'

class Reader extends Component {
  constructor(options) {
    super()

    this._default()

    if (options) {
      this.initialize(options)
    }
  }

  _default() {
    this.attrs = cloneDeep(Reader.DEFAULTS)
    this.reading = false

    this.$target = null
    this.$el = null
    this.$paper = null
    this.$title = null
    this.$article = null
    this.$progress = null

    this.toolbar = null
    this.speech = null

    return this
  }

  initialize(options) {
    let target

    this.attr(options)

    target = this.attr('target')

    if (isString(target)) {
      this.$target = document.querySelector(target)
    } else if (isElement(target)) {
      this.$target = target
    }

    if (!this.$target) {
      return this
    }

    if (Speech.isSupport) {
      this.speech = new Speech()
    }

    this.render().addListeners()

    return this
  }

  isSpeaking() {
    return this?.speech?.isSpeaking()
  }

  render() {
    this._renderEdge()._paint(this.$target)
    return this
  }

  erase() {
    this.$article.innerHTML = ''
    return this
  }

  _paint($content) {
    const $fragment = document.createDocumentFragment()
    const $children = [...$content.cloneNode(true).children]

    later(() => {
      $children.forEach(($child) => {
        $fragment.appendChild($child)
      })

      this.$article.appendChild($fragment)
    })

    return this
  }

  _remove() {
    const $el = this.$el
    const toolbar = this.toolbar

    if ($el) {
      document.body.removeChild($el)
    }

    if (toolbar) {
      toolbar.destroy()
    }

    return this
  }

  refresh() {
    this.erase()._paint(this.$target)
    return this
  }

  _animateTimeline() {
    // eslint-disable-next-line
    if (!window.ScrollTimeline || !isMobile()) {
      return this
    }

    this.$progress.animate(
      {
        // from
        scale: ['0 1', '1 1']
      },
      {
        // eslint-disable-next-line
        timeline: new ScrollTimeline({
          source: this.$article,
          axis: 'block'
        })
      }
    )

    return this
  }

  _renderEdge() {
    const $target = this.$target
    const mobile = isMobile()
    const size = mobile ? 26 : 20
    let title = this.attr('title')
    let $el
    let $paper
    let $title
    let $article
    let $progress
    let $sibling

    $progress = createElement('div', {
      className: 'outline-reader__progress'
    })
    this.$progress = $progress

    $title = $target.querySelector('h1')

    if (isElement(title)) {
      $title = title
    }

    if (isElement($title)) {
      title = $title.innerText
    }

    $title = createElement(
      'h1',
      {
        className: 'outline-reader__title'
      },
      title
    )
    this.$title = $title

    $article = createElement(
      'article',
      {
        id: 'outline-reader__article',
        className: 'outline-reader__article'
      },
      isMobile() ? [] : [$progress.cloneNode()]
    )
    this.$article = $article

    $paper = createElement(
      'div',
      {
        id: 'outline-reader__paper',
        className: 'outline-reader__paper'
      },
      [$title, $article]
    )
    this.$paper = $paper

    const buttons = []

    buttons.push({
      name: 'print',
      icon: 'print',
      size,
      action: {
        context: this,
        handler: this.print
      }
    })

    if (Speech.isSupport && this.attr('allowSpeak')) {
      buttons.push({
        name: 'speak',
        icon: 'sound',
        size,
        action: {
          context: this,
          handler: this.speak
        }
      })
    }

    buttons.push({
      name: 'exit',
      icon: 'close',
      size,
      action: {
        context: this,
        handler: this.exit
      }
    })

    this.toolbar = new Toolbar({
      placement: 'rtl',
      buttons
    })

    $el = createElement(
      'section',
      {
        id: 'outline-reader',
        className: 'outline-reader outline-reader_hidden'
      },
      [$progress, $paper, this.toolbar.$el]
    )
    this.$el = $el

    document.body.appendChild($el)

    this._animateTimeline()

    later(() => {
      // 设置邻居节点的打印样式
      $sibling = $el.previousElementSibling
      _updateSiblingElements($sibling, true)

      $sibling = $el.nextElementSibling
      _updateSiblingElements($sibling)
    })

    return this
  }

  enter() {
    const READER = 'outline-reader'
    const READING = `${READER}--reading`
    const HIDDEN = `${READER}_hidden`
    const $el = this.$el
    const $siblings = document.querySelectorAll('.outline-reader_sibling')
    const enterReadingTip = this.attr('enterReadingTip') || ENTER_READING_TIP

    if (this.reading || !$el) {
      return this
    }

    $siblings.forEach(($sibling) => {
      addClass($sibling, HIDDEN)
    })
    addClass($el, READING)
    removeClass($el, HIDDEN)
    this.toolbar.show()
    this.reading = true

    Message.info({
      round: true,
      message: enterReadingTip
    })

    this.$emit('reader:enter')

    return this
  }

  exit() {
    const SPEAK = 'speak'
    const READER = 'outline-reader'
    const READING = `${READER}--reading`
    const HIDDEN = `${READER}_hidden`
    const $el = this.$el
    const $siblings = document.querySelectorAll('.outline-reader_sibling')
    const speech = this.speech
    const toolbar = this.toolbar

    if (!this.reading || !$el) {
      return this
    }

    addClass($el, HIDDEN)
    removeClass($el, READING)
    $siblings.forEach(($sibling) => {
      removeClass($sibling, HIDDEN)
    })
    toolbar.hide()
    this.reading = false

    if (speech) {
      if (toolbar.isHighlight(SPEAK)) {
        toolbar.highlight(SPEAK)
      }

      speech.cancel()
    }

    this.$emit('reader:exit')

    return this
  }

  toggle() {
    if (this.reading) {
      this.exit()
    } else {
      this.enter()
    }

    return this
  }

  speak() {
    const text = this.$article.innerText
    const speech = this.speech

    if (!Speech.isSupport || !speech) {
      return this
    }

    this.toolbar.highlight('speak')

    if (this.isSpeaking()) {
      speech.cancel()
    } else {
      speech.speak(text)
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
    const $el = this.$el

    if (!$el) {
      return this
    }

    this.removeListeners()._remove()._default()

    return this
  }

  onPrint() {
    this.print()
    return this
  }

  onEnterReading() {
    this.toggle()
    return this
  }

  onExitReading(evt) {
    const keyCode = evt.keyCode

    if (keyCode === 27 && this.reading) {
      this.toggle()
      stop(evt)
    }

    return this
  }

  onRefresh() {
    this.refresh()

    return this
  }

  addListeners() {
    const $el = this.$el

    if (!$el) {
      return this
    }

    at(document, 'keyup', this.onExitReading, this, true)

    this.$on('toolbar:action:print', this.onPrint)
    this.$on('toolbar:action:reading', this.onEnterReading)
    this.$on('reader:print', this.onPrint)
    this.$on('reader:refresh', this.onRefresh)
    this.$on('reader:enter', this.enter)
    this.$on('reader:exit', this.exit)
    this.$on('reader:toggle', this.toggle)

    return this
  }

  removeListeners() {
    const $el = this.$el

    if (!$el) {
      return this
    }

    off(document, 'keyup', this.onExitReading)

    this.$off('toolbar:action:print')
    this.$off('toolbar:action:reading')
    this.$off('reader:refresh')
    this.$off('reader:toggle')

    return this
  }
}

Reader.DEFAULTS = (() => {
  const OPTIONS = {
    target: '',
    title: '',
    enterReadingTip: ENTER_READING_TIP,
    allowSpeak: false
  }

  return cloneDeep(OPTIONS)
})()

export default Reader
