import isString from './utils/types/isString'
import isElement from './utils/types/isElement'
import createElement from './utils/dom/createElement'
import addClass from './utils/dom/addClass'
import later from './utils/lang/later'
import icon from './utils/icons/icon'

const _updateSiblingElements = (siblingElement, isPrev) => {
  let tagName
  let $sibling = siblingElement

  while ($sibling) {
    tagName = $sibling.tagName.toLowerCase()

    if (tagName !== 'script' && tagName !== 'style') {
      addClass($sibling, 'outline-print_sibling')
    }

    if (isPrev) {
      $sibling = $sibling.previousElementSibling
    } else {
      $sibling = $sibling.nextElementSibling
    }
  }
}

const paintPrint = (origins, title) => {
  let text = title
  let $origins
  let $wrapper
  let $article
  let $title
  let $sibling
  let $icon

  if (isString(origins)) {
    $origins = document.querySelector(origins)
  } else if (isElement(origins)) {
    $origins = origins
  }

  if (!$origins) {
    return false
  }

  // console.time('paintPrint')
  $icon = icon('close', {
    iconSet: 'outline',
    size: 20,
    attrs: {
      className: 'outline-print__close'
    }
  })

  $title = $origins.querySelector('h1')

  if (isElement(title)) {
    $title = title
  }

  if (isElement($title)) {
    text = $title.innerText
  }

  $article = createElement('article', {
    id: 'outline-print__article',
    className: 'outline-print__article',
    innerHTML: $origins.innerHTML
  })

  $title = createElement(
    'h1',
    {
      className: 'outline-print__title'
    },
    text
  )

  $wrapper = createElement(
    'section',
    {
      id: 'outline-print',
      className: 'outline-print'
    },
    [$icon, $title, $article]
  )
  document.body.appendChild($wrapper)
  // console.timeEnd('paintPrint')

  later(() => {
    $sibling = $wrapper.previousElementSibling

    _updateSiblingElements($sibling, true)

    $sibling = $wrapper.nextElementSibling

    _updateSiblingElements($sibling)
  }, 350)
}

export default paintPrint
