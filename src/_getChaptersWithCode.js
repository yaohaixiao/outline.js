import groupBy from './utils/lang/groupBy'

const _getChaptersWithCode = (chapters) => {
  const groups = groupBy(chapters, 'pid')

  groups.forEach((group) => {
    group.forEach((chapter, i) => {
      chapter.index = i + 1
    })
  })

  groups.forEach((group) => {
    group.forEach((paragraph) => {
      chapters.forEach((chapter) => {
        if (chapter.pid === -1) {
          chapter.code = String(chapter.index)
        } else {
          if (chapter.pid === paragraph.id) {
            chapter.code = paragraph.code + '.' + chapter.index
          }
        }
      })
    })
  })

  return [...chapters]
}

export default _getChaptersWithCode
