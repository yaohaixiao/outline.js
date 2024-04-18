import Outline from '../../outline'
import isMobile from '../../utils/dom/isMobile'

const defaults = Outline.DEFAULTS
let outline

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
  title: document.querySelector('.main__h1')
}
defaults.chapterTextFilter = (text) => {
  return text.replace(/\s*\(.*?\)/, '()')
}
defaults.customClass = 'aside-navigator'

outline = new Outline(defaults)

if (isMobile()) {
  outline.toggle()
}

export default outline
