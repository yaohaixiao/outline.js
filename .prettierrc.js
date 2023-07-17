/**
 * .prettierrc.js - prettier 配置文件
 * =============================================================
 * Created By: Yaohaixiao
 * Update: 2023.3.31
 */
module.exports = {
  // 单行长度
  printWidth: 80,
  // 缩进长度
  tabWidth: 2,
  // 使用空格代替tab缩进
  useTabs: false,
  // 句末使用分号
  semi: false,
  // 使用单引号
  singleQuote: true,
  // 仅在必需时为对象的key添加引号
  quoteProps: 'as-needed',
  // 多行时尽可能打印尾随逗号
  trailingComma: 'none',
  // 在对象前后添加空格 eg: { foo: bar }
  bracketSpacing: true,
  // 单参数箭头函数参数周围使用圆括号 eg: (x) => x
  arrowParens: 'always',
  // 无需顶部注释即可格式化
  requirePragma: false,
  // 在已被 prettier 格式化的文件顶部加上标注
  insertPragma: false,
  proseWrap: 'always',
  // 对HTML全局空白不敏感
  htmlWhitespaceSensitivity: 'ignore',
  // 不对vue中的script及style标签缩进
  vueIndentScriptAndStyle: false,
  // 结束行形式
  endOfLine: 'auto',
  bracketSameLine: true,
  singleAttributePerLine: true,
  // 对引用代码进行格式化
  embeddedLanguageFormatting: 'auto'
}
