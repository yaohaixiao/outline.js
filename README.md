# Outline
Outline.js 是一个专门用来生成文章导读（Table of Contents）导航的 JavaScript 工具（原 autocjs 的重构版本，不依赖任何JS库）。Outline.js 会查找文章指定区域中的所有 h1~h6 的标签，并自动分析文章段落间的层次结构，生成文章的导读导航。

## 创作灵感
AnchorJS 是 Outline.js 的创作灵感来源。既然 AnchorJS 可创建标题的链接，为什么不直接给文章生成一个文章导读（Table of Contents）导航呢？ 于是就有了 Outline。

## 特点

- 支持 UMD 规范；
- 拥有 AnchorJS 基础功能；
- 支持中文和英文标题文字生成ID；
- 支持生成独立的侧边栏导航菜单；
- 支持直接在文章中生成文章导读导航；
- 自动分析标题关系，生成段落层级索引值；
- 可以作为 jQuery 插件使用；
- 界面简洁大方；
- 配置灵活，丰富，让你随心所欲掌控 Outline；

## 安装说明

### npm install

```sh
$ npm install -S outline
```

### 在浏览器中使用 script 标签调用

```html
<script src="path/to/outline.js"></script>
```

## 使用说明

```js
let Outline = require('outline');

// 创建 Outline 实例
let navigation = new Outline({
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

## License

JavaScript Code Licensed under [MIT License](http://opensource.org/licenses/mit-license.html).

API Documentation Licensed under [CC BY 3.0](http://creativecommons.org/licenses/by/3.0/)
