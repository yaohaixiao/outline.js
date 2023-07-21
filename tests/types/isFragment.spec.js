/**
 * @jest-environment jsdom
 */
import isFragment from '@/utils/types/isFragment'
import isElement from '@/utils/types/isElement'

describe('is() 方法：', () => {
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

  it(`isFragment(document.getElementById('list')), 返回：false`, () => {
    const $list = document.getElementById('list')
    expect(isElement($list)).toBe(true)
    expect(isFragment($list)).toBe(false)
  })

  it(`isFragment(document.createElement('div')), 返回：false`, () => {
    const $div = document.createElement('div')
    expect(isElement($div)).toBe(true)
    expect(isFragment($div)).toBe(false)
  })

  it(`isFragment(document.createTextNode('text')), 返回：false`, () => {
    const $text = document.createTextNode('text')
    expect(isElement($text)).toBe(false)
    expect(isFragment($text)).toBe(false)
  })

  it(`isFragment(document.createDocumentFragment()), 返回：true`, () => {
    const $fragment = document.createDocumentFragment()
    expect(isElement($fragment)).toBe(false)
    expect(isFragment($fragment)).toBe(true)
  })

  it(`isFragment(document.querySelectorAll('.item')), 返回：false`, () => {
    const $items = document.querySelectorAll('.item')
    expect(isElement($items)).toBe(false)
    expect(isFragment($items)).toBe(false)
  })
})
