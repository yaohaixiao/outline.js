import removeClass from './utils/dom/removeClass'
import isEmpty from './utils/types/isEmpty'
import trim from './utils/lang/trim'

const _resetHeading = ($heading, hasAnchor = true, isAtStart = true) => {
  const CLS_HEADING = 'outline-heading'
  const text = $heading.innerHTML
  const pattern = /^\d+(\.?\d+)*\s?/gi
  let $anchor

  $heading.innerHTML = text.replace(pattern, '')
  $heading.removeAttribute('id')
  $heading.removeAttribute('data-id')

  removeClass($heading, CLS_HEADING)

  if (!hasAnchor) {
    return false
  }

  $anchor = $heading.querySelector(`.${CLS_HEADING}__anchor`)

  if (isAtStart) {
    removeClass($heading, `${CLS_HEADING}_start`)
  }

  if (isEmpty(trim($heading.className))) {
    $heading.removeAttribute('class')
  }

  if ($anchor) {
    $heading.removeChild($anchor)
  }
}

export default _resetHeading
