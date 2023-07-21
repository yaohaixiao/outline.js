/**
 * @jest-environment jsdom
 */
import purgeElement from '@/utils/event/purgeElement'
import on from '@/utils/event/on'
import getListeners from '@/utils/event/getListeners'

describe('closest() 方法', () => {
  // Set up our document body
  document.body.innerHTML =
    '<ul id="list" class="list">\n' +
    '  <li class="item item-home" id="item-home">\n' +
    '    <span id="text-home">Home</span>\n' +
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
  const $list = document.querySelector('#list')
  const removeItem = function (evt) {
    const $remove = evt.delegateTarget
    const id = $remove.getAttribute('data-id')
    const $item = document.querySelector(`#item-${id}`)

    $item.parentNode.removeChild($item)
  }
  const showLog = function (evt) {
    const $target = evt.delegateTarget
    const id = $target.getAttribute('data-id')

    console.log('你点击的 DOM 元素 id 为：', id)
  }
  const record = () => {
    count += 1
  }

  it('基础调用：purgeElement(options, type)', () => {
    let allListeners = []
    let clickListeners = []
    let dbclickListeners = []

    on($list, '.remove', 'click', removeItem)
    on($list, '.item', 'dbclick', showLog)

    allListeners = getListeners($list)
    clickListeners = getListeners($list, 'click')
    dbclickListeners = getListeners($list, 'dbclick')

    expect(clickListeners.length).toEqual(1)
    expect(dbclickListeners.length).toEqual(1)
    expect(allListeners.length).toEqual(2)

    purgeElement($list, 'click')

    allListeners = getListeners($list)
    clickListeners = getListeners($list, 'click')
    dbclickListeners = getListeners($list, 'dbclick')

    expect(clickListeners.length).toEqual(0)
    expect(dbclickListeners.length).toEqual(1)
    expect(allListeners.length).toEqual(1)

    purgeElement($list, true)

    allListeners = getListeners($list)
    dbclickListeners = getListeners($list, 'dbclick')

    expect(dbclickListeners.length).toEqual(0)
    expect(allListeners.length).toEqual(0)
  })

  it('传递 recurse 参数：purgeElement(options, type, recurse = true)', () => {
    let allListeners = []
    const $home = document.querySelector('#text-home')

    $home.addEventListener('click', record)
    $home._listeners = []
    $home._listeners.push({
      el: $home,
      type: 'click',
      fn: record,
      capture: true
    })
    $home.click()

    on($list, '.remove', 'click', removeItem)
    on($list, '.item', 'click', showLog)

    allListeners = getListeners($list)

    expect(count).toEqual(1)
    expect(allListeners.length).toEqual(2)

    purgeElement('#list', 'click', true)

    allListeners = getListeners($list)
    $home.click()

    expect(allListeners.length).toEqual(0)
    expect(count).toEqual(1)
  })

  it('仅传递 options 参数：purgeElement(options)', () => {
    purgeElement($list)

    expect(getListeners($list).length).toEqual(0)
  })
})
