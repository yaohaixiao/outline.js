import toString from '../lang/toString'
import isObject from './isObject'

const isFragment = (fragment) => {
  return !!(
    isObject(fragment) && toString(fragment) === '[object DocumentFragment]'
  )
}

export default isFragment
