import cloneDeep from '../utils/lang/cloneDeep'
import isElement from '../utils/types/isElement'

import Component from '../base/component'

class LazyLoad extends Component {
  constructor(options) {
    super()

    this.name = 'LazyLoad'
    this.initialize(options)

    return this
  }

  _default() {
    this.attrs = LazyLoad.DEFAULTS
    this.$el = null
    this.$images = []

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

  _paint() {
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

  reload(options) {
    this.destroy().initialize(options)
    return this
  }

  refresh() {
    this._remove().render()
    this.$emit('lazy:load:refresh')
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

LazyLoad.DEFAULTS = (() => {
  const OPTIONS = {
    articleElement: '#article',
    loading: '#article',
    alt: '图片加载中...',
    error: ''
  }

  return cloneDeep(OPTIONS)
})()

export default LazyLoad
