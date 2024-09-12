import cloneDeep from '../utils/lang/cloneDeep'
import isElement from '../utils/types/isElement'

import Component from '../base/component'

class KeywordToLink extends Component {
  constructor(options) {
    super()

    this.name = 'KeywordToLink'
    this.initialize(options)

    return this
  }

  _default() {
    this.attrs = KeywordToLink.DEFAULTS
    this.$el = null
    this.$anchors = []

    return this
  }

  initialize(options) {
    this.attr(options)

    const articleElement = this.attr('articleElement')
    let $el = null

    if (isElement(articleElement)) {
      $el = articleElement
    } else {
      $el = document.querySelector(articleElement)
    }

    this.$el = $el

    this.render().addListeners()

    return this
  }

  getAnchors() {
    return this.$anchors
  }

  _paint() {
    const $el = this.$el
    const keywords = this.attr('keywords')
    let content = $el.innerHTML

    if (!keywords || !keywords.length) {
      return this
    }

    keywords.forEach((keyword) => {
      const pattern = new RegExp(`(?<=>)[^<]+(?=<)`, 'ig')
      const target = keyword.target || '_blank'
      const url = keyword.url || `#${keyword.text}`
      const text = keyword.text

      content = content.replace(pattern, (match) => {
        return match.replace(
          new RegExp(`(${text})`, 'ig'),
          `<a class="outline-keyword" href="${url}" target="${target}">$1</a>`
        )
      })
    })

    $el.innerHTML = content

    this.$anchors = $el.querySelectorAll('.outline-keyword')

    return this
  }

  render() {
    const $el = this.$el

    if (!$el) {
      return this
    }

    this._paint()

    return this
  }

  add(keyword) {
    this.keywords.push(keyword)
    this.refresh()
    return this
  }

  remove(keyword) {
    this.keywords = this.keywords.filter((link) => link !== keyword)
    this.refresh()
    return this
  }

  reload(options) {
    this.destroy().initialize(options)
    return this
  }

  refresh() {
    this._remove().render()
    this.$emit('keyword:to:link:refresh')
    return this
  }

  _remove() {
    const $el = this.$el
    const keywords = this.attr('keywords')
    let content = $el.innerHTML

    if (!keywords || !keywords.length) {
      return this
    }

    keywords.forEach((keyword) => {
      const pattern = new RegExp(
        `<a class="outline-keyword" .*?>(${keyword.text})</a>`,
        'ig'
      )

      content = content.replace(pattern, `$1`)
    })

    $el.innerHTML = content

    return this
  }

  _destroy() {
    this.removeListeners()._default()
    this.$emit('keyword:to:link:destroy')
    return this
  }

  destroy() {
    this._remove()._destroy()
    return this
  }

  onRefresh() {
    this.refresh()
    return this
  }

  addListeners() {
    this.$on('refresh', this.onRefresh)
    return this
  }

  removeListeners() {
    this.$off('refresh', this.onRefresh)
    return this
  }
}

KeywordToLink.DEFAULTS = (() => {
  const OPTIONS = {
    articleElement: '#article',
    keywords: []
  }

  return cloneDeep(OPTIONS)
})()

export default KeywordToLink
