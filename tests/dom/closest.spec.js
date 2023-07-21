/**
 * @jest-environment jsdom
 */
import closest from '@/utils/dom/closest'

describe('closest() 方法', () => {
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

  describe('基础调用：closest(options, selector)', () => {
    const $support = document.querySelector('#item-support')
    const $match = closest($support, '.item-support')

    it('options 不存在，返回： null', () => {
      const $notFound = document.querySelector('#not-found')

      expect(closest($notFound, '.item-support')).toEqual(null)
    })

    it("匹配到 '.item-support'，返回匹配 DOM 元素：", () => {
      expect($match.innerHTML).toEqual($support.innerHTML)
      expect($match.id).toEqual($support.id)
    })
  })

  it('指定 ctx：closest(options, selector, ctx)', () => {
    const $support = document.querySelector('#item-support')
    let $match = closest($support, '> .item-support', $list)

    expect($match.innerHTML).toEqual($support.innerHTML)
    expect($match.id).toEqual($support.id)

    $match = closest($support, '.item-home', $match)

    expect($match).toEqual(undefined)
  })

  it('指定 includeCTX：closest(options, selector, ctx, includeCTX)', () => {
    const $support = document.querySelector('#item-support')
    const $match = closest($support, '> .item-support', $support, true)

    expect($match.innerHTML).toEqual($support.innerHTML)
    expect($match.id).toEqual($support.id)
  })
})
