import isString from '../types/isString'
import getSymbol from './getSymbol'
import SYMBOLS from './symbols'

/**
 *
 * @method getSymbols
 * @param {String} [name]
 * @param {String} [iconSet]
 * @returns {string[]|*}
 */
const getSymbols = (name, iconSet = 'icon') => {
  if (isString(name)) {
    return getSymbol(name, iconSet)
  }

  return [...SYMBOLS]
}

export default getSymbols
