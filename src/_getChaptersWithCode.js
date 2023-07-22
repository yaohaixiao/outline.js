import groupBy from './utils/lang/groupBy'

const _getChaptersWithCode = (chapters) => {
  const groups = groupBy(chapters, 'pid')
  const clone = [...chapters]

  groups.forEach((group) => {
    group.forEach((chapter, i) => {
      chapter.index = i + 1
      if (chapter.pid === -1) {
        chapter.code = String(chapter.index)
      }
    })
  })

  groups.forEach((group) => {
    group.forEach((paragraph) => {
      clone.forEach((chapter) => {
        if (chapter.pid === paragraph.id) {
          chapter.code = paragraph.code + '.' + chapter.index
        }
      })
    })
  })

  return clone
}

export default _getChaptersWithCode
