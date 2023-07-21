import isTypedArray from '@/utils/types/isTypedArray'

describe('isTypedArray() 方法：', () => {
  it(`isTypedArray(arguments), 返回：false`, () => {
    let args

    function test(str) {
      args = arguments
      return str
    }

    test('str')

    expect(isTypedArray(args)).toBe(false)
  })

  it(`isTypedArray([]), 返回：false`, () => {
    expect(isTypedArray([])).toBe(false)
  })

  it(`isTypedArray(new Array()), 返回：false`, () => {
    const arr = new Array()
    expect(isTypedArray(arr)).toBe(false)
  })

  it(`isTypedArray(new ArrayBuffer()), 返回：false`, () => {
    const arr = new ArrayBuffer(20)
    expect(isTypedArray(arr)).toBe(false)
  })

  it(`isTypedArray(new Int8Array([])), 返回：true`, () => {
    const arr = new Int8Array([])
    expect(isTypedArray(arr)).toBe(true)
  })

  it(`isTypedArray(new Int16Array([])), 返回：true`, () => {
    const arr = new Int16Array([])
    expect(isTypedArray(arr)).toBe(true)
  })

  it(`isTypedArray(new Int32Array([])), 返回：true`, () => {
    const arr = new Int32Array([])
    expect(isTypedArray(arr)).toBe(true)
  })

  it(`isTypedArray(new Uint8ClampedArray([])), 返回：true`, () => {
    const arr = new Uint8ClampedArray([])
    expect(isTypedArray(arr)).toBe(true)
  })

  it(`isTypedArray(new Uint8Array([])), 返回：true`, () => {
    const arr = new Uint8Array([])
    expect(isTypedArray(arr)).toBe(true)
  })

  it(`isTypedArray(new Uint16Array([])), 返回：true`, () => {
    const arr = new Uint16Array([])
    expect(isTypedArray(arr)).toBe(true)
  })

  it(`isTypedArray(new Uint32Array([])), 返回：true`, () => {
    const arr = new Uint32Array([])
    expect(isTypedArray(arr)).toBe(true)
  })

  it(`isTypedArray(new Float32Array([])), 返回：true`, () => {
    const arr = new Float32Array([])
    expect(isTypedArray(arr)).toBe(true)
  })

  it(`isTypedArray(new Float64Array([])), 返回：true`, () => {
    const arr = new Float64Array([])
    expect(isTypedArray(arr)).toBe(true)
  })

  it(`isTypedArray(new BigInt64Array(42)), 返回：true`, () => {
    const arr = new BigInt64Array(42)
    expect(isTypedArray(arr)).toBe(true)
  })

  it(`isTypedArray(new BigUint64Array(42)), 返回：true`, () => {
    const arr = new BigUint64Array(42)
    expect(isTypedArray(arr)).toBe(true)
  })
})
