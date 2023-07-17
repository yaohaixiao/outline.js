const _getChapterParentIdByDiffer = (chapters, differ, index) => {
  let pid

  // 最大只有 5 级的差距
  switch (differ) {
    case 2:
      pid = chapters[chapters[chapters[index - 1].pid].pid].pid
      break
    case 3:
      pid = chapters[chapters[chapters[chapters[index - 1].pid].pid].pid].pid
      break
    case 4:
      pid =
        chapters[
          chapters[chapters[chapters[chapters[index - 1].pid].pid].pid].pid
        ].pid
      break
    case 5:
      pid =
        chapters[
          chapters[
            chapters[chapters[chapters[chapters[index - 1].pid].pid].pid].pid
          ].pid
        ].pid
      break
    default:
      pid = chapters[chapters[index - 1].pid].pid
      break
  }

  return pid
}

export default _getChapterParentIdByDiffer
