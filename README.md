# AutocJs
AutocJs 是一个专门用来生成文章导读（Table of Contents）导航的 JavaScript 工具（原 autocjs 的重构版本，不依赖任何JS库）。AutocJs 会查找文章指定区域中的所有 h1~h6 的标签，并自动分析文章段落间的层次结构，生成文章的导读导航。

## 创作灵感
AnchorJS 是 AutocJs 的创作灵感来源。既然 AnchorJS 可创建标题的链接，为什么不直接给文章生成一个文章导读（Table of Contents）导航呢？ 于是就有了 AutocJs。

## 特点

- 支持 UMD 规范；
- 拥有 AnchorJS 基础功能；
- 支持中文和英文标题文字生成ID；
- 支持生成独立的侧边栏导航菜单；
- 支持直接在文章中生成文章导读导航；
- 自动分析标题关系，生成段落层级索引值；
- 可以作为 jQuery 插件使用；
- 界面简洁大方；
- 配置灵活，丰富，让你随心所欲掌控 AutocJs；

## 安装说明

### npm install

```sh
$ npm install -S autoc.js
```

### CDN 调用

```html
<script src="https://cdn.jsdelivr.net/gh/yaohaixiao/autocjs/dist/autoc.min.js"></script>
```

### 调用本地JS文件

```html
<script src="path/to/autoc.min.js"></script>
```

## 使用说明

```js
let AutocJs = require('autocjs');

// 创建 Outline 实例
let navigation = new AutocJs({
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
});

// 可以在创建导航后，重置配置信息，重新生成新的导航
navigation.reload({
  // 调整位直接在文章内生成导航
  position: 'outside',
  // 并且在文章标题前显示段落的章节层次索引值
  isGenerateHeadingChapterCode: true
})
```

## Options

### article
Type: `String`
Default: `'#article'`

可选，用来指定页面中显示文章正文的 DOM 节点的 ID 选择器。

### selector
Type: `String`
Default: `'h1,h2,h3,h4,h5,h6'`

可选，用来指定 article 节点下，要生成导航的标题标签的选择器。

### title
Type: `String`
Default: `'文章导读'`

可选，用来指定文章导读导航菜单的标题文字。

### position
Type: `String`
Default: `'outside'`

可选，用来指定文章导读导航菜单的显示位置：outside - 生成侧边栏菜单，inside - 直接在文章正文区域的开始位置生成导航菜单。

只有设置了 isGenerateOutline 为 true，position 参数才会起效。

### anchorURL
Type: `String`
Default: `''`

可选，用来指定文章标题锚点链接图标的链接地址：'' - 点击链接页面滚动到标题位置，其它 URL 值 - 就直接跳转到指定页面了

### anchorAt
Type: `String`
Default: `'front'`

可选，用来指定文章标题锚点链接图标的显示位置：'front' - 现在在文章标题前面，'end' - 显示到标题末尾。

### isGenerateOutline
Type: `Boolean`
Default: `false`

可选，用来指定是否文章导读导航菜单：true - 生成菜单，false - 不生成菜单（这样配置基本和 AnchorJS 功能一样了）。

### isGenerateOutlineChapterCode
Type: `Boolean`
Default: `true`

可选，用来指定是否文章导读导航菜单是否显示文章段落层次的索引编号：true - 显示编号，false - 不显示编号。

### isGenerateHeadingChapterCode
Type: `Boolean`
Default: `false`

可选，用来指定是否在文章标题前面显示文章段落层次的索引编号：true - 显示编号，false - 不显示编号。

### isGenerateHeadingAnchor
Type: `Boolean`
Default: `true`

可选，用来指定是否在文章标题位置生成锚点链接图标：true - 生成锚点链接图标，并给标题添加 ID 属性，false - 不生成锚点链接图标，仅给标题添加 ID 属性。

## Properties

### defaults
Type: `Objects`

静态属性，存储的是 AutocJs 对象默认配置信息。

### attributes
Type: `Objects`

存储的是 AutocJs 对象当前使用中的配置选项。

### elements
Type: `Objects`

存储的是 AutocJs 对象（创建的）相关的 DOM 元素。

### data
Type: `Objects`

存储的是 AutocJs 根据标题 DOM 元素分析的数据。

## Example

演示地址：[https://yaohaixiao.github.io/autocjs/example.html](https://yaohaixiao.github.io/autocjs/example.html)

## License

JavaScript Code Licensed under [MIT License](http://opensource.org/licenses/mit-license.html).

API Documentation Licensed under [CC BY 3.0](http://creativecommons.org/licenses/by/3.0/)
