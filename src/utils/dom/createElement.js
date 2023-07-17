import hasOwn from '../lang/hasOwn'
import isArray from '../types/isArray'
import isElement from '../types/isElement'
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
  let element = document.createElement(tagName)

  keys.forEach((attr) => {
    if (hasOwn(attributes, attr)) {
      setAttribute(element, attr, attributes[attr])
    }
  })

  if (isArray(children)) {
    children.forEach((child) => {
      let childNode = isElement(child) ? child : document.createTextNode(child)

      element.appendChild(childNode)
    })
  }

  return element
}

export default createElement
