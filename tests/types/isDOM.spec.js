/**
 * @jest-environment jsdom
 */
import isTextNode from '@/utils/types/isTextNode'
import isElement from '@/utils/types/isElement'
import isFragment from '@/utils/types/isFragment'
import isHTMLCollection from '@/utils/types/isHTMLCollection'
import isDOM from '@/utils/types/isDOM'

describe('isDOM() 方法：', () => {
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

  describe(`非对象参数：`, () => {
    it(`isDOM(false), 返回：false`, () => {
      expect(isDOM(false)).toBe(false)
    })
    it(`isDOM(1), 返回：false`, () => {
      expect(isDOM(1)).toBe(false)
    })
    it(`isDOM('dom'), 返回：false`, () => {
      expect(isDOM('dom')).toBe(false)
    })
    it(`isDOM(undefined), 返回：false`, () => {
      let str
      expect(isDOM(str)).toBe(false)
    })
    it(`isDOM(Symbol('prop')), 返回：false`, () => {
      expect(isDOM(Symbol('prop'))).toBe(false)
    })
    it(`isDOM(BigInt(22)), 返回：false`, () => {
      expect(isDOM(BigInt(22))).toBe(false)
    })
  })

  describe(`对象参数：`, () => {
    it(`isDOM({}), 返回：false`, () => {
      expect(isDOM(false)).toBe(false)
    })
    it(`isDOM([]), 返回：false`, () => {
      expect(isDOM([])).toBe(false)
    })

    it(`isDOM(document.getElementById('list')), 返回：true`, () => {
      const $list = document.getElementById('list')
      expect(isElement($list)).toBe(true)
      expect(isDOM($list)).toBe(true)
    })

    it(`isDOM(document.querySelectorAll('.item')), 返回：true`, () => {
      const $items = document.querySelectorAll('.item')
      expect(isHTMLCollection($items)).toBe(true)
      expect(isDOM($items)).toBe(true)
    })

    it(`isDOM(document.createTextNode('text')), 返回：true`, () => {
      const $text = document.createTextNode('text')
      expect(isTextNode($text)).toBe(true)
      expect(isDOM($text)).toBe(true)
    })

    it(`isDOM(document.createDocumentFragment()), 返回：true`, () => {
      const $frag = document.createDocumentFragment()
      expect(isFragment($frag)).toBe(true)
      expect(isDOM($frag)).toBe(true)
    })
  })
})
