/**
 * 获取 DOM 节点相对于窗口的 left （纵坐标）值
 * ========================================================================
 * @method offsetTop
 * @param {HTMLElement} el - DOM 节点
 * @returns {Number}
 */
const offsetTop = (el) => {
  let top = el.offsetTop

  if (el.offsetParent !== null) {
    top += offsetTop(el.offsetParent)
  }

  return top
}

export default offsetTop
