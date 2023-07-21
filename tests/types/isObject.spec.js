/**
 * @jest-environment jsdom
 */
import isObject from '@/utils/types/isObject'

describe('isObject() 方法：', () => {
  // Set up our document body
  document.body.innerHTML =
    '<ul id="list" class="list">\n' +
    '  <li class="item item-home" id="item-home">\n' +
    '    <span>Home</span>\n' +
    '    <a href="/sitemap#home" class="remove" data-id="home">删除</a>\n' +
    '  </li>\n' +
    '  <li class="item item-support" id="item-support">\n' +
    '    <span id="text">Support</span>\n' +
    '    <a href="/sitemap#support" class="remove" data-id="support">删除</a>\n' +
    '  </li>\n' +
    '  <li class="item item-faqs" id="item-faqs">\n' +
    '    <span>FAQs</span>\n' +
    '    <a href="/sitemap#faqs" class="remove" data-id="faqs">删除</a>\n' +
    '  </li>\n' +
    '</ul>'

  it(`isObject({}), 返回：true`, () => {
    expect(isObject({})).toBe(true)
  })

  it(`isObject(null), 返回：false`, () => {
    expect(isObject(null)).toBe(false)
  })

  it(`isObject([]), 返回：true`, () => {
    expect(isObject([])).toBe(true)
  })

  it(`isObject(class {}), 返回：true`, () => {
    const empty = class {}
    expect(isObject(empty)).toBe(true)
  })

  it(`isObject(Object), 返回：true`, () => {
    expect(isObject(Object)).toBe(true)
  })

  it(`isObject(new Object()), 返回：true`, () => {
    expect(isObject(new Object())).toBe(true)
  })

  it(`isObject(Object.create(null)), 返回：true`, () => {
    const o = Object.create(null)
    expect(isObject(o)).toBe(true)
  })

  it(`isObject(document.getElementById('list')), 返回：true`, () => {
    const $list = document.getElementById('list')
    expect(isObject($list)).toBe(true)
  })

  it(`isObject('null'), 返回：false`, () => {
    expect(isObject('null')).toBe(false)
  })

  it(`isObject(1), 返回：false`, () => {
    expect(isObject(1)).toBe(false)
  })

  it(`isObject(false), 返回：false`, () => {
    expect(isObject(false)).toBe(false)
  })

  it(`isObject(Symbol()), 返回：false`, () => {
    expect(isObject(Symbol())).toBe(false)
  })
})
