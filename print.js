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

const paintPrint = (el, title) => {
  const $fragment = document.createDocumentFragment()
  let text = title
  let $el
  let $wrapper
  let $article
  let $title
  let $sibling
  let $icon
  let $children

  if (isString(el)) {
    $el = document.querySelector(el)
  } else if (isElement(el)) {
    $el = el
  }

  if (!$el) {
    return false
  }

  $icon = icon('close', {
    iconSet: 'outline',
    size: 20,
    attrs: {
      className: 'outline-print__close'
    }
  })

  $title = $el.querySelector('h1')

  if (isElement(title)) {
    $title = title
  }

  if (isElement($title)) {
    text = $title.innerText
  }

  $title = createElement(
    'h1',
    {
      className: 'outline-print__title'
    },
    text
  )

  $article = createElement('article', {
    id: 'outline-print__article',
    className: 'outline-print__article'
  })

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
    // 设置邻居节点的打印样式
    $sibling = $wrapper.previousElementSibling
    _updateSiblingElements($sibling, true)

    $sibling = $wrapper.nextElementSibling
    _updateSiblingElements($sibling)

    // 克隆文章内容
    $children = $el.cloneNode(true).childNodes
    $children.forEach(($child) => {
      $fragment.appendChild($child)
    })
    $article.appendChild($fragment)
  })
}

export default paintPrint
