/**
 * Object 对象原型上的 toString 方法
 * ========================================================================
 * @method toString
 * @param {*} val
 * @returns {string}
 */
const toString = (val) => {
  return Object.prototype.toString.apply(val)
}

export default toString
