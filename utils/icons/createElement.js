import isArray from '../types/isArray'
import isString from '../types/isString'
import isSVG from '../types/isSVG'
import _createElement from '../dom/createElement'
import setAttributes from '../dom/setAttributes'
import removeClass from '../dom/removeClass'

/**
 * 创建 SVG 图标 DOM 元素
 * ========================================================================
 * @method createElement
 * @param {String} name
 * @param {Object} [options]
 * @param {Number|Array} [options.size]
 * @param {String} [options.color]
 * @param {String} [options.iconSet]
 * @param {Object} [options.attrs]
 * @returns {HTMLElement}
 */
const createElement = (name, options = {}) => {
  const ICON = 'outline-icon'
  const HIDDEN = `${ICON}_hidden`
  const size = options.size || 0
  const color = options.color || ''
  const iconSet = options.iconSet || ''
  const width = isArray(size) ? size[0] : size
  const height = isArray(size) ? size[1] : size
  const defaultRules = size ? `width:${width}px;height:${height}px;` : ''
  const cssRules = color ? defaultRules + `color:${color}` : defaultRules
  const attrs = options.attrs || {}
  let binds = ''
  let svg = ''
  let $icon
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
    svg = `<svg><use ${binds}></use></svg>`
  }

  if (attrs.className) {
    attrs.className = `${ICON} ${attrs.className} ${HIDDEN}`
  } else {
    attrs.className = `${ICON} ${HIDDEN}`
  }
  attrs.innerHTML = svg

  $icon = _createElement('i', attrs)
  $svg = $icon.querySelector('svg')
  setAttributes($svg, {
    'aria-hidden': true,
    xmlns: 'http://www.w3.org/2000/svg',
    class: 'outline-icon__svg',
    width: 200,
    height: 200,
    style: cssRules
  })
  removeClass($icon, HIDDEN)

  return $icon
}

export default createElement
