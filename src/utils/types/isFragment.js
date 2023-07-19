import toString from '../lang/toString'

const isFragment = (fragment) => {
  return toString.call(fragment) === '[object DocumentFragment]'
}

export default isFragment
