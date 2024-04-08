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
  let isInBounding = false
  let parentRect
  let childRect

  if (!isElement(child) || !isElement(parent)) {
    return isInBounding
  }

  parentRect = parent.getBoundingClientRect()
  childRect = child.getBoundingClientRect()

  console.log('parentRect', parentRect)
  console.log('childRect', childRect)

  isInBounding = !!(
    childRect.top >= parentRect.top &&
    childRect.right <= parentRect.right &&
    childRect.bottom <= parentRect.bottom &&
    childRect.left >= parentRect.left
  )

  console.log('isInBounding', isInBounding)

  return isInBounding
}

export default inBounding
