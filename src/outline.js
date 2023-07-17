import Anchors from './anchors'
import Chapters from './chapters'
import Drawer from './drawer'
import Toolbar from './toolbar'

import scrollTo from './utils/dom/scrollTo'
import _getScrollElement from './utils/dom/_getScrollElement'

const $scrollElement = _getScrollElement()

const ANCHORS_OPTIONS = {
  root: '#article',
  showChapterCode: true,
  isAnchorAtStart: true
}
const anchors = new Anchors(ANCHORS_OPTIONS)

const drawer = new Drawer({
  title: 'Outline.js',
  placement: 'ltr',
  size: 'tiny'
})

const CHAPTERS_OPTIONS = {
  parentElement: drawer.$main,
  chapters: anchors.getChapters()
}
new Chapters(CHAPTERS_OPTIONS)

const TOOLBAR_OPTIONS = {
  buttons: [
    {
      name: 'up',
      icon: 'up',
      size: 20,
      action: {
        type: 'click',
        handler: function () {
          const hideUp = () => {
            toolbar.hide('up')
            toolbar.show('down')
          }
          scrollTo($scrollElement, 0, hideUp)
        }
      }
    },
    {
      name: 'menu',
      icon: 'menu',
      size: 20,
      action: {
        type: 'click',
        handler: function () {
          drawer.toggle()
        }
      }
    },
    {
      name: 'down',
      icon: 'down',
      size: 20,
      action: {
        type: 'click',
        handler: function () {
          const context = this
          const top = $scrollElement.scrollHeight
          const hideDown = (top) => {
            toolbar.hide('down')
            toolbar.show('up')
            console.log(top, context)
          }
          scrollTo($scrollElement, top, hideDown)
        }
      }
    }
  ]
}
const toolbar = new Toolbar(TOOLBAR_OPTIONS)

export default Toolbar
