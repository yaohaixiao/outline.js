import Outline from '@/outline'
import PluginKeywordToLink from '@/plugins/keyword-to-link'
import observeResize from '@/utils/dom/observeResize'
import getViewportWidth from '@/utils/dom/getViewportWidth'

const defaults = Outline.DEFAULTS

Outline.plug('KeywordToLink', PluginKeywordToLink, {
  articleElement: '#article',
  keywords: [
    {
      text: 'outline',
      url: 'https://github.com/yaohaixiao/outline.js',
      target: '_self'
    }
  ]
})

defaults.articleElement = document.querySelector('#article')
defaults.parentElement = document.querySelector('#aside')
defaults.scrollElement = document.querySelector('#main')
defaults.selector = 'h2,h3'
defaults.title = false
defaults.showCode = false
defaults.position = 'sticky'
defaults.git = 'https://github.com/yaohaixiao/outline.js'
defaults.tags = 'https://github.com/yaohaixiao/outline.js/tags'
defaults.issues = 'https://github.com/yaohaixiao/outline.js/issues'
defaults.reader = {
  target: '#article',
  title: document.querySelector('.main__h1'),
  allowSpeak: true
}
defaults.chapterTextFilter = true
defaults.anchorLinkFilter = (tag, title, id) => {
  return `${tag}-${title}-${id}`
}
defaults.customClass = 'aside-navigator'
defaults.afterScroll = (type) => {
  const viewportWidth = getViewportWidth()
  if (viewportWidth <= 500 && type === 'chapter') {
    outline.toggle()
  }
}

const outline = new Outline(defaults)

observeResize(document.querySelector('#docs'), () => {
  const viewportWidth = getViewportWidth()
  if (viewportWidth <= 500 && outline.isExpanded()) {
    outline.toggle()
  }
})

export default outline
