/**
 * 获取HTML元素的某个CSS样式值
 * ====================================================
 * @param el
 * @param ruleName
 * @returns {*}
 */
const getStyle = (el, ruleName) => {
  return getComputedStyle(el)[ruleName]
}

export default getStyle
