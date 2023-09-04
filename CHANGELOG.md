# [3.24.0](https://github.com/yaohaixiao/outline.js/compare/3.23.4...3.24.0) (2023-09-04)


### Features

* 优化 anchors.js 中创建图标链接的性能； ([b23312c](https://github.com/yaohaixiao/outline.js/commit/b23312c2c6b88362ac4fbe1a4b582d81d944b722))
* 针对超长文章，采用 timeSlice 机制优化性能； ([19d5ee8](https://github.com/yaohaixiao/outline.js/commit/19d5ee86c414fb5fc08cf15a5f35890c9a11bf43))



## [3.23.4](https://github.com/yaohaixiao/outline.js/compare/3.23.3...3.23.4) (2023-09-01)


### Bug Fixes

* 修复 relative 定位时，独立导航菜单关闭窗口图标未显示的问题； ([9f874b3](https://github.com/yaohaixiao/outline.js/commit/9f874b3a0fe3c9f9582d69046b16c3821b2908e7))



## [3.23.3](https://github.com/yaohaixiao/outline.js/compare/3.23.2...3.23.3) (2023-09-01)


### Bug Fixes

* 去掉 package.json 中的 files 配置 ([826c70e](https://github.com/yaohaixiao/outline.js/commit/826c70e129edede1503ce9e5e71b8c173733c702))



## [3.23.1](https://github.com/yaohaixiao/outline.js/compare/3.23.0...3.23.1) (2023-09-01)


### Bug Fixes

* 调整阅读模式在移动设备的显示效果 ([8c237c7](https://github.com/yaohaixiao/outline.js/commit/8c237c79fdee88d2c87e519334b4d4b98c2ef33f))



# [3.23.0](https://github.com/yaohaixiao/outline.js/compare/3.22.1...3.23.0) (2023-08-31)


### Features

* 调整打印样式中文章标题的下边距 ([6691f8d](https://github.com/yaohaixiao/outline.js/commit/6691f8d48002210b9373ed773d1bc231acb7f972))
* 调整所有 DOM 元素的绘制逻辑，调用 createElement() 方法中的插入单个子元素，直接用 DOM 元素，较少数组循环的多余调用成本；
* 调整 print() 方法，将更新邻居节点逻辑提取为独立的私有方法； ([4a96ecf](https://github.com/yaohaixiao/outline.js/commit/4a96ecfd5f460a39875754a3cc59104f1628d36d))



## [3.22.1](https://github.com/yaohaixiao/outline.js/compare/3.22.0...3.22.1) (2023-08-29)


### Bug Fixes

* 修复 sticky 定位，窗口调整大小，chapters 导航栏高度没有自适应窗口大小变化的问题 ([4694b3c](https://github.com/yaohaixiao/outline.js/commit/4694b3cdb8ab131862f15da760b7222d9562f104))



# [3.22.0](https://github.com/yaohaixiao/outline.js/compare/3.21.0...3.22.0) (2023-08-29)


### Features

* 调整打印样式中文章标题的下边距；
* 调整代码结构，重新打包文件 ([556e186](https://github.com/yaohaixiao/outline.js/commit/556e1869a4c73762589a2756287d90efaca2b47a))



# [3.21.0](https://github.com/yaohaixiao/outline.js/compare/3.20.1...3.21.0) (2023-08-29)


### Features

* 添加 $emit()、$on()、$off() 方法；
* 添加 created、mounted、enterReading、exitReading、beforeDestroy 和 destroyed 事件； ([88b087d](https://github.com/yaohaixiao/outline.js/commit/88b087d4fbf44bc6dd95cd96462e8c666b3eaeb3))



## [3.20.1](https://github.com/yaohaixiao/outline.js/compare/3.20.0...3.20.1) (2023-08-28)


### Bug Fixes

* 修复针对 Wordpress 文章页进入阅读模式时，顶部导航栏仍然显示的问题； ([11f310b](https://github.com/yaohaixiao/outline.js/commit/11f310bc691ddc8f22239663ee71f845cd6912bc))



# [3.20.0](https://github.com/yaohaixiao/outline.js/compare/3.19.1...3.20.0) (2023-08-26)


### Features

* 针对移动设备在阅读模式添加推出阅读模式按钮 ([60d3b02](https://github.com/yaohaixiao/outline.js/commit/60d3b02e0544b4d3c9aca9cfef24b09c01ac573b))



## [3.19.1](https://github.com/yaohaixiao/outline.js/compare/3.19.0...3.19.1) (2023-08-25)


### Bug Fixes

* 修复同一个页面多次实例化 Outline 对象可能出现的属性配置不正确问题； ([582a66f](https://github.com/yaohaixiao/outline.js/commit/582a66fa1f46460a5febc093b574604d0526ea25))



# [3.19.0](https://github.com/yaohaixiao/outline.js/compare/3.18.1...3.19.0) (2023-08-24)


### Features

* 功能扩展，（在配置打印样式后）有纯净的阅读视图（按ESC键可退出）； ([966c113](https://github.com/yaohaixiao/outline.js/commit/966c1135a40d06053c3d34096eadcf29ece3dc96))



## [3.18.1](https://github.com/yaohaixiao/outline.js/compare/3.18.0...3.18.1) (2023-08-23)


### Bug Fixes

* 修复 icons 工具方法集中的 createElement() 方法中的一次设置多个样式的问题； ([182329d](https://github.com/yaohaixiao/outline.js/commit/182329db3afcae91a391d4fe893c96c7868287e9))



# [3.18.0](https://github.com/yaohaixiao/outline.js/compare/3.17.1...3.18.0) (2023-08-18)


### Features

* 优化 _getChaptersWithCode() 方法中的生成章节索引 code 的算法，性能大幅提升； ([22f151f](https://github.com/yaohaixiao/outline.js/commit/22f151f5a4338df5caeb7f292c9152b75565b312))



## [3.17.1](https://github.com/yaohaixiao/outline.js/compare/3.17.0...3.17.1) (2023-08-16)


### Bug Fixes

* 修复配置参数 print.title 为文章标题 DOM 元素，会将正文的标题移动到打印克隆 DOM 元素中的问题 ([a70c1c3](https://github.com/yaohaixiao/outline.js/commit/a70c1c3093e7d24b1e609b832fff05254d3fdff8))



# [3.17.0](https://github.com/yaohaixiao/outline.js/compare/3.16.0...3.17.0) (2023-08-15)


### Features

* 添加 chapterTextFilter 参数，用于处理 chapters 菜单中显示的文本； ([7d57fb1](https://github.com/yaohaixiao/outline.js/commit/7d57fb1e2277ce35a5125b4d903eea49d6188d57))



# [3.16.0](https://github.com/yaohaixiao/outline.js/compare/3.15.0...3.16.0) (2023-08-15)


### Features

* 调整 title 配置参数的可选值，增加设置“”或者false，不显示导航菜单的标题栏；调整 toolbar 工具栏内置按钮的显示顺序； ([a143ed9](https://github.com/yaohaixiao/outline.js/commit/a143ed93f0ea6c35f1c4fca4771e8b5582594f31))



# [3.15.0](https://github.com/yaohaixiao/outline.js/compare/3.14.0...3.15.0) (2023-08-15)


### Features

* 优化 print 配置细节，title 可以是 DOM 元素，使标题可以自动变化，更加灵活； ([0798bfc](https://github.com/yaohaixiao/outline.js/commit/0798bfc82d927e767366996c6904016723cf1d38))



# [3.14.0](https://github.com/yaohaixiao/outline.js/compare/3.13.2...3.14.0) (2023-08-14)


### Features

* 添加 print 配置，支持 print 基础打印样式 ([2e43a50](https://github.com/yaohaixiao/outline.js/commit/2e43a50107156009861fc383bac6f065e69b8914))



## [3.13.2](https://github.com/yaohaixiao/outline.js/compare/3.13.1...3.13.2) (2023-08-14)


### Bug Fixes

* 修复初始化 scrollElement.scrollTop = 0 时，向上按钮未隐藏的问题 ([f36fcb1](https://github.com/yaohaixiao/outline.js/commit/f36fcb1f61e575d8d887b1b534949d51d0c00b89))



## [3.13.1](https://github.com/yaohaixiao/outline.js/compare/3.13.0...3.13.1) (2023-08-11)


### Bug Fixes

* 修复 # 图标没有显示的问题；调整了 chapters 绘制的 DOM 的逻辑； ([bfe92ca](https://github.com/yaohaixiao/outline.js/commit/bfe92ca81b36ac0097aa27c0b9238215870cc793))



# [3.13.0](https://github.com/yaohaixiao/outline.js/compare/3.12.3...3.13.0) (2023-08-11)


### Features

* 添加 tools 配置添加自定义按钮配置；添加 addButton() 和 removeButton() 两个方法，用来在工具栏添加按钮或者移除工具栏按钮 ([d63fd62](https://github.com/yaohaixiao/outline.js/commit/d63fd6289f89d8227cd8eb63036cebd65aa8171c))



## [3.12.3](https://github.com/yaohaixiao/outline.js/compare/3.12.2...3.12.3) (2023-08-10)


### Bug Fixes

* 修复页面没有 h1~h6 标签，上下滚动按钮点击报错的问题； ([e9c78d6](https://github.com/yaohaixiao/outline.js/commit/e9c78d6ca883a0f069d951f74433e779813187d7))



## [3.12.2](https://github.com/yaohaixiao/outline.js/compare/3.12.1...3.12.2) (2023-08-10)


### Bug Fixes

* 不准备支持 typescript 了 ([85d6333](https://github.com/yaohaixiao/outline.js/commit/85d63334e9cdefe061156a102e959d39d58c3ecf))



# [3.12.0](https://github.com/yaohaixiao/outline.js/compare/3.11.0...3.12.0) (2023-08-10)


### Features

* 调整 _getChaptersWithCode() 方法，优化算法 ([7c3fbd1](https://github.com/yaohaixiao/outline.js/commit/7c3fbd1ef2d4dcc6188d22a9a23330a0510e8c2b))



# [3.11.0](https://github.com/yaohaixiao/outline.js/compare/3.10.3...3.11.0) (2023-08-09)


### Features

* 添加 git, tags 和 issues 配置参数 ([ed3ddf5](https://github.com/yaohaixiao/outline.js/commit/ed3ddf5296c60164c5c95c3b57ac6876513fa1f7))



## [3.10.3](https://github.com/yaohaixiao/outline.js/compare/3.10.2...3.10.3) (2023-08-08)


### Bug Fixes

* chore: 调整 chapters 组件的高亮选中项 placeholder 定位逻辑，采用 transform 替换 top: calc() 模式定位，修复 customClass 调整样式可能带来的定位不准问题



## [3.10.2](https://github.com/yaohaixiao/outline.js/compare/3.10.1...3.10.2) (2023-08-07)


### Bug Fixes

* 调整 _getChaptersWithCode() 方法，移除多余的 index 计算逻辑；添加 VUE 使用 outline.js 的示例； ([6f88985](https://github.com/yaohaixiao/outline.js/commit/6f88985bb95231a1bd976d33b7fc5f32d6b3c24a))



## [3.10.1](https://github.com/yaohaixiao/outline.js/compare/3.10.0...3.10.1) (2023-08-07)


### Bug Fixes

* 修复 Outline 模块，reload()后导航菜单不显示子菜单和点击菜单会报错的问题 ([21c8ed3](https://github.com/yaohaixiao/outline.js/commit/21c8ed38ef469f89a7fab6d6bbe38465cfa32837))



# [3.10.0](https://github.com/yaohaixiao/outline.js/compare/3.9.0...3.10.0) (2023-08-05)


### Features

* 添加 afterScroll 配置参数，在滚动结束后触发的回调函数 ([db5a2d9](https://github.com/yaohaixiao/outline.js/commit/db5a2d9be8e9e13652de2b175c5a26d4aa2a47b6))



# [3.9.0](https://github.com/yaohaixiao/outline.js/compare/3.8.0...3.9.0) (2023-08-05)


### Features

* 调整 scrollTo() 方法的滚动动画处理方式，用 requestAnimationFrame() 替换原本的 setTimeout() ([a235c3b](https://github.com/yaohaixiao/outline.js/commit/a235c3bcffdc1bb5e993a4948857ba8ec986dd0c))




## [3.8.1](https://github.com/yaohaixiao/outline.js/compare/3.8.0...3.8.1) (2023-08-03)


### Bug Fixes

* 修复添加 afterToggle 配置后，调整组件初始化变更导致的 posiiton: relative 菜单显示逻辑错误问题 ([5f8483b](https://github.com/yaohaixiao/outline.js/commit/5f8483b6c5b5363424497b6190591869087dcfb7))




# [3.8.0](https://github.com/yaohaixiao/outline.js/compare/3.7.0...3.8.0) (2023-08-02)


### Features

* 优化_getChaptersWithCode() 方法中生成文章章节 code 的算法，调整 groupBy() 方法，直接生成章节 code，移除 _getChaptersWithCode() 中多余的逻辑。理论上性能提升1倍 ([91fbdff](https://github.com/yaohaixiao/outline.js/commit/91fbdfff5df1ae00280b3081b650e5e3b76fe605))



# [3.7.0](https://github.com/yaohaixiao/outline.js/compare/3.6.0...3.7.0) (2023-08-01)


### Features

* 重构了 _getChapterParentIdByDiffer() 方法，采用更加简洁的编码方式；添加了 afeterSticky 和 afterToggle 两个新的配置参数，并更新的 API 文档；在 fixed.html 示例中展示了新添加的参数的样式用例 ([0d6598f](https://github.com/yaohaixiao/outline.js/commit/0d6598fa6117101b9578b67ef50c362ae35b525a))



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
