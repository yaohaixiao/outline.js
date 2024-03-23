import addClass from './utils/dom/addClass'

const _updateSiblingElements = (siblingElement, isPrev) => {
  let tagName
  let $sibling = siblingElement

  while ($sibling) {
    tagName = $sibling.tagName.toLowerCase()

    if (tagName !== 'script' && tagName !== 'style') {
      addClass($sibling, 'outline-reader_sibling')
    }

    if (isPrev) {
      $sibling = $sibling.previousElementSibling
    } else {
      $sibling = $sibling.nextElementSibling
    }
  }
}

export default _updateSiblingElements
