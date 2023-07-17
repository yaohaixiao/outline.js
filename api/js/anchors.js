import delegate from '@yaohaixiao/delegate.js/delegate'
import $observer from '@yaohaixiao/subscribers.js/subscribers.core'

const $aside = document.querySelector('#aside')
let $active = null

const onAnchorTrigger = function (evt) {
  const $target = evt.delegateTarget
  const id = $target.href.split('#')[1]

  $observer.emit('scroll:to:method', id)

  evt.stopPropagation()
  evt.preventDefault()
}

const onAsyncAnchor = (id) => {
  const $anchor = document.querySelector(
    `.aside__anchor[href="#${id}"]`
  )
  const $item = $anchor.parentNode

  if ($active) {
    $active.classList.remove('active')
  }

  $item.classList.add('active')
  $active = $item
}

const setup = () => {
  const $emitter = delegate($aside)

  $observer.on('sync:anchor', onAsyncAnchor)
  $emitter.click('.aside__anchor', onAnchorTrigger)
}

export default {
  setup
}
