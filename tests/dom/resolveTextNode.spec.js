/**
 * @jest-environment jsdom
 */
import resolveTextNode from '@/utils/dom/resolveTextNode'
import isElement from '@/utils/types/isElement'

describe('resolveTextNode() 方法', () => {
  // Set up our document body
  document.body.innerHTML =
    '<ul id="list" class="list">\n' +
    '  <li class="item" id="item-home">\n' +
    '    <span>Home</span>\n' +
    '    <a href="/sitemap#home" class="remove" data-id="home">删除</a>\n' +
    '  </li>\n' +
    '  <li class="item" id="item-support">\n' +
    '    <span>Support</span>\n' +
    '    <a href="/sitemap#support" class="remove" data-id="support">删除</a>\n' +
    '  </li>\n' +
    '  <li class="item" id="item-faqs">\n' +
    '    <span>FAQs</span>\n' +
    '    <a href="/sitemap#faqs" class="remove" data-id="faqs">删除</a>\n' +
    '  </li>\n' +
    '  <li class="item" id="item-user">\n' +
    '    <span>FAQs</span>\n' +
    '    <a href="/sitemap#user" class="remove" data-id="user">删除</a>\n' +
    '  </li>\n' +
    '  <li class="item" id="item-exit">\n' +
    '    <span>退出</span>\n' +
    '    <a href="/sitemap#exit" class="remove" data-id="exit">删除</a>\n' +
    '  </li>\n' +
    '</ul>'

  const $list = document.querySelector('#list')
  const $home = document.querySelector('a[data-id="home"]')

  it('options 参数为 HTMLElement 类型 DOM 元素，resolveTextNode() 方法返回：options', () => {
    expect(isElement($list)).toBe(true)
    expect(resolveTextNode($list)).toEqual($list)

    expect(isElement($home)).toBe(true)
    expect(resolveTextNode($home)).toEqual($home)
  })

  it('options 参数为文本节点类型 DOM 元素，resolveTextNode() 方法返回：options.parentNode', () => {
    const $text = $home.firstChild

    expect(isElement($text)).toBe(false)
    expect($text.textContent).toEqual('删除')
    expect(resolveTextNode($text)).toEqual($home)
  })
})
