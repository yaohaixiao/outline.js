import isNumber from '@/utils/types/isNumber'

describe('isNumber() 方法：', () => {
  it(`isNumber(0), 返回：true`, () => {
    expect(isNumber(0)).toBe(true)
  })

  it(`isNumber(.1), 返回：true`, () => {
    expect(isNumber(0.1)).toBe(true)
  })

  it(`isNumber(2.3E2), 返回：true`, () => {
    expect(isNumber(2.3e2)).toBe(true)
  })

  it(`isNumber(0xffffff), 返回：true`, () => {
    expect(isNumber(0xffffff)).toBe(true)
  })

  it(`isNumber(NaN), 返回：true`, () => {
    expect(isNumber(NaN)).toBe(true)
  })

  it(`isNumber(Infinity), 返回：true`, () => {
    expect(isNumber(Infinity)).toBe(true)
  })

  it(`isNumber(-Infinity), 返回：true`, () => {
    expect(isNumber(-Infinity)).toBe(true)
  })

  it(`isNumber('2'), 返回：false`, () => {
    expect(isNumber('2')).toBe(false)
  })

  it(`isNumber(2 + '1'), 返回：false`, () => {
    expect(isNumber(2 + '1')).toBe(false)
  })

  it(`isNumber(new Number()), 返回：false`, () => {
    expect(isNumber(new Number())).toBe(false)
  })
})
