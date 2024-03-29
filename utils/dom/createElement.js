import isObject from '../types/isObject'
import isString from '../types/isString'
import isArray from '../types/isArray'
import isDOM from '../types/isDOM'
import setAttributes from './setAttributes'

/**
 * 创建 DOM 节点，并添加属性和子节点
 * ========================================================================
 * @method createElement
 * @param {String} tagName - 标签名称
 * @param {Object|Array|HTMLElement|DocumentFragment|String} attrs - 属性对象或者子节点
 * @param {Array|HTMLElement|DocumentFragment|String} [children] - 子节点数组
 * @returns {HTMLElement}
 */
const createElement = (tagName, attrs, children) => {
  const $fragment = document.createDocumentFragment()
  const $el = document.createElement(tagName)
  const isValidChild = (child) => {
    return isDOM(child) || isString(child)
  }
  const append = (child) => {
    let $child

    if (!isValidChild(child)) {
      return false
    }

    if (isDOM(child)) {
      $child = child
    } else if (isString(child)) {
      $child = document.createTextNode(child)
    }

    $fragment.appendChild($child)
  }

  if (isObject(attrs)) {
    setAttributes($el, attrs)
  } else if (isArray(attrs) && attrs.every((attr) => isValidChild(attr))) {
    attrs.forEach((child) => {
      append(child)
    })
  } else if (isDOM(attrs)) {
    append(attrs)
  } else if (isString(attrs)) {
    append(document.createTextNode(attrs))
  }

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
