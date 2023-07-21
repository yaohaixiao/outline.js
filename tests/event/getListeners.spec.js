/**
 * @jest-environment jsdom
 */
import on from '@/utils/event/on'
import getListeners from '@/utils/event/getListeners'

describe('getListeners() 方法', () => {
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

  let id = ''
  const $list = document.querySelector('#list')
  const removeItem = function (evt) {
    const $remove = evt.delegateTarget
    const data = $remove.getAttribute('data-id')
    const $item = document.querySelector(`#item-${data}`)

    id = data
    $list.removeChild($item)
  }

  it('未绑定事件，返回：[]', () => {
    const callbacks = getListeners($list)

    expect(callbacks.length).toEqual(0)
  })

  it('getListeners($list) 获取所有事件处理器：', () => {
    let callbacks = []

    on($list, '.remove', 'click', removeItem)

    callbacks = getListeners($list)

    expect(callbacks.length).toEqual(1)

    on($list, '.remove', 'input', removeItem)

    callbacks = getListeners($list)

    expect(callbacks.length).toEqual(2)
  })

  it('getListeners($list, type) 获取 type 指定类型事件处理器：', () => {
    let callbacks = []

    callbacks = getListeners($list, 'click')

    expect(callbacks.length).toEqual(1)

    callbacks = getListeners($list, 'input')

    expect(callbacks.length).toEqual(1)

    callbacks = getListeners($list, 'dbclick')

    expect(callbacks.length).toEqual(0)
  })
})
