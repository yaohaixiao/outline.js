import isObject from './isObject'

/**
 * 检测数据是否为 HTMLElement DOM 节点
 * ========================================================================
 * @method isElement
 * @param {*} o
 * @returns {boolean}
 */
const isElement = (o) => {
  return !!(isObject(o) && o.nodeName && o.tagName && o.nodeType === 1)
}

export default isElement
