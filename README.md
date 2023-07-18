# outline.js

[![npm version](https://img.shields.io/npm/v/@yaohaixiao/outline.js)](https://www.npmjs.com/package/@yaohaixiao/outline.js)
[![Github file size](https://img.shields.io/github/size/yaohaixiao/outline.js/outline.min.js.svg)](https://github.com/yaohaixiao/outline.js/blob/master/outline.min.js)
[![prettier code style](https://img.shields.io/badge/code_style-prettier-07b759.svg)](https://prettier.io)
[![npm downloads](https://img.shields.io/npm/dm/@yaohaixiao/outline.js)](https://npmcharts.com/compare/@yaohaixiao/outline.js?minimal=true)
[![MIT License](https://img.shields.io/github/license/yaohaixiao/outline.js.svg)](https://github.com/yaohaixiao/outline.js/blob/master/LICENSE)


outline.js - 自动生成文章导读（Table of Contents）导航的 JavaScript 工具。



## 创作灵感
AnchorJS 是 outline.js 的创作灵感来源。既然 AnchorJS 可创建标题的链接，为什么不直接给文章生成一个文章导读（Table of Contents）导航呢？ 于是就有了 outline.js。



## 特点

- 原生 JavaScript 编写，无需任何依赖；
- 支持 UMD 规范；
- 支持 E6 模块，提供功能独立的 ES6 模块；
  - Anchors 模块：类似 AnchorJS 基础功能模块，自动分析段落层级
  - Drawer 模块：独立的侧滑窗口模块
  - Chapters 模块：独立的导航菜单模块；
  - Toolbar 模块：独立的固定定位的工具栏模块；
- 拥有 AnchorJS 基础功能；
- 支持中文和英文标题文字生成ID；
- 支持生成独立的侧边栏导航菜单；
- 支持直接在文章中生成文章导读导航(fixed 或者 sticky 布局)；
- 自动分析标题关系，生成段落层级索引值；
- 可以作为 jQuery 插件使用；
- 界面简洁大方；
- 配置灵活，丰富，让你随心所欲掌控 outline.js；


## 浏览器支持

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](https://github.com/yaohaixiao/outline.js/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](https://github.com/yaohaixiao/outline.js/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](https://github.com/yaohaixiao/outline.js/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](https://github.com/yaohaixiao/outline.js/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](https://github.com/yaohaixiao/outline.js/)</br>Opera |
|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| IE11, Edge                                                                                                                                                                                               | last 10 versions                                                                                                                                                                                           | last 10 versions                                                                                                                                                                                       | last 10 versions                                                                                                                                                                                       | last 10 versions                                                                                                                                                                                   |



## 安装说明

outline.js 提供多种安装方式的支持： npm 安装、加载 CDN 资源、以及本地资源调用。

### npm install

```shell
$ npm install -S @yaohaixiao/outline.js
```

### CDN 调用

```html
<script src="https://cdn.jsdelivr.net/gh/yaohaixiao/outline.js/outline.min.js"></script>
```

### 调用本地JS文件

```html
<script src="path/to/outline.min.js"></script>
```



## 使用说明

outline.js 既支持在 node.js 环境中以 CommonJS 模块调用，也支持 ES6 模块方式加载。

```js
// Node.js 环境中使用
const Outline = require('@yaohaixiao/outline.js')

// 作为 ES6 模块使用
import Outline from '@yaohaixiao/outline.js'

// 创建 Outline 实例
// 2.0.0 调整了配置参数，配置更加简单
const outline = new Outline({
    // 文章显示区域的 DOM 元素或者选择器字符串
    articleElement: '#article',
    // 要收集的标题选择器
    selector: 'h2,h3,h4,h5,h6',
    // 负责文章区域滚动的元素
    // String 类型 - 选择器字符串，默认值：html,body（window窗口）
    // HTMLElement 类型 - DOM 元素
    scrollElement: 'html,body',
    // 文章导读菜单的位置
    // relative - （默认值）创建独立的侧滑菜单
    // sticky - 导航菜单将以 sticky 模式布局（需要确保菜单插入位置支持 sticky 模式布局）
    // fixed - 导航菜单将以 fixed 模式布局，会自动监听滚动位置，模拟 sticky 布局
    // sticky 和 fixed 布局时，需要设置 parentElement
    // 2.0.0 暂时不支持在文章开始位置插入 chapters 导航菜单
    position: 'sticky',
    // 设置 position: relative 时，placment 定义侧滑菜单和 toolbar 导航位置：
    // rtl - 菜单位置在窗口右侧，滑动动画为：right to left
    // ltr - 菜单位置在窗口左侧，滑动动画为：left to right
    // ttb - 菜单位置在窗口上方，滑动动画为：top to bottom
    // btt - 菜单位置在窗口下方，滑动动画为：bottom to top
    placement: '',
    // 导航菜单将要插入的位置（DOM 元素）
    // String 类型 - 选择器字符串
    // HTMLElement 类型 - 插入的 DOM 元素
    // 仅在 position 设置为 sticky 和 fixed 布局时有效
    parentElement: '#aside',
    // 是否显示段落章节编号
    showCode: true,
    // 标题图标链接的 URL 地址
    // （默认）没有设置定制，点击链接页面滚动到标题位置
    // 设置了链接地址，则不会滚动定位
    anchorURL: '',
    // DIYer的福利
    // 独立侧滑菜单时，customClass 会追加到 drawer 侧滑窗口组件
    // 在文章中显示导航菜单时，customClass 会追加到 chapters 导航菜单
    customClass
});

// 可以在创建导航后，重置配置信息，重新生成新的导航
Outline.reload({
  // 调整位直接在文章内生成导航
  position: 'sticky',
  articleElement: '#article'
})
```



## API Documentation

完整 API 文档地址：[https://yaohaixiao.github.io/outline.js/](https://yaohaixiao.github.io/outline.js/)


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

静态属性，存储的是 Outline 对象默认配置信息。

### attributes

Type: `Objects`

存储的是 Outline 对象当前使用中的配置选项。

### elements

Type: `Objects`

存储的是 Outline 对象（创建的）相关的 DOM 元素。

### data

Type: `Objects`

存储的是 Outline 根据标题 DOM 元素分析的数据。



## Example

Example 地址：[https://yaohaixiao.github.io/outline.js/example.html](https://yaohaixiao.github.io/outline.js/example.html)



## License

JavaScript Code Licensed under [MIT License](http://opensource.org/licenses/mit-license.html).

API Documentation Licensed under [CC BY 3.0](http://creativecommons.org/licenses/by/3.0/)
