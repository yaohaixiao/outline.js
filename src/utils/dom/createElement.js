import hasOwn from '../lang/hasOwn'
import isArray from '../types/isArray'
import isElement from '../types/isElement'
import isFragment from '../types/isFragment'
import setAttribute from './setAttribute'

/**
 * 创建 DOM 节点，并添加属性和子节点
 * ========================================================================
 * @method createElement
 * @param {String} tagName - 标签名称
 * @param {Object} attributes - 属性对象
 * @param {Array} children - 子节点数组
 * @returns {HTMLElement}
 */
const createElement = (tagName, attributes, children) => {
  const keys = Object.keys(attributes)
  const $fragment = document.createDocumentFragment()
  const $el = document.createElement(tagName)
  const append = (child) => {
    let $child
    if (isElement(child) || isFragment(child)) {
      $child = child
    } else {
      $child = document.createTextNode(child)
    }

    $fragment.appendChild($child)
  }

  keys.forEach((attr) => {
    if (hasOwn(attributes, attr)) {
      setAttribute($el, attr, attributes[attr])
    }
  })

  if (isArray(children)) {
    children.forEach((child) => {
      append(child)
    })
  } else {
    append(children)
  }

  $el.appendChild($fragment)

  return $el
}

export default createElement
