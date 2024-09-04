import toString from '@/utils/lang/toString'
import isObject from './isObject'

const isFragment = (fragment) => {
  return !!(
    isObject(fragment) && toString(fragment) === '[object DocumentFragment]'
  )
}

export default isFragment
