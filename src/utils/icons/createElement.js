import isArray from '../types/isArray'
import isString from '../types/isString'
import isSVG from '../types/isSVG'

/**
 * 创建 SVG 图标 DOM 元素
 * ========================================================================
 * @method createElement
 * @param {String} name
 * @param {Object} [options]
 * @param {Number|Array} [options.size]
 * @param {String} [options.color]
 * @param {String} [options.iconSet]
 * @returns {HTMLElement}
 */
const createElement = (name, options = {}) => {
  const size = options.size || 0
  const color = options.color || ''
  const iconSet = options.iconSet || ''
  const width = isArray(size) ? size[0] : size
  const height = isArray(size) ? size[1] : size
  const defaultRules = size ? `width:${width}px;height:${height}px;` : ''
  const cssRules = color ? defaultRules + `color:${color}` : defaultRules
  const $icon = document.createElement('i')
  let binds = ''
  let svg = ''
  let $svg

  if (!isString(name)) {
    return null
  }

  if (isSVG(name)) {
    svg = name
  } else {
    binds =
      iconSet && iconSet !== 'icon'
        ? `xlink:href="#${iconSet}-icon-${name}"`
        : `xlink:href="#icon-${name}"`
    svg =
      `<svg aria-hidden="true" class="outline-icon__svg" style="${cssRules}">` +
      `<use ${binds}></use>` +
      `</svg>`
  }

  $icon.className = 'outline-icon'
  $icon.innerHTML = svg

  if (isSVG(name)) {
    $svg = $icon.querySelector('svg')
    $svg.setAttribute('aria-hidden', 'true')
    $svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    $svg.setAttribute('class', 'outline-icon__svg')
    $svg.setAttribute('width', '200')
    $svg.setAttribute('height', '200')
    $svg.style = cssRules
  }

  return $icon
}

export default createElement
