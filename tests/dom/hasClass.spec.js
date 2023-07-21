/**
 * @jest-environment jsdom
 */
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

  it(`hasClass($list, 'item')，返回： false`, () => {
    const $list = document.querySelector('#list')
    const $text = document.createTextNode('text')
    expect(hasClass($list, 'item')).toEqual(false)
    expect(hasClass($text)).toEqual(false)
  })

  it(`hasClass($list, 'list')，返回： true`, () => {
    const $list = document.querySelector('#list')
    expect(hasClass($list, 'list')).toEqual(true)
  })

  it(`hasClass($support, 'item-support')，返回： true`, () => {
    const $support = document.querySelector('#item-support')
    $support.classList.contains = null
    expect(hasClass($support, 'item')).toEqual(true)
    expect(hasClass($support, 'item-support')).toEqual(true)
    expect(hasClass($support, 'item-ok')).toEqual(true)
  })
})
