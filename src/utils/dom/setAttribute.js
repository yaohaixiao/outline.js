/**
 * 给 DOM 节点设置属性/值
 * ========================================================================
 * @method setAttribute
 * @param {HTMLElement} el - DOM 节点
 * @param {String} attr - 属性名称
 * @param {String|Number|Boolean} value - 属性值
 */
const setAttribute = (el, attr, value) => {
  let tagName = el.tagName.toLowerCase()

  switch (attr) {
    case 'style':
      el.style.cssText = value
      break
    case 'value':
      if (tagName === 'input' || tagName === 'textarea') {
        el.value = value
      } else {
        el.setAttribute(attr, value)
      }
      break
    case 'className':
      el.className = value
      break
    default:
      el.setAttribute(attr, value)
      break
  }
}

export default setAttribute
