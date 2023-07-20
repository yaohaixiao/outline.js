import toString from '../lang/toString'
import isObject from './isObject'

const isFragment = (fragment) => {
  return (
    isObject(fragment) &&
    toString.call(fragment) === '[object DocumentFragment]'
  )
}

export default isFragment
