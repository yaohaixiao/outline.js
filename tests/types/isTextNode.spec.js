/**
 * @jest-environment jsdom
 */
import isTextNode from '@/utils/types/isTextNode'
import isElement from '@/utils/types/isElement'
import isFragment from '@/utils/types/isFragment'
import isHTMLCollection from '@/utils/types/isHTMLCollection'

describe('isTextNode() 方法：', () => {
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

  it(`isTextNode(document.getElementById('list')), 返回：false`, () => {
    const $list = document.getElementById('list')
    expect(isElement($list)).toBe(true)
    expect(isTextNode($list)).toBe(false)
  })

  it(`isTextNode(document.createElement('div')), 返回：false`, () => {
    const $div = document.createElement('div')
    expect(isElement($div)).toBe(true)
    expect(isTextNode($div)).toBe(false)
  })

  it(`isTextNode(document.createDocumentFragment()), 返回：false`, () => {
    const $fragment = document.createDocumentFragment()
    expect(isFragment($fragment)).toBe(true)
    expect(isTextNode($fragment)).toBe(false)
  })

  it(`isTextNode(document.querySelectorAll('.item')), 返回：false`, () => {
    const $items = document.querySelectorAll('.item')
    expect(isHTMLCollection($items)).toBe(true)
    expect(isTextNode($items)).toBe(false)
  })

  it(`isTextNode(document.createTextNode('text')), 返回：true`, () => {
    const $text = document.createTextNode('text')
    expect(isElement($text)).toBe(false)
    expect(isTextNode($text)).toBe(true)
  })
})
