/**
 * 获取 DOM 节点相对于窗口的 left（横坐标）值
 * ========================================================================
 * @method offsetLeft
 * @param {HTMLElement} el - DOM 节点
 * @returns {Number}
 */
const offsetLeft = (el) => {
  let left = el.offsetLeft

  if (el.offsetParent !== null) {
    left += offsetLeft(el.offsetParent)
  }

  return left
}

export default offsetLeft
