import delegate from '@yaohaixiao/delegate.js/delegate'
import $observer from '@yaohaixiao/subscribers.js/subscribers.core'

const $buttons = document.querySelector('#buttons')

const toggle = (top) => {
  const $main = document.querySelector('#main')
  const MIN = 0
  const MAX = $main.scrollHeight
  const $up = $buttons.querySelector('.up')
  const $down = $buttons.querySelector('.down')

  if (top <= MIN) {
    $up.classList.add('hide')
    $down.classList.remove('hide')
  } else if (top >= MAX) {
    $down.classList.add('hide')
    $up.classList.remove('hide')
  } else if (top > MIN && top < MAX) {
    $up.classList.remove('hide')
    $down.classList.remove('hide')
  }
}

const setup = () => {
  const $emitter = delegate($buttons)

  toggle(0)

  $observer.on('buttons:toggle', toggle)

  $emitter.click('.up', () => {
    $observer.emit('scroll:to:top', 50)
  })
  $emitter.click('.down', () => {
    $observer.emit('scroll:to:bottom', 50)
  })
}

export default {
  setup
}
