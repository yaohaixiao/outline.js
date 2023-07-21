/**
 * @jest-environment jsdom
 */
import on from '@/utils/event/on'
import off from '@/utils/event/off'

describe('on() 方法', () => {
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

  let id = ''
  let $context = null
  let data = null
  let count = 0
  const $list = document.querySelector('#list')
  const removeItem = function (evt, evtData) {
    const $remove = evt.delegateTarget
    const attrId = $remove.getAttribute('data-id')
    const $item = document.querySelector(`#item-${attrId}`)

    id = attrId
    data = evtData
    $context = this

    $item.parentNode.removeChild($item)
  }
  const showLog = function (evt, evtData) {
    const $target = evt.delegateTarget
    const attrId = $target.getAttribute('data-id')

    count += 1
    id = attrId
    data = evtData
    $context = this
  }

  it('基础调用：on(options, selector, type, fn)', () => {
    const $remove = document.querySelector('a[data-id*="home"]')
    let items

    on($list, '.remove', 'click', removeItem)
    $remove.click()

    items = document.querySelectorAll('.remove')

    expect(id).toEqual('home')
    expect(items.length).toEqual(4)
  })

  it('传递 data 参数：on(options, selector, type, fn, data)', () => {
    const $remove = document.querySelector('a[data-id*="support"]')
    let items

    off($list, 'click')
    on($list, '.remove', 'click', removeItem, { author: 'Robert' })
    $remove.click()

    items = document.querySelectorAll('.remove')

    expect(id).toEqual('support')
    expect(items.length).toEqual(3)
    expect(data.author).toEqual('Robert')
  })

  it('传递 context 参数：on(options, selector, type, fn, data, context)', () => {
    const $remove = document.querySelector('a[data-id*="faqs"]')
    let items

    off($list, 'click')
    on($list, '.remove', 'click', removeItem, { author: 'Robert Yao' }, $remove)
    $remove.click()

    items = document.querySelectorAll('.remove')

    expect(id).toEqual('faqs')
    expect(items.length).toEqual(2)
    expect(data.author).toEqual('Robert Yao')
    expect($context).toEqual($remove)

    const $user = document.querySelector('a[data-id*="user"]')

    off($list, 'click')
    on($list, '.remove', 'click', removeItem, { author: 'Robert Yao' }, true)
    $user.click()

    items = document.querySelectorAll('.remove')

    expect(id).toEqual('user')
    expect(items.length).toEqual(1)
    expect(data.author).toEqual('Robert Yao')
    expect($context.author).toEqual(data.author)
  })

  it('传递 once 参数：on(options, selector, type, fn, data, context, once)', () => {
    const $remove = document.querySelector('a[data-id*="exit"]')
    let items

    $context = null

    off($list, 'click')
    on(
      $list,
      '.remove',
      'mouseenter',
      showLog,
      { author: 'Robert Yao' },
      $remove,
      true
    )
    $remove.dispatchEvent(new CustomEvent('mouseenter'))

    items = document.querySelectorAll('.remove')

    expect(id).toEqual('exit')
    expect(items.length).toEqual(1)
    expect(data.author).toEqual('Robert Yao')
    expect($context).toEqual($remove)
    expect(count).toEqual(1)

    $remove.dispatchEvent(new CustomEvent('mouseenter'))
    expect(count).toEqual(1)
  })
})
