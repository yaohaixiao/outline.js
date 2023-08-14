import isString from '../types/isString'
import getSymbol from './getSymbol'
import getSymbols from './getSymbols'
import SYMBOLS from './symbols'

const remove = (name, iconSet = 'icon') => {
  const $icons = document.querySelector('#outline-icons')
  const symbols = getSymbols()
  const target = getSymbol(name, iconSet)
  let index = -1
  let $symbol
  let selector

  if (!isString(name)) {
    return false
  }

  index = symbols.indexOf(target)

  /* istanbul ignore else */
  if (index > -1) {
    SYMBOLS.splice(index, 1)
  }

  if ($icons) {
    selector = `#${iconSet === 'icon' ? 'icon' : iconSet + '-icon'}-${name}`
    $symbol = $icons.querySelector(selector)
    $icons.removeChild($symbol)
  }
}

export default remove
