import trim from './utils/lang/trim'
import createElement from './utils/dom/createElement'
import setAttribute from './utils/dom/setAttribute'

import { createSvgIcon } from './utils/icons'

const _updateHeading = ($heading, i, options) => {
  const CLS_HEADING = 'outline-heading'
  const hasAnchor = options.hasAnchor || true
  const isAtStart = options.isAtStart || true
  const showCode = options.showCode || false
  const chapterCode = options.chapterCode || ''
  const anchorURL = options.anchorURL || ''
  const headingId = `heading-${i}`
  const attrs = {
    id: headingId,
    className: isAtStart ? `${CLS_HEADING} ${CLS_HEADING}_start` : CLS_HEADING,
    'data-id': i
  }
  const keys = Object.keys(attrs)
  const text = trim($heading.innerHTML)
  const $fragment = document.createDocumentFragment()
  let $anchor
  let $icon

  keys.forEach((prop) => {
    setAttribute($heading, prop, attrs[prop])
  })

  if (showCode) {
    $heading.innerHTML = chapterCode + ' ' + text
  }

  if (!hasAnchor) {
    return false
  }

  $icon = createSvgIcon('hash')
  $anchor = createElement(
    'a',
    {
      id: `anchor-${i}`,
      className: `${CLS_HEADING}__anchor anchor-${i}`,
      href: anchorURL ? anchorURL : `#${headingId}`,
      target: anchorURL ? '_blank' : 'self',
      'data-id': i
    },
    [$icon]
  )
  $fragment.appendChild($anchor)
  $heading.appendChild($fragment)
}

export default _updateHeading