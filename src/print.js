import isString from './utils/types/isString'
import isElement from './utils/types/isElement'
import createElement from './utils/dom/createElement'
import addClass from './utils/dom/addClass'
import later from './utils/lang/later'
import icon from './utils/icons/icon'

const print = (origins, title) => {
  let text = title
  let $origins
  let $wrapper
  let $article
  let $title
  let $sibling
  let $icon
  let tagName

  if (isString(origins)) {
    $origins =
      document.querySelector(origins) || document.getElementById(origins)
  } else {
    if (isElement(origins)) {
      $origins = origins
    }
  }

  $icon = icon('close', {
    iconSet: 'outline',
    size: 20
  })
  addClass($icon, 'outline-print__close')

  $title = $origins.querySelector('h1')

  if (isElement(title)) {
    $title = title
  }

  if (isElement($title)) {
    text = $title.innerText
  }

  $article = createElement(
    'article',
    {
      id: 'outline-print__article',
      className: 'outline-print__article'
    },
    ['']
  )
  $article.innerHTML = $origins.innerHTML

  $title = createElement(
    'h1',
    {
      className: 'outline-print__title'
    },
    [text]
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

  later(() => {
    $sibling = $wrapper.previousElementSibling

    while ($sibling) {
      tagName = $sibling.tagName.toLowerCase()
      if (tagName !== 'script' && tagName !== 'style') {
        addClass($sibling, 'outline-print_sibling')
      }
      $sibling = $sibling.previousElementSibling
    }

    $sibling = $wrapper.nextElementSibling

    while ($sibling) {
      tagName = $sibling.tagName.toLowerCase()
      if (tagName !== 'script' && tagName !== 'style') {
        addClass($sibling, 'outline-print_sibling')
      }
      $sibling = $sibling.nextElementSibling
    }
  }, 350)
}

export default print
