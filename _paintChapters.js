import createElement from './utils/dom/createElement'

const _paintChapters = ($list, chapters, showCode = false) => {
  const byId = (id) => $list.querySelector(`#${id}`)

  chapters.forEach((chapter) => {
    const pid = chapter.pid
    const id = chapter.id
    const rel = chapter.rel
    const children = []
    const $text = createElement(
      'span',
      {
        className: 'outline-chapters__text'
      },
      chapter.text
    )
    let $link
    let $code
    let $li
    let $subject
    let $chapter

    if (showCode) {
      $code = createElement(
        'span',
        {
          className: 'outline-chapters__code',
          'data-id': id
        },
        chapter.code
      )

      children.push($code)
    }

    children.push($text)

    $link = createElement(
      'a',
      {
        id: `chapter__anchor-${id}`,
        className: 'outline-chapters__anchor',
        href: '#' + rel,
        rel: rel,
        'data-id': id
      },
      children
    )

    $li = createElement(
      'li',
      {
        id: `chapter-${id}`,
        className: 'outline-chapters__item',
        'data-id': id
      },
      $link
    )

    if (pid === -1) {
      $list.appendChild($li)
    } else {
      $chapter = byId(`chapter-${pid}`)
      $subject = byId(`subject-${pid}`)

      if (!$subject) {
        $subject = createElement(
          'ul',
          {
            id: 'subject-' + pid,
            className: 'outline-chapters__subject'
          },
          $li
        )

        $chapter.appendChild($subject)
      } else {
        $subject.appendChild($li)
      }
    }
  })
}

export default _paintChapters
