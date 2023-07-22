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
