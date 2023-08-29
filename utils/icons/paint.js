import add from './add'
import getSymbols from './getSymbols'

/**
 * 绘制 SVG 图标集
 * ========================================================================
 * @method paint
 * @param {String|Array} symbol
 */
const paint = (symbol = '') => {
  const $body = document.body
  let $icons = document.querySelector('#outline-icons')
  let symbols = []

  add(symbol)
  symbols = getSymbols()

  if ($icons) {
    $icons.innerHTML = symbols.join('')
  } else {
    $icons = document.createElement('div')
    $icons.innerHTML =
      `<svg id="outline-icons" aria-hidden="true" style="position:absolute;display:none;width:0;height:0;overflow:hidden;">` +
      `${symbols.join('')}` +
      `</svg>`
    $body.insertBefore($icons.firstChild, $body.firstChild)
  }
}

export default paint
