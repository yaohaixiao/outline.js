import isElement from '../types/isElement'

/**
 * 检测某个 DOM 节点的位置是否在另个一个 DOM 节点范围内
 * ========================================================================
 * @method inBounding
 * @param {HTMLElement} child
 * @param {HTMLElement} parent
 * @return {Boolean}
 */
const inBounding = (child, parent) => {
  let parentRect
  let childRect

  if (!isElement(child) || !isElement(parent)) {
    return false
  }

  parentRect = parent.getBoundingClientRect()
  childRect = child.getBoundingClientRect()

  return (
    childRect.top >= parentRect.top &&
    childRect.right <= parentRect.right &&
    childRect.bottom <= parentRect.bottom &&
    childRect.left >= parentRect.left
  )
}

export default inBounding
