import isString from './isString'
import trim from '../lang/trim'
import TAGS from './tags'

/**
 * 检测测试数据是否为合法的 HTML 代码
 * ========================================================================
 * @method isHTML
 * @category Lang
 * @see https://github.com/sindresorhus/html-tags
 * @see https://github.com/sindresorhus/is-html
 * @param {String} str - 要检测的数据
 * @returns {Boolean} 'val' 为合法的 HTML 代码，返回 true，否则返回 false
 */
const isHTML = (str) => {
  let html
  let basic
  let full

  if (!isString(str)) {
    return false
  }

  // 为了提高性能，我们将其限制在合理的长度内。
  html = trim(str).slice(0, 1000)
  basic = /\s*<!doctype html>|<html\b[^>]*>|<body\b[^>]*>|<x-[^>]+>/i
  full = new RegExp(TAGS.map((tag) => `<${tag}\\b[^>]*>`).join('|'), 'i')

  return basic.test(html) || full.test(html)
}

export default isHTML
