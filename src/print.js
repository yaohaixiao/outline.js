import isString from './utils/types/isString'
import isElement from './utils/types/isElement'
import createElement from './utils/dom/createElement'
import addClass from './utils/dom/addClass'
import later from './utils/lang/later'

const print = (origins, title) => {
  let $origins
  let $article
  let $title
  let $sibling
  let tagName
  let text = title

  if (isString(origins)) {
    $origins =
      document.querySelector(origins) || document.getElementById(origins)
  } else {
    if (isElement(origins)) {
      $origins = origins
    }
  }

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
      className: 'outline-print'
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

  $article.insertBefore($title, $article.firstChild)

  document.body.appendChild($article)

  later(() => {
    $sibling = $article.previousElementSibling

    while ($sibling) {
      tagName = $sibling.tagName.toLowerCase()
      if (tagName !== 'script' && tagName !== 'style') {
        addClass($sibling, 'outline-print_sibling')
      }
      $sibling = $sibling.previousElementSibling
    }

    $sibling = $article.nextElementSibling

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
