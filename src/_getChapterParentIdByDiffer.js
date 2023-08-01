const _getChapterParentIdByDiffer = (chapters, differ, index) => {
  let parent = chapters[index - 1]
  let pid
  let i

  for (i = 0; i < differ; i += 1) {
    pid = parent.pid
    parent = chapters[pid]
  }

  pid = parent.pid

  return pid
}

export default _getChapterParentIdByDiffer
