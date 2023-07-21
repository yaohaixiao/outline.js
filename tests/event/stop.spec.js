/**
 * @jest-environment jsdom
 */
import stop from '@/utils/event/stop'

describe('stopEvent() 方法', () => {
  Object.defineProperty(window, 'location', {
    value: {
      hash: {
        endsWith: mockResponse,
        includes: mockResponse
      },
      assign: mockResponse
    },
    writable: true
  })

  document.body.innerHTML =
    '<div id="nav" class="nav">\n' +
    '  <a id="service" class="anchor" href="https://www.yaohaixiao.com/serivce">Service</a>\n' +
    '  <a id="help" class="anchor" href="https://www.yaohaixiao.com/help">Help</a>\n' +
    '</div>'

  let id = ''
  const mockResponse = jest.fn()
  const $nav = document.querySelector('#nav')
  const showLog = function (evt) {
    const $target = evt.target

    id = $target.id
    mockResponse()
  }

  $nav.addEventListener('click', showLog, false)

  it('调用 stopEvent() 方法，不会跳转页面，同时阻止事件冒泡：', () => {
    let url = location.href
    const $service = document.querySelector('#service')
    const handler = function (evt) {
      stop(evt)
    }

    $service.addEventListener('click', handler, false)
    $service.click()

    expect(location.href).toEqual(url)

    expect(id).toEqual('')
    expect(mockResponse).toBeCalledTimes(0)
  })

  it('不调用 stopEvent() 方法，跳转页面，同时执行事件冒泡：', () => {
    let url = location.href
    const $help = document.querySelector('#help')
    const handler = function (evt) {
      const $link = evt.target
      location.href = url = $link.href
    }

    $help.addEventListener('click', handler, false)
    $help.click()

    expect(location.href).toEqual(url)

    expect(id).toEqual('help')
    expect(mockResponse).toHaveBeenCalled()
  })
})
