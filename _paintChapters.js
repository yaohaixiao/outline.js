import createElement from './utils/dom/createElement'
import timeSlice from './utils/lang/timeSlice'

const _paintChapters = ($list, chapters, showCode = false) => {
  const LIMIT = 400
  const count = chapters.length
  const clones = [...chapters]
  const paint = (parts) => {
    const byId = (id) => $list.querySelector(`#${id}`)
    parts.forEach((chapter) => {
      const pid = chapter.pid
      const id = chapter.id
      const rel = chapter.rel
      const children = []
      const $text = createElement(
        'span',
        {
          className: 'outline-navigator__text'
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
            className: 'outline-navigator__code',
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
          className: 'outline-navigator__anchor',
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
          className: 'outline-navigator__item',
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
              className: 'outline-navigator__subject'
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

  if (count > LIMIT) {
    // 同步绘制
    paint(clones.splice(0, LIMIT))
    // 剩余的采用 timeSlice 机制绘制
    while (clones.length > 0) {
      const once = clones.splice(0, LIMIT)
      timeSlice(() => {
        paint(once)
      })
    }
  } else {
    paint(clones)
  }
}

export default _paintChapters
