import trim from './utils/lang/trim'
import stripTags from './utils/lang/stripTags'

import _getChaptersWithCode from './_getChaptersWithCode'
import _getChapterParentIdByDiffer from './_getChapterParentIdByDiffer'

const getChapters = (headings, showCode = true) => {
  const chapters = []
  let previous = 1
  let level = 0

  headings.forEach((heading, i) => {
    const headingLevel = heading.tagName.replace(/h/i, '')
    let current = parseInt(headingLevel, 10)
    let pid = -1

    // 当前标题的（标题标签）序号 > 前一个标题的序号：两个相连的标题是父标题 -> 子标题关系；
    // h2 （前一个标题）
    // h3 （当前标题）
    if (current > previous) {
      level += 1

      // 第一层级的 pid 是 -1
      if (level === 1) {
        pid = -1
      } else {
        pid = i - 1
      }
    }
    // 当前标题的（标题标签）序号 = 前一个标题的序号
    // h2 （前一个标题）
    // h2 （当前标题）
    // 当前标题的（标题标签）序号 < 前一个标题的序号，并且当前标题序号 > 当前的级别
    // h2
    // h4 （前一个标题）
    // h3 （当前标题：这种情况我们还是任务 h3 是 h2 的下一级章节）
    else if (current === previous || (current < previous && current > level)) {
      // H1 的层级肯定是 1
      if (current === 1) {
        level = 1

        pid = -1
      } else {
        pid = chapters[i - 1].pid
      }
    } else if (current <= level) {
      // H1 的层级肯定是 1
      if (current === 1) {
        level = 1
      } else {
        level = level - (previous - current)

        if (level <= 1) {
          level = 1
        }
      }

      // 第一级的标题
      if (level === 1) {
        pid = -1
      } else {
        // 虽然看上去差点，不过能工作啊
        pid = _getChapterParentIdByDiffer(chapters, previous - current, i)
      }
    }

    previous = current

    chapters.push({
      id: i,
      pid: pid,
      level: level,
      rel: `heading-${i}`,
      text: stripTags(trim(heading.innerHTML))
    })
  })

  return showCode ? _getChaptersWithCode(chapters) : chapters
}

export default getChapters
