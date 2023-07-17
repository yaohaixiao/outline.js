// Outline 对象的默认配置信息
const defaults = {
  // 文章正文 DOM 节点的 ID 选择器
  article: '#article',
  // 要收集的标题选择器
  selector: 'h1,h2,h3,h4,h5,h6',
  // 侧边栏导航的标题
  title: '文章导读',
  // 文章导读导航的位置
  // outside - 以侧边栏菜单形式显示（默认值）
  // inside - 在文章正文一开始的地方显示
  position: 'outside',
  // 标题图标链接的 URL 地址
  // （默认）没有设置定制，点击链接页面滚动到标题位置
  // 设置了链接地址，则不会滚动定位
  anchorURL: '',
  // 链接的显示位置
  // front - 在标题最前面（默认值）
  // back - 在标题后面
  anchorAt: 'front',
  // 是否生成文章导读导航
  isGenerateOutline: true,
  // 是否在文章导读导航中显示段落章节编号
  isGenerateOutlineChapterCode: true,
  // 是否在正文的文章标题中显示段落章节编号
  isGenerateHeadingChapterCode: false,
  // 是否在正文的文章标题中创建锚点
  isGenerateHeadingAnchor: true
}

export default defaults
