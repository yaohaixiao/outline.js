/**
 * @jest-environment jsdom
 */
import isString from '@/utils/types/isString'

describe('isString() 方法：', () => {
  it(`isString(''), 返回：true`, () => {
    expect(isString('')).toBe(true)
  })

  it(`isString(String('20')), 返回：true`, () => {
    expect(isString(String('20'))).toBe(true)
  })

  it(`isString(2 + '0'), 返回：true`, () => {
    expect(isString(2 + '0')).toBe(true)
  })

  it(`isString(2), 返回：false`, () => {
    expect(isString(2)).toBe(false)
  })

  it(`isString(new String()), 返回：false`, () => {
    expect(isString(new String())).toBe(false)
  })

  it(`isString(document.createTextNode('text')), 返回：false`, () => {
    const text = document.createTextNode('text')
    expect(isString(text)).toBe(false)
  })
})
