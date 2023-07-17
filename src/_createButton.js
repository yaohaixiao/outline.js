import { createSvgIcon } from './utils/icons'
import createElement from './utils/dom/createElement'
import addClass from './utils/dom/addClass'

const _createButton = (button) => {
  const $icon = createSvgIcon(button.icon, button.size)
  const $anchor = createElement(
    'a',
    {
      className: `outline-toolbar__anchor`,
      href: button.link
    },
    [$icon]
  )
  const $button = createElement(
    'div',
    {
      className: `outline-toolbar__button ${button.name}`
    },
    [button.link ? $anchor : $icon]
  )

  addClass($icon, 'outline-toolbar__icon')

  if (button.disabled) {
    addClass($button, 'outline-toolbar_disabled')
  }

  return $button
}

export default _createButton
