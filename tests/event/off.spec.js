/**
 * @jest-environment jsdom
 */
import off from '@/utils/event/off'
import on from '@/utils/event/on'
import getListeners from '@/utils/event/getListeners'
import stop from '@/utils/event/stop'

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

  let count = 0
  let id = ''
  const $list = document.querySelector('#list')
  const removeItem = function (evt) {
    const $remove = evt.delegateTarget
    let $item

    id = $remove.getAttribute('data-id')
    $item = document.querySelector(`#item-${id}`)

    $item.parentNode.removeChild($item)

    stop(evt)
  }
  const showLog = function (evt) {
    const $target = evt.delegateTarget

    id = $target.id
    count += 1
  }

  it('基础调用：of(options, type, fn)', () => {
    const $home = document.querySelector('a[data-id="home"]')
    const $faqs = document.querySelector('#item-faqs')

    let allListeners = []
    let clickListeners = []

    on($list, '.remove', 'click', removeItem)
    on($list, '.item', 'click', showLog)

    $home.click()

    expect(id).toEqual('item-home')
    expect(document.querySelectorAll('.item').length).toEqual(2)

    $faqs.click()

    expect(count).toEqual(2)

    allListeners = getListeners($list)
    clickListeners = getListeners($list, 'click')

    expect(clickListeners.length).toEqual(2)
    expect(allListeners.length).toEqual(2)

    off($list, 'click', removeItem)

    allListeners = getListeners($list)
    clickListeners = getListeners($list, 'click')

    expect(clickListeners.length).toEqual(1)
    expect(allListeners.length).toEqual(1)

    off($list, 'click', showLog)

    allListeners = getListeners($list)
    clickListeners = getListeners($list, 'click')

    expect(clickListeners.length).toEqual(0)
    expect(allListeners.length).toEqual(0)
  })

  it('不传递 fn 参数：off(options, type)', () => {
    const $support = document.querySelector('a[data-id="support"]')
    const $faqs = document.querySelector('#item-faqs')
    let allListeners = []
    let clickListeners = []

    on($list, '.remove', 'click', removeItem)
    on($list, '.item', 'click', showLog)

    off($list, 'click')

    allListeners = getListeners($list)
    clickListeners = getListeners($list, 'click')

    expect(clickListeners.length).toEqual(0)
    expect(allListeners.length).toEqual(0)

    $support.click()
    $faqs.click()

    expect(count).toEqual(2)
    expect(document.querySelectorAll('.item').length).toEqual(2)
  })
})
