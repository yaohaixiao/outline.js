import isString from './isString'

const isSVG = (str) => {
  const declaration = '(?:<\\?xml[^>]*>\\s*)?'
  const doctype =
    '(?:<\\!doctype svg[^>]*\\s*(?:\\[?(?:\\s*<![^>]*>\\s*)*\\]?)*[^>]*>\\s*)?'
  const content = '<svg[^>]*>[^]*<\\/svg>\\s*$'
  const svg = `^\\s*${declaration}${doctype}${content}\\s*$`
  const pattern = new RegExp(svg, 'i')

  return isString(str) && pattern.test(str)
}

export default isSVG
