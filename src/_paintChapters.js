import createElement from './utils/dom/createElement'

const _paintChapters = (list, chapters, showChapterCode = false) => {
  chapters.forEach((chapter) => {
    const pid = chapter.pid
    const text = createElement(
      'span',
      {
        className: 'outline-chapters__text'
      },
      [chapter.text]
    )
    const link = createElement(
      'a',
      {
        id: `outline-anchor-${chapter.id}`,
        className: 'outline-chapters__anchor',
        href: '#' + chapter.rel,
        rel: chapter.rel,
        'data-id': chapter.id
      },
      [text]
    )
    let parent
    let ul
    let li
    let code
    let children = []

    if (showChapterCode) {
      code = createElement(
        'span',
        {
          className: 'outline-chapters__code',
          'data-id': chapter.id
        },
        [chapter.code]
      )

      link.insertBefore(code, link.firstChild)
    }

    children.push(link)

    li = createElement(
      'li',
      {
        id: `outline-chapter-${chapter.id}`,
        className: 'outline-chapters__item',
        'data-id': chapter.id
      },
      children
    )

    if (pid === -1) {
      list.appendChild(li)
    } else {
      parent = document.getElementById('outline-chapter-' + pid)
      ul = document.getElementById('outline-subject-' + pid)

      if (!ul) {
        ul = createElement(
          'ul',
          {
            id: 'outline-subject-' + pid,
            className: 'outline-chapters__subject'
          },
          [li]
        )

        parent.appendChild(ul)
      } else {
        ul.appendChild(li)
      }
    }
  })
}

export default _paintChapters
