import trim from './utils/lang/trim'
import stripTags from './utils/lang/stripTags'
import isFunction from './utils/types/isFunction'

import _getChapterParentIdByDiffer from './_getChapterParentIdByDiffer'
import _getChaptersWithCode from './_getChaptersWithCode'

/**
 * 根据文章中的 h1~h6 标签，自动分析返回文章章节数据
 * ========================================================================
 * @method getChaptersByHeadings
 * @param {Array} headings
 * @param {Boolean} [showCode]
 * @param {Function} [chapterTextFilter]
 * @return {*|*[]}
 */
const getChaptersByHeadings = (
  headings,
  showCode = false,
  chapterTextFilter = null
) => {
  const pattern = /^\d(\.|(\.\d+)*)\s?/gi
  const chapters = []
  let previous = 1
  let level = 0
  let text = ''

  headings.forEach((heading, i) => {
    const tagName = heading.tagName
    const headingLevel = tagName.replace(/h/i, '')
    let current = parseInt(headingLevel, 10)
    let pid = -1

    // 场景1：当前标题是前一个标题的子标题
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
    // 场景2：当前标题和前一个标题层级相同
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
    }
    // 场景3：当前标题比前一个标题层级高
    else if (current <= level) {
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
        // 通过当前标题和前一个标题之间的等级差，获得当前标题的父标题ID
        pid = _getChapterParentIdByDiffer(chapters, previous - current, i)
      }
    }

    previous = current

    text = trim(stripTags(heading.innerHTML))

    // 如果自动生成章节编号，则去掉标题中自带的编号文本
    if (showCode) {
      text = trim(text.replace(pattern, ''))
    }

    if (isFunction(chapterTextFilter)) {
      text = chapterTextFilter(text)
    }

    chapters.push({
      id: i,
      pid: pid,
      level: level,
      rel: `heading-${i}`,
      text,
      tagName
    })
  })

  return showCode ? _getChaptersWithCode(chapters) : chapters
}

export default getChaptersByHeadings
