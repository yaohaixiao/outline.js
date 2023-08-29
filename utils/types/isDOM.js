import isObject from './isObject'
import isElement from './isElement'
import isHTMLCollection from './isHTMLCollection'
import isFragment from './isFragment'
import isTextNode from './isTextNode'

const isDOM = (el) => {
  return !!(
    isObject(el) &&
    (isElement(el) || isHTMLCollection(el) || isFragment(el) || isTextNode(el))
  )
}

export default isDOM
