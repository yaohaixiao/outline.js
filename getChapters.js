import isString from './utils/types/isString'
import isFunction from './utils/types/isFunction'
import isElement from './utils/types/isElement'
import toTree from './utils/lang/toTree'

import getChaptersByHeadings from './getChaptersByHeadings'

/**
 *
 * @param {Object} [options]
 * @param {String|HTMLElement} [options.articleElement]
 * @param {String} [options.selector]
 * @param {Boolean} [options.showCode]
 * @param {Function} [options.chapterTextFilter]
 * @param {Boolean} [options.isTreeStructured]
 * @returns {Array}
 */
const getChapters = (options) => {
  const {
    articleElement,
    selector,
    showCode,
    chapterTextFilter,
    isTreeStructured
  } = options
  let $article = document.querySelector('#article')
  let $headings = []
  let chapters = []
  let filter = (text) => {
    return text.replace(/\(.*?\)/, '()')
  }

  if (isString(articleElement)) {
    $article = document.querySelector(articleElement)
  } else if (isElement(articleElement)) {
    $article = articleElement
  }

  if (!$article) {
    return chapters
  }

  if (isFunction(chapterTextFilter)) {
    filter = chapterTextFilter
  }

  $headings = [...$article.querySelectorAll(selector || 'h1,h2,h3,h4,h5,h6')]
  chapters = getChaptersByHeadings($headings, showCode || true, filter)

  return isTreeStructured === true ? toTree(chapters, 'id', 'pid') : chapters
}

export default getChapters
