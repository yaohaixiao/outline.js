import cloneDeep from './utils/lang/cloneDeep'
import later from './utils/lang/later'
import isString from './utils/types/isString'
import isElement from './utils/types/isElement'
import isFunction from './utils/types/isFunction'
import createElement from './utils/dom/createElement'
import addClass from './utils/dom/addClass'
import removeClass from './utils/dom/removeClass'
import at from './utils/event/at'
import stop from './utils/event/stop'
import off from './utils/event/off'

import Base from './base'
import Message from './message'
import Toolbar from './toolbar'

import _updateSiblingElements from './_updateSiblingElements'

const ENTER_READING_TIP = '进入阅读模式，按 ESC 键可退出阅读模式'

class Reader extends Base {
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
    this.$paper = null
    this.$title = null
    this.$article = null
    this.$progress = null

    this.toolbar = null

    return this
  }

  initialize(options) {
    let target = null

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

    this.render().addListeners()

    return this
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
    const $paper = this.$paper
    const toolbar = this.toolbar

    if ($paper) {
      document.body.removeChild($paper)
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

  _renderEdge() {
    const $target = this.$target
    let title = this.attr('title')
    let $paper
    let $title
    let $article
    let $progress
    let $sibling

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

    $article = createElement('article', {
      id: 'outline-reader__article',
      className: 'outline-reader__article'
    })
    this.$article = $article

    $progress = createElement('div', {
      className: 'outline-reader__progress'
    })
    this.$progress = $progress

    this.toolbar = new Toolbar({
      placement: 'rtl',
      buttons: [
        {
          name: 'print',
          icon: 'print',
          size: 20,
          action: {
            context: this,
            handler: this.print
          }
        },
        {
          name: 'exit',
          icon: 'close',
          size: 20,
          action: {
            context: this,
            handler: this.exit
          }
        }
      ]
    })

    $paper = createElement(
      'section',
      {
        id: 'outline-reader',
        className: 'outline-reader outline-reader_hidden'
      },
      [$progress, $title, $article, this.toolbar.$el]
    )
    this.$paper = $paper

    document.body.appendChild($paper)

    later(() => {
      // 设置邻居节点的打印样式
      $sibling = $paper.previousElementSibling
      _updateSiblingElements($sibling, true)

      $sibling = $paper.nextElementSibling
      _updateSiblingElements($sibling)
    })

    return this
  }

  enter() {
    const READER = 'outline-reader'
    const READING = `${READER}--reading`
    const HIDDEN = `${READER}_hidden`
    const $paper = this.$paper
    const $siblings = document.querySelectorAll('.outline-reader_sibling')
    const enterReadingTip = this.attr('enterReadingTip') || ENTER_READING_TIP

    if (this.reading || !$paper) {
      return this
    }

    $siblings.forEach(($sibling) => {
      addClass($sibling, HIDDEN)
    })
    addClass($paper, READING)
    removeClass($paper, HIDDEN)
    this.toolbar.show()
    this.reading = true

    Message.info({
      round: true,
      message: enterReadingTip
    })

    this.$emit('enterReading')

    return this
  }

  exit() {
    const READER = 'outline-reader'
    const READING = `${READER}--reading`
    const HIDDEN = `${READER}_hidden`
    const $paper = this.$paper
    const $siblings = document.querySelectorAll('.outline-reader_sibling')

    if (!this.reading || !$paper) {
      return this
    }

    addClass($paper, HIDDEN)
    removeClass($paper, READING)
    $siblings.forEach(($sibling) => {
      removeClass($sibling, HIDDEN)
    })
    this.toolbar.hide()
    this.reading = false

    this.$emit('exitReading')

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

  print() {
    if (!isFunction(print)) {
      return this
    }

    print()

    return this
  }

  destroy() {
    const $paper = this.$paper

    if (!$paper) {
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

  addListeners() {
    const $paper = this.$paper

    if (!$paper) {
      return this
    }

    at(document, 'keyup', this.onExitReading, this, true)

    this.$on('toolbar:action:print', this.onPrint)
    this.$on('toolbar:action:reading', this.onEnterReading)

    return this
  }

  removeListeners() {
    const $paper = this.$paper

    if (!$paper) {
      return this
    }

    off(document, 'keyup', this.onExitReading)

    this.$off('toolbar:action:print')
    this.$off('toolbar:action:reading')

    return this
  }
}

Reader.DEFAULTS = (() => {
  const OPTIONS = {
    target: '',
    title: '',
    enterReadingTip: ENTER_READING_TIP
  }

  return cloneDeep(OPTIONS)
})()

export default Reader
