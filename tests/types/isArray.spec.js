/**
 * @jest-environment jsdom
 */
import isArray from '@/utils/types/isArray'

describe('isArray() 方法：', () => {
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

  it(`isArray(arguments), 返回：false`, () => {
    let args

    function sum(a, b) {
      args = arguments
      return a + b
    }

    sum(3, 4)

    expect(isArray(args)).toBe(false)
  })

  it(`isArray(new Int8Array([])), 返回：false`, () => {
    expect(isArray(new Int8Array([]))).toBe(false)
  })

  it(`isArray({ '0':1, '1':2, length: 2 }), 返回：false`, () => {
    const o = { 0: 1, 1: 2, length: 2 }
    expect(isArray(o)).toBe(false)
  })

  it(`isArray(document.getElementsByTagName('li')), 返回：false`, () => {
    const $items = document.getElementsByTagName('li')
    expect(isArray($items)).toBe(false)
  })

  it(`isArray([]), 返回：true`, () => {
    expect(isArray([])).toBe(true)
  })

  it(`isArray(new Array()), 返回：true`, () => {
    const arr = []

    Array.isArray = null

    expect(isArray(new Array())).toBe(true)
    expect(isArray(arr)).toBe(true)
  })

  it(`isArray('type.js'.split('')), 返回：true`, () => {
    const arr = 'type.js'.split('')
    expect(isArray(arr)).toBe(true)
  })
})
