const _getChapterParentIdByDiffer = (chapters, differ, index) => {
  let previous = chapters[index - 1]
  let pid
  let i

  for (i = 0; i < differ; i += 1) {
    pid = previous.pid
    previous = chapters[pid]
  }

  pid = previous.pid

  return pid
}

export default _getChapterParentIdByDiffer
