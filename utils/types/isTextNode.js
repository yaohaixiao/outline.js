import toString from '../lang/toString'
import isObject from './isObject'

const isTextNode = (el) => {
  return !!(
    isObject(el) &&
    (toString(el) === '[object Text]' || (el.tagName && el.nodeType === 3))
  )
}

export default isTextNode
