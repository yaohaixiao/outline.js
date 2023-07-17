import trim from './utils/lang/trim'
import createElement from './utils/dom/createElement'
import setAttribute from './utils/dom/setAttribute'

import { createSvgIcon } from './utils/icons'

const _updateHeading = ($heading, i, options) => {
  const CLS_HEADING = 'outline-heading'
  const hasHeadingAnchor = options.hasHeadingAnchor || true
  const isAnchorAtStart = options.isAnchorAtStart || true
  const showChapterCode = options.showChapterCode || false
  const chapterCode = options.chapterCode || ''
  const anchorURL = options.anchorURL || ''
  const headingId = `heading-${i}`
  const attrs = {
    id: headingId,
    className: isAnchorAtStart
      ? `${CLS_HEADING} ${CLS_HEADING}_start`
      : CLS_HEADING,
    'data-id': i
  }
  const keys = Object.keys(attrs)
  const text = trim($heading.innerHTML)
  let $icon

  keys.forEach((prop) => {
    setAttribute($heading, prop, attrs[prop])
  })

  if (showChapterCode) {
    $heading.innerHTML = chapterCode + ' ' + text
  }

  if (!hasHeadingAnchor) {
    return false
  }

  $icon = createSvgIcon('hash')
  $heading.appendChild(
    createElement(
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
  )
}

export default _updateHeading
