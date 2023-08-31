import isArray from '../types/isArray'
import isString from '../types/isString'
import SYMBOLS from './symbols'

/**
 * @method add
 * @param {Array|String} symbols
 * @return {Boolean}
 */
const add = (symbols) => {
  if (!symbols) {
    return false
  }

  if (isArray(symbols) && symbols.length > 0) {
    symbols.forEach((symbol) => {
      /* istanbul ignore else */
      if (SYMBOLS.indexOf(symbol) === -1 && isString(symbol)) {
        SYMBOLS.push(symbol)
      }
    })
  } else {
    /* istanbul ignore else */
    if (isString(symbols)) {
      SYMBOLS.push(symbols)
    }
  }
}

export default add
