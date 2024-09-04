import isArray from '@/utils/types/isArray'

const _getChaptersWithCode = (chapters) => {
  const groups = {}
  const cb = (o) => {
    return [o.pid]
  }

  chapters.forEach((o) => {
    const group = JSON.stringify(cb(o))

    groups[group] = groups[group] || []
    groups[group].push(o)

    o.index = groups[group].length

    if (o.pid === -1) {
      o.code = String(o.index)
    }
  })

  Object.keys(groups).forEach((group) => {
    groups[group].forEach((c) => {
      const subjects = groups[`[${c.id}]`]

      if (!subjects || !isArray(subjects)) {
        return false
      }

      subjects.forEach((o) => {
        o.code = c.code + '.' + o.index
      })
    })
  })

  return chapters
}

export default _getChaptersWithCode
