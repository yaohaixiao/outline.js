# [3.6.0](https://github.com/yaohaixiao/outline.js/compare/3.5.4...3.6.0) (2023-07-31)


### Features

* 优化 showCode = false 时的生成 chapters 数据的信息逻辑 ([26dd10d](https://github.com/yaohaixiao/outline.js/commit/26dd10dd11f3a1bf4da2aeeb224f2251e01fcdee))



## [3.5.4](https://github.com/yaohaixiao/outline.js/compare/3.5.3...3.5.4) (2023-07-27)


### Bug Fixes

* 修复独立侧滑菜单选中状态样式问题，不是 100% 菜单宽度；调整独立侧滑菜单默认高度，调整为height: auto; 最大高度：calc(100% - 4em) ([25dc187](https://github.com/yaohaixiao/outline.js/commit/25dc1874e462f268ed4c80b93a58d299d24c15ff))



## [3.5.3](https://github.com/yaohaixiao/outline.js/compare/3.5.2...3.5.3) (2023-07-25)


### Bug Fixes

* 修复 Outline 模块中， toTop() 方法高亮第一个导航标题的 count() 判断错误，并移除 toTop() 和 toBottom() 方法中多余的 afterScroll 执行逻辑； ([6e34d3a](https://github.com/yaohaixiao/outline.js/commit/6e34d3a1d5a20302fee9f1fca842fb206e0de154))



## [3.5.2](https://github.com/yaohaixiao/outline.js/compare/3.5.1...3.5.2) (2023-07-25)


### Bug Fixes

* 修复侧边栏 toggle() 动画过度被 fixed 或者 sticky 定位的导航菜单遮挡的问题；添加新的示例页面； ([d995130](https://github.com/yaohaixiao/outline.js/commit/d995130a9cae97531aa9bc09b6516c1d421afa08))



## [3.5.1](https://github.com/yaohaixiao/outline.js/compare/3.5.0...3.5.1) (2023-07-25)


### Bug Fixes

* 修复动态生成 anchor 图标链接点击滚动定位，对于页面有 sticky 定位元素，定位不准的问题，给 chapters 模块也添加 stickyHeight 参数；修复对于 fixed 定位，导航菜单模拟 sticky 定位后，导航菜单宽度变化挡住文章内容的问题； ([094f45d](https://github.com/yaohaixiao/outline.js/commit/094f45d00804a8cd965c02b0dadb7cde0bbe9360))



# [3.5.0](https://github.com/yaohaixiao/outline.js/compare/3.4.0...3.5.0) (2023-07-24)


### Features

* UI 细节优化，针对 parentElement 在 CSS 中设置了具体 width 值，outline.toggle() 添加动画过度；并更新 examples 相关页面 ([04079bb](https://github.com/yaohaixiao/outline.js/commit/04079bba7db1b71ff8eb5698f6ce7c139969b9b9))



# [3.4.0](https://github.com/yaohaixiao/outline.js/compare/3.3.6...3.4.0) (2023-07-24)


### Features

* 添加 stickyHeight 配置参数，用以优化页面有其它（模拟） sticky 定位的 DOM 元素的滚动定位计算 ([9af8044](https://github.com/yaohaixiao/outline.js/commit/9af8044a3149c03dc716ca8daa290d4d4a7d8598))



## [3.3.6](https://github.com/yaohaixiao/outline.js/compare/3.3.5...3.3.6) (2023-07-24)


### Bug Fixes

* 修复 fixed 定位，初始化界面就有滚动时的定位问题 ([19c5b8b](https://github.com/yaohaixiao/outline.js/commit/19c5b8b8b217566e74f52a4784f160e10c8ab81c))



## [3.3.5](https://github.com/yaohaixiao/outline.js/compare/3.3.4...3.3.5) (2023-07-23)


### Bug Fixes

* 添加 zIndex() 方法，处理目录菜单被页面其他 fixed 或者 sticky 定位的 DOM 元素覆盖 ([27ca25a](https://github.com/yaohaixiao/outline.js/commit/27ca25ab21be390dea0a1eb2a614abe0e6ac7301))



## [3.3.4](https://github.com/yaohaixiao/outline.js/compare/3.3.3...3.3.4) (2023-07-22)


### Bug Fixes

* 修复 sticky 定位时，在文章段落多，导航菜单高度超过 viewport 高度时无法显示的问题；优化 fixed 定位的 UI 细节；调整 drawer 的 title UI 细节 ([5bfbac3](https://github.com/yaohaixiao/outline.js/commit/5bfbac36cec77dc6fa556a19001b19f9b291a375))



## [3.3.3](https://github.com/yaohaixiao/outline.js/compare/3.3.2...3.3.3) (2023-07-21)


### Bug Fixes

* 修复 relative 定位，标题文字超长换行导致高亮当前标题定位不准问题；修复获取标题offsetTop值不准确的问题 ([1064308](https://github.com/yaohaixiao/outline.js/commit/10643084d159c46b8bc0802b1b128026ec71f34d))



## [3.3.2](https://github.com/yaohaixiao/outline.js/compare/3.3.1...3.3.2) (2023-07-21)


### Bug Fixes

* 修复针对 webkit 内核浏览器的滚动条优化样式缺失 ([a33a486](https://github.com/yaohaixiao/outline.js/commit/a33a4868f06463ba3e2676c438ec145f857d8dab))



## [3.3.1](https://github.com/yaohaixiao/outline.js/compare/3.3.0...3.3.1) (2023-07-21)


### Bug Fixes

* 修复 sticky 和 fixed 定位，菜单按钮控制逻辑问题（应该隐藏页面中的目录导航） ([e5852c1](https://github.com/yaohaixiao/outline.js/commit/e5852c1dc5192bd16abb62b40a4e674dfb248a39))



# [3.3.0](https://github.com/yaohaixiao/outline.js/compare/3.2.0...3.3.0) (2023-07-21)


### Features

* 调整 getChapters() 方法，可以获取树结构的数据；添加 homepage 配置参数；调整 Toolbar 按钮样式； ([b6193de](https://github.com/yaohaixiao/outline.js/commit/b6193de64288dd9d2c7093707970a543696a40f3))



# [3.2.0](https://github.com/yaohaixiao/outline.js/compare/3.1.0...3.2.0) (2023-07-20)


### Features

* 添加 count() 方法；调整 createElement() 方法；调整 outline 的 scrollTo() 方法，不再依赖 anchors 实例 ([57964d0](https://github.com/yaohaixiao/outline.js/commit/57964d08d462f8d2819d265a7213aaae6530744a))
* 优化创建 DOM 界面的性能，使用 DocumentFragment，优化 createElement() 方法 ([da76ccc](https://github.com/yaohaixiao/outline.js/commit/da76cccdfc8c92ad61306e2a4374a85484a26dfa))



# [3.1.0](https://github.com/yaohaixiao/outline.js/compare/3.0.0...3.1.0) (2023-07-19)


### Features

* 添加文章没有 h1~h6 标签的处理逻辑；
* 添加缺失的 customClass 样式设置；
* 修复滚动到底部的距离为浮点数值时，向下按钮没有隐藏问题； ([b5fba4f](https://github.com/yaohaixiao/outline.js/commit/b5fba4f19292e24f1c4ef04456dedfdd8640f1b4))



# [3.0.0](https://github.com/yaohaixiao/outline.js/compare/v2.0.1...v3.0.0) (2023-07-19)


### Features

* 完全重构，发布 3.0.0 版本 ([9856338](https://github.com/yaohaixiao/outline.js/commit/9856338b9a7afe3effb6adc98b40a7546d7c2c41))
* 生成独立模块：anchors.min.js、chapters.min.js、drawer.min.js 和 toolbar.min.js ([47ab76b](https://github.com/yaohaixiao/outline.js/commit/47ab76b2824d2df7de1e780970c76c67173cbe25))
