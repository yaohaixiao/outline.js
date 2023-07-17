import offsetLeft from './offsetLeft'
import offsetTop from './offsetTop'

/**
 * 获取 DOM 节点相对于窗口的 left 和 top 值
 * ========================================================================
 * @method offset
 * @param {HTMLElement} el - DOM 节点
 * @returns {{left: Number, top: Number}}
 */
const offset = (el) => {
  let left = offsetLeft(el)
  let top = offsetTop(el)

  return {
    left: left,
    top: top
  }
}

export default offset
