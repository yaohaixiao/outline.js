/**
 * @jest-environment jsdom
 */
import matches from '@/utils/dom/matches'

describe('matches() 方法', () => {
  // Set up our document body
  document.body.innerHTML =
    '<ul id="list" class="list">\n' +
    '  <li class="item item-home" id="item-home">\n' +
    '    <span>Home</span>\n' +
    '    <a href="/sitemap#home" class="remove" data-id="home">删除</a>\n' +
    '  </li>\n' +
    '  <li class="item item-support" id="item-support">\n' +
    '    <span>Support</span>\n' +
    '    <a href="/sitemap#support" class="remove" data-id="support">删除</a>\n' +
    '  </li>\n' +
    '  <li class="item item-faqs" id="item-faqs">\n' +
    '    <span>FAQs</span>\n' +
    '    <a href="/sitemap#faqs" class="remove" data-id="faqs">删除</a>\n' +
    '  </li>\n' +
    '</ul>'

  const $list = document.querySelector('#list')
  const clone = $list.matches

  it('selector 参数为空, 返回：false', () => {
    expect(matches($list)).toBe(false)
  })

  it('options 参数为空，selector 参数为：.list，返回：false', () => {
    expect(matches(null, 'selector')).toBe(false)
  })

  it('selector 参数为：.list, 返回：true', () => {
    expect(matches($list, '.list')).toBe(true)
  })

  it('模拟 options.msMatchesSelector, 返回：true', () => {
    $list.msMatchesSelector = clone
    $list.matches = null

    expect(matches($list, '.list')).toBe(true)
  })
})
