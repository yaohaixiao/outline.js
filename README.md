# outline.js

[![npm version](https://img.shields.io/npm/v/@yaohaixiao/outline.js)](https://www.npmjs.com/package/@yaohaixiao/outline.js)
![Gzip size](http://img.badgesize.io/https://cdn.jsdelivr.net/gh/yaohaixiao/outline.js/outline.min.js?compression=gzip&label=gzip%20size)
[![prettier code style](https://img.shields.io/badge/code_style-prettier-07b759.svg)](https://prettier.io)
[![Coverage](https://codecov.io/gh/yaohaixiao/outline.js/branch/master/graph/badge.svg)](https://codecov.io/gh/yaohaixiao/outline.js)
[![npm downloads](https://img.shields.io/npm/dt/@yaohaixiao/outline.js)](https://npmcharts.com/compare/@yaohaixiao/outline.js?minimal=true)
[![MIT License](https://img.shields.io/github/license/yaohaixiao/outline.js.svg)](https://github.com/yaohaixiao/outline.js/blob/master/LICENSE)


outline.js - 自动生成文章导读（Table of Contents）导航的 JavaScript 工具。会自动分析文章中的标题（ h1~h6 ）标签，并生成文章段落层次结构的导读导航菜单。



## 创作灵感

AnchorJS 是 outline.js 的创作灵感来源。既然 AnchorJS 可创建标题的链接，为什么不直接给文章生成一个文章导读（Table of Contents）导航呢？ 于是便有了 outline.js。



## 特点

- 原生 JavaScript 编写，无需任何依赖；
- 支持 UMD 规范；
- 支持 E6 模块，提供功能独立的 ES6 模块；
  * Anchors 模块：类似 AnchorJS 基础功能模块，自动分析段落层级
  * Drawer 模块：独立的侧滑窗口模块
  * Chapters 模块：独立的导航菜单模块；
  * Toolbar 模块：独立的固定定位的工具栏模块；
- 拥有 AnchorJS 基础功能；
- 支持中文和英文标题文字生成ID；
- 支持生成独立的侧边栏导航菜单；
- 支持直接在文章中指定的 DOM 元素内生成文章导读导航(fixed 或者 sticky 布局)；
- 自动分析标题关系，生成段落层级索引值；
- 可以作为 jQuery 插件使用；
- 界面简洁大方；
- 配置灵活，丰富，让你随心所欲掌控 outline.js；

**说明：**outline.js 的 Wiki 中介绍了实现自动计算段落层次的算法

## Examples

outline.js 的支持的滚动元素可以是 Window 窗口，也可以是某个 DOM 元素。

### 窗口滚动

![独立侧滑菜单](https://yaohaixiao.github.io/outline.js/img/screen-shot.png)

* 独立侧滑菜单：[https://yaohaixiao.github.io/outline.js/relative.html](https://yaohaixiao.github.io/outline.js/relative.html)
* WordPress：[http://www.yaohaixiao.com/blog/publish-subscribe-pattern-in-javascript/](http://www.yaohaixiao.com/blog/publish-subscribe-pattern-in-javascript/)

![sticky 定位](https://yaohaixiao.github.io/outline.js/img/sticky.png)
* sticky 定位：[https://yaohaixiao.github.io/outline.js/sticky.html](https://yaohaixiao.github.io/outline.js/sticky.html)

![fixed 定位](https://yaohaixiao.github.io/outline.js/img/fixed.png)
* fixed 定位：[https://yaohaixiao.github.io/outline.js/fixed.html](https://yaohaixiao.github.io/outline.js/fixed.html)

### DOM 元素滚动

![flex 布局](https://yaohaixiao.github.io/outline.js/img/flex.png)
* flex 布局：[https://yaohaixiao.github.io/outline.js/flex.html](https://yaohaixiao.github.io/outline.js/flex.html)



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
<link href="https://cdn.jsdelivr.net/gh/yaohaixiao/outline.js/outline.min.css" rel="stylesheet" />
<script src="https://cdn.jsdelivr.net/gh/yaohaixiao/outline.js/outline.min.js"></script>
```

### 调用本地JS文件

```html
<link href="path/to/outline.min.css" rel="stylesheet" /></script>
<script src="path/to/outline.min.js"></script>
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
  <meta charset="UTF-8">
  <title>Outline.js</title>
  <link href="https://cdn.jsdelivr.net/gh/yaohaixiao/outline.js/outline.min.css" rel="stylesheet" />
</head>
<body>
<main>
  <!--这里 outline.js 会生成导航菜单-->
  <aside id="aside">
    
  </aside>
  <article id="article">
    <h1>Outline.js</h1>
    <p>xxx</p>
    <h2>Features</h2>
    <p>xxx</p>
    <h2>Usage</h2>
    <p>xxx</p>
    <h2>Examples</h2>
    <p>xxx</p>
  </article>
</main>
<script src="https://cdn.jsdelivr.net/gh/yaohaixiao/outline.js/outline.min.js"></script>
<script>
  (function(){
    const defaults = Outline.DEFAULTS
    let outline

    defaults.position = 'sticky'
    defaults.stickyHeight = 86
    // position 的值为 sticky 或者 fixed 时需要指定
    // parentElement 参数，即文章导航菜单插入的 DOM 位置
    // 可以时 dom 元素，也可以是 DOM 元素的选择器字符串
    defaults.parentElement = '#aside'
    defaults.articleElement = '#article'
    defaults.homepage = './index.html'
    // Outline.DEFAULTS 是对象，应用类型的
    // defaults 的属性操作，就是在修改 Outline.DEFAULTS
    outline = new Outline(Outline.DEFAULTS)
  })()
</script>
</body>
</html>
```

## 使用说明

outline.js 既支持在 node.js 环境中以 CommonJS 模块调用，也支持 ES6 模块方式加载。

```js
// Node.js 环境中使用
const Outline = require('@yaohaixiao/outline.js')
// 调用其他独立模块（如果需要）
const Anchors = require('@yaohaixiao/outline.js/anchors.min.js')
const Chapters = require('@yaohaixiao/outline.js/chapters.min.js')
const Drawer = require('@yaohaixiao/outline.js/drawer.min.js')
const Toolbar = require('@yaohaixiao/outline.js/toolbar.min.js')

// 作为 ES6 模块使用
import Outline from '@yaohaixiao/outline.js/src/outline'
// 调用其他独立模块（如果需要）
import Anchors from '@yaohaixiao/outline.js/src/anchors'
import Chapters from '@yaohaixiao/outline.js/src/chapters'
import Drawer from '@yaohaixiao/outline.js/src/drawer'
import Toolbar from '@yaohaixiao/outline.js/src/toolbar'

// 创建 Outline 实例
// 2.0.0 调整了配置参数，配置更加简单
// 当然，可以直接使用 DEFAULTS 静态属性，
// Outline.DEFAULTS 就是一下的默认配置
const outline = new Outline({
    // 文章显示区域的 DOM 元素或者选择器字符串
    articleElement: '#article',
    // 要收集的标题选择器
    selector: 'h2,h3,h4,h5,h6',
    // 指定文章导读导航菜单的标题文字。
    title: '目录',
    // 负责文章区域滚动的元素
    // String 类型 - 选择器字符串，默认值：html,body（window窗口）
    // HTMLElement 类型 - DOM 元素
    scrollElement: 'html,body',
    // 文章导读菜单的位置
    // relative - （默认值）创建独立的侧滑菜单
    // sticky - 导航菜单将以 sticky 模式布局（需要确保菜单插入位置支持 sticky 模式布局）
    // fixed - 导航菜单将以 fixed 模式布局，会自动监听滚动位置，模拟 sticky 布局
    // sticky 和 fixed 布局时，需要设置 parentElement
    // 2.0.0 暂时不支持之前版本那种 inside 模式，不会自动在文章开始位置插入 chapters 导航菜单
    position: 'sticky',
    // 导航菜单将要插入的位置（DOM 元素）
    // String 类型 - 选择器字符串
    // HTMLElement 类型 - 插入的 DOM 元素
    // 仅在 position 设置为 sticky 和 fixed 布局时有效
    parentElement: '#aside',
    // 设置 position: relative 时，placment 定义侧滑菜单和 toolbar 导航位置：
    // rtl - 菜单位置在窗口右侧，滑动动画为：right to left
    // ltr - 菜单位置在窗口左侧，滑动动画为：left to right
    // ttb - 菜单位置在窗口上方，滑动动画为：top to bottom
    // btt - 菜单位置在窗口下方，滑动动画为：bottom to top
    placement: '',
    // 页面中其它 sticky 或者模拟 skicky 的 fiexed 定位的 DOM 元素的高度。例如 wordpress 系统中，
    // 就会有 sticky 定位的导航菜单。这些 sticky 元素脱离了正常的流布局后，原来 h1~h6 标题标签的 
    // offsetTop 计算会出现偏差。sticky 元素会遮挡标题，因此针对页面中有其它 sticky 元素会遮挡标题，
    // 因此针对 sticky 布局时，需要设置 stickyHeight 高度。outline.js 会根据 stickyHeight 和计
    // 算出的标题的 offsetTop 值重新计算滚动定位；
    // 说明：outline.js 主要用于文章详情页面，
    // 因此 stickyHeight 仅针对 top: 0，且 sticky 定位元素在文章内容区域上方的位置；
    stickyHeight: 0,
    // 是否显示标题编号
    showCode: true,
    // 标题图标链接的 URL 地址
    // （默认）没有设置定制，点击链接页面滚动到标题位置
    // 设置了链接地址，则不会滚动定位
    anchorURL: '',
    // 指定当前站点主页地址
    homepage: '',
    // 指定git仓库地址
    git: '',
    // 指定git仓库中的 tags 地址
    tags: '',
    // 指定git仓库中的 issues 地址
    issues: '',
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

### VUE 中使用说明

如果您尝试在 VUE 项目中使用 outline.js，以下为推荐的使用方法：

```js
import Outline from '@yaohaixiao/outline.js/outline'

export default {
  // 省略其它逻辑...
  data() {
    return {
      outline: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      // 在（文章）详情页初始化 outline
      // 并且确定页面的文章内容绘制完成，否则无法获取到 hx 标签
      this.outline = new Outline(Outline.DEFAULTS)
    })
  },
  beforeDestroy() {
    // 如果希望在非文章页面不显示工具栏，可以调用 destroy() 方法
    // 销毁所有 outline.js 创建的 DOM 节点，包括工具栏和导航菜单
    this.outline.destroy()
  }
}
```


## API Documentation

完整 API 文档地址：[https://yaohaixiao.github.io/outline.js/](https://yaohaixiao.github.io/outline.js/)


## Options

outline.js 提供了较为丰富的配置项，以便适应不同的展示方式。


### articleElement

Type: `String|Element`

Default: `'#article'`

* String： 选择器字符串，默认值：html,body（即 window 窗口）;
* HTMLElement： DOM 元素;

可选，用来指定页面中显示文章正文的 DOM 节点或者选择器字符串。


### selector

Type: `String`

Default: `'h1,h2,h3,h4,h5,h6'`

可选，用来指定 article 节点下，要生成导航的标题标签的选择器。


### title

Type: `String`

Default: `'目录'`

可选，用来指定文章导读导航菜单的标题文字。


### scrollElement

Type: `String|HTMLElement`

Default: `html,body`

* String： 选择器字符串，默认值：html,body（即 window 窗口）;
* HTMLElement： DOM 元素;

可选，负责文章区域滚动的元素：


### position

Type: `String`

Default: `'relative'`

可选，用来指定文章导读导航菜单的显示位置：

* relative: （默认值）创建独立的侧滑菜单；
* sticky: 导航菜单将以 sticky 模式布局（需要确保菜单插入位置(DOM 节点)支持 sticky 模式布局）；
* fixed: 导航菜单将模拟 sticky 布局，起初是普通定位，会自动监听滚动位置，但滚动到导航菜单顶部时，以 fixed 模式布局，模拟 sticky 布局效果；

当设置为 sticky 和 fixed 布局时，需要设置 parentElement。

注意：2.0.0 暂时不支持之前版本那种 inside 模式，不会自动在文章开始位置插入 chapters 导航菜单


### parentElement

Type: `String|HTMLElement`

Default: `#aside`

* String： 选择器字符串，默认值：html,body（即 window 窗口）;
* HTMLElement： DOM 元素;

可选，导航菜单将要插入的位置（DOM 元素）。仅在 position 设置为 sticky 和 fixed 布局时有效。


### placement

Type: `String`

Default: `rtl`

可选，设置 position: relative 时，placement 定义侧滑菜单和 toolbar 导航位置：

* rtl - 菜单位置在窗口右侧，滑动动画为：right to left（默认值）；
* ltr - 菜单位置在窗口左侧，滑动动画为：left to right；
* ttb - 菜单位置在窗口上方，滑动动画为：top to bottom；
* btt - 菜单位置在窗口下方，滑动动画为：bottom to top；

![ltr](https://yaohaixiao.github.io/outline.js/img/ltr.png)

ltr，工具栏的位置在左边，点击菜单按钮，菜单按钮从左侧划出；

![rtl](https://yaohaixiao.github.io/outline.js/img/rtl.png)

rtl，工具栏的位置在右边，点击菜单按钮，菜单按钮从右侧划出；



### showCode

Type: `Boolean`

Default: `true`

可选，是否显示段落章节编号：

* true - 显示编号（默认值）；
* false - 不显示编号；


### anchorURL

Type: `String`

Default: `''`

可选，用来指定文章标题锚点链接图标的链接地址：

* '' - 点击链接页面滚动到标题位置（默认值）；
* 其它 URL 值 - 就直接跳转到指定页面了；

### homepage

Type: `String`

Default: `''`

可选，用来指定当前站点的主页链接地址：

* '' - 不会创建 Homepage 按钮（默认值）；
* 其它 URL 值 - 不会创建 Homepage 按钮，点按钮就直接跳转到指定页面了；


### customClass

Type: `String`

Default: `''`

可选，(DIYer福利)设置自定义样式的 class 名称：

* '' - 采用默认 outline.js 的 UI 界面（默认值）；
* 设置自定义样式 - 自己根据需求设置个性化的 UI 界面；



## Properties

outline.js 重构后，对外放 4 个重要的属性：anchors、drawer、chapters 和 toolbar。它们都是独立的对象实例，提供了 outline.js 所有的能力（属性和方法）。


### DEFAULTS

Type: `Objects`

静态属性，存储的是 Outline 对象默认配置信息。

```js
Outline.DEFAULTS = {
  articleElement: '#article',
  selector: 'h2,h3,h4,h5,h6',
  title: '目录',
  scrollElement: 'html,body',
  position: 'relative',
  parentElement: '#aside',
  placement: 'rtl',
  showCode: true,
  anchorURL: '',
  homepage: '',
  git: '',
  tags: '',
  issues: '',
  customClass: ''
}
```


### attrs

Type: `Objects`

存储的是 Outline 对象当前使用中的配置选项。


### anchors

Type: `Objects`

Anchors 模块：类似 AnchorJS 基础功能模块，自动分析段落层级。


### chapters

Type: `Objects`

Chapters 模块：独立的导航菜单模块。


### drawer

Type: `Objects`

Drawer 模块：独立的侧滑窗口模块。


### toolbar

Type: `Objects`

Toolbar 模块：独立的固定定位的工具栏模块；



## Methods

outline.js 的提供的方法如下：

### attr([prop, value])

设置或者获取初始化时配置的 attrs 信息的。

#### Parameters

##### prop

Type: `String|Object`

（可选）attrs 中的属性名称或者要配置的 attrs 信息。

##### value

Type: `Any`

（可选）要设置的 prop 属性的值。

* 不传递任何参数：返回完整的 attrs 配置信息；
* 仅传递 prop：
  * String: 返回 attrs 配型信息中与 prop 对应的值；
  * Object: 用来设置 attrs 配置信息；
* 同时传递 prop 和 value 参数：设置 attrs 配置信息中的某个属性值；

#### Returns

Type: `Any`

Outline 对象，以便实现链式调用。


### getChapters([isTreeStructured])

返回 outline.js 分析后的文章段落信息数据。

#### Parameters

##### isTreeStructured

Type: `Boolean`
Default: `false`

（可选）是否为树结构的数据。

* false: (默认值）输出打平的一维数组格式数据；
* true: 输出树结构格式的数据；

#### Returns

Type: `Outline`

Outline 对象，以便实现链式调用。


### count()

返回 outline.js 分析后的 chapters 数据数量。

#### Returns

Type: `Number`

chapters 数据数量。


### toTop()

页面（scrollElement）滚动到顶部。

#### Returns

Type: `Outline`

Outline 对象，以便实现链式调用。


### toBottom()

页面（scrollElement）滚动到底部。

#### Returns

Type: `Outline`

Outline 对象，以便实现链式调用。


### scrollTo(top[, afterScroll])

页面滚动到指定 top 位置。

#### Returns

Type: `Outline`

Outline 对象，以便实现链式调用。


#### Parameters

##### top

Type: `Number`

（必须）指定滚动位置的 top 数值。

##### afterScroll

Type: `Function`

（可选）滚动结束后的回调行数。

#### Returns

Type: `Outline`

Outline 对象，以便实现链式调用。


### toggle()

隐藏或者显示导航菜单。

#### Returns

Type: `Outline`

Outline 对象，以便实现链式调用。


### destroy()

销毁 outline.js 创建的所有 anchors 链接和导航菜单，已经对应的事件绑定。

#### Returns

Type: `Outline`

Outline 对象，以便实现链式调用。


### reload(options)

程序重启，先执行 destroy() 方法执行程序销毁逻辑，然后重新初始化并重新绘制界面。

#### Parameters

##### options

Type: `Object`

（必须）指定重启程序的新的配置信息（参考 DEFAULT 属性）。

#### Returns

Type: `Outline`

Outline 对象，以便实现链式调用。



## License

JavaScript Code Licensed under [MIT License](http://opensource.org/licenses/mit-license.html).

API Documentation Licensed under [CC BY 3.0](http://creativecommons.org/licenses/by/3.0/)
