import toString from '../lang/toString'
/**
 * 判断检测数据是否为 Typed Arrays 类型的数据
 * ========================================================================
 * @param {*} val
 * @returns {boolean}
 */
const isTypedArray = (val) => {
  const TYPES = [
    '[object Int8Array]',
    '[object Uint8Array]',
    '[object Uint8ClampedArray]',
    '[object Int16Array]',
    '[object Uint16Array]',
    '[object Int32Array]',
    '[object Uint32Array]',
    '[object Float32Array]',
    '[object Float64Array]',
    '[object BigInt64Array]',
    '[object BigUint64Array]'
  ]

  return TYPES.indexOf(toString(val)) > -1
}

export default isTypedArray
