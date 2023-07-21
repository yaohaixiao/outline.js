import createElement from './utils/dom/createElement'

const _paintChapters = ($list, chapters, showCode = false) => {
  const byId = (id) => document.getElementById(id)

  chapters.forEach((chapter) => {
    const pid = chapter.pid
    const id = chapter.id
    const rel = chapter.rel
    const $text = createElement(
      'span',
      {
        className: 'outline-chapters__text'
      },
      [chapter.text]
    )
    const $link = createElement(
      'a',
      {
        id: `chapter__anchor-${id}`,
        className: 'outline-chapters__anchor',
        href: '#' + rel,
        rel: rel,
        'data-id': id
      },
      [$text]
    )
    let $code
    let $li
    let $ul
    let $parent

    if (showCode) {
      $code = createElement(
        'span',
        {
          className: 'outline-chapters__code',
          'data-id': id
        },
        [chapter.code]
      )

      $link.insertBefore($code, $link.firstChild)
    }

    $li = createElement(
      'li',
      {
        id: `chapter-${id}`,
        className: 'outline-chapters__item',
        'data-id': id
      },
      [$link]
    )

    if (pid === -1) {
      $list.appendChild($li)
    } else {
      $parent = byId(`chapter-${pid}`)
      $ul = byId(`subject-${pid}`)

      if (!$ul) {
        $ul = createElement(
          'ul',
          {
            id: 'subject-' + pid,
            className: 'outline-chapters__subject'
          },
          [$li]
        )

        $parent.appendChild($ul)
      } else {
        $ul.appendChild($li)
      }
    }
  })
}

export default _paintChapters
