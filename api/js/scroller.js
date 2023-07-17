import $observer from '@yaohaixiao/subscribers.js/subscribers.core'

const $main = document.querySelector('#main')
const MIN = 0
const MAX = $main.scrollHeight
let timer = null
let playing = false

const scrollTo = (top, speed = 100) => {
  let scrollTop = $main.scrollTop
  const distance = top - scrollTop
  const step = Math.ceil(distance / 15)
  const scroll = () => {
    if (timer) {
      clearTimeout(timer)
    }

    scrollTop += step

    if (
      (scrollTop <= top && distance < 0) ||
      (scrollTop >= top && distance > 0)
    ) {
      scrollTop = top
      playing = false
    }

    $main.scrollTop = scrollTop

    if (!playing) {
      clearTimeout(timer)
      timer = null
      $observer.emit('buttons:toggle', scrollTop)
      return false
    } else {
      timer = setTimeout(scroll, speed)
    }
  }

  if (playing) {
    clearTimeout(timer)
    timer = null
    playing = false

    return false
  }

  playing = true

  scroll()
}

const sync = () => {
  const Observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          $observer.emit('sync:anchor', entry.target.getAttribute('id'))
        }
      })
    },
    {
      root: $main,
      rootMargin: '0px 0px -90% 0px'
    }
  )

  $main.querySelectorAll('.section__h3').forEach((section) => {
    Observer.observe(section)
  })
}

const onScrollToTop = (speed) => {
  scrollTo(MIN, speed)
}
const onScrollToBottom = (speed) => {
  scrollTo(MAX, speed)
}

const onScrollToMethod = (method) => {
  const $method = document.querySelector(`#${method}`)
  scrollTo($method.offsetTop)
}

const setup = () => {
  sync()

  $observer.on('scroll:to:top', onScrollToTop)
  $observer.on('scroll:to:bottom', onScrollToBottom)
  $observer.on('scroll:to:method', onScrollToMethod)
}

export default {
  setup
}
