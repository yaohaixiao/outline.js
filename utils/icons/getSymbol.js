import SYMBOLS from './symbols'

/**
 * @method getSymbol
 * @param {String} name
 * @param {String} [iconSet]
 * @returns {String}
 */
const getSymbol = (name, iconSet = 'icon') => {
  const patternName = /id="(.*?)"/
  const patternSet = /^(\w+)-/
  const symbols = SYMBOLS

  return symbols.find((symbol) => {
    const names = patternName.exec(symbol)
    const fullName = names[1]
    const sets = patternSet.exec(fullName)
    const setName = sets[1]
    const iconName =
      iconSet === 'icon' ? `${iconSet}-${name}` : `${iconSet}-icon-${name}`

    return setName === iconSet && fullName === iconName
  })
}

export default getSymbol
