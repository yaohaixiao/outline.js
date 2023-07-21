/**
 * @jest-environment jsdom
 */
import addClass from '@/utils/dom/addClass'
import hasClass from '@/utils/dom/hasClass'

describe('closest() 方法', () => {
  // Set up our document body
  document.body.innerHTML =
    '<ul id="list" class="list">\n' +
    '  <li class="item item-home" id="item-home">\n' +
    '    <span>Home</span>\n' +
    '    <a href="/sitemap#home" class="remove" data-id="home">删除</a>\n' +
    '  </li>\n' +
    '  <li class="item item-support item-ok" id="item-support">\n' +
    '    <span>Support</span>\n' +
    '    <a href="/sitemap#support" class="remove" data-id="support">删除</a>\n' +
    '  </li>\n' +
    '  <li class="item item-faqs" id="item-faqs">\n' +
    '    <span>FAQs</span>\n' +
    '    <a href="/sitemap#faqs" class="remove" data-id="faqs">删除</a>\n' +
    '  </li>\n' +
    '</ul>'

  it(`addClass($list, 'nav')，返回： false`, () => {
    const $list = document.querySelector('#list')
    expect(hasClass($list, 'item')).toEqual(false)
    addClass($list, 'nav')
    expect(hasClass($list, 'nav')).toBe(true)
    $list.classList.add = null
    addClass($list, 'menu')
    expect(hasClass($list, 'menu')).toBe(true)
  })
})
