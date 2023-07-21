import toString from '../lang/toString'
import isObject from './isObject'

const isHTMLCollection = (el) => {
  return !!(isObject(el) && toString.apply(el) === '[object NodeList]')
}

export default isHTMLCollection
