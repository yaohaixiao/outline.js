class Outline {
    constructor (options) {
        // 所有配置属性
        this.attributes = {}

        // 控件的所有 DOM 节点
        this.elements = {
            article: null,
            wrap: null,
            modal: null,
            header: null,
            title: null,
            body: null,
            list: null,
            footer: null,
            switcher: null,
            top: null,
            overlay: null,
            anchors: []
        }

        // 控件的数据
        this.data = {
            headings: [],
            chapters: []
        }

        this.timer = null

        // 运行程序
        this.initialize(options)
            .render()
            .addListeners()

        return this
    }

    initialize (options) {
        let elements = this.getElements()
        let data = this.getData()
        let article
        let headings

        // 舒适化配置
        this.set(Outline.defaults)
            .set(options)

        article = document.querySelector(this.get('article'))
        headings = this.generateHeadings(article.querySelectorAll(this.get('selector')))

        elements.article = article

        data.headings = headings
        data.chapters = this.generateChapters(headings)

        return this
    }

    reload (options) {
        this.destroy().initialize(options).render().addListeners()

        return this
    }

    /**
     * 设置属性
     * @param {String|Object} prop
     * @param {*} [val]
     * @returns {Outline}
     */
    set (prop, val) {
        let utils = Outline.Utils
        let attrs = this.attributes

        if (arguments.length === 2) {
            attrs[prop] = val
        } else {
            if (utils.isObject(prop)) {
                utils.extend(attrs, prop)
            }
        }

        return this
    }

    // 获取属性值
    get (prop) {
        return this.attributes[prop]
    }

    getElements () {
        return this.elements
    }

    getData () {
        return this.data
    }

    generateHeadings (nodes) {
        let headings = []
        let utils = Outline.Utils

        Array.prototype.forEach.call(nodes, (node) => {
            headings.push({
                id: utils.guid('outline-heading'),
                node: node,
                tagName: node.tagName,
                level: parseInt(node.tagName.replace(/[h]/i, ''), 10)
            })
        })

        return headings
    }

    generateChapters (headings) {
        let utils = Outline.Utils
        let chapters = []
        let previous = 1
        let level = 0

        headings.forEach((heading, i) => {
            let current = heading.level
            let pid = -1

            // 当前标题的（标题标签）序号 > 前一个标题的序号：两个相连的标题是父标题 -> 子标题关系；
            // h2 （前一个标题）
            // h3 （当前标题）
            if (current > previous) {
                level += 1

                // 第一层级的 pid 是 -1
                if (level === 1) {
                    pid = -1
                }
                else {
                    pid = i - 1
                }
            }
            // 当前标题的（标题标签）序号 = 前一个标题的序号
            // h2 （前一个标题）
            // h2 （当前标题）
            // 当前标题的（标题标签）序号 < 前一个标题的序号，并且当前标题序号 > 当前的级别
            // h2
            // h4 （前一个标题）
            // h3 （当前标题：这种情况我们还是任务 h3 是 h2 的下一级章节）
            else if (current === previous || (current < previous && current > level)) {
                // H1 的层级肯定是 1
                if (current === 1) {
                    level = 1

                    pid = -1
                }
                else {
                    pid = chapters[i - 1].pid
                }
            }
            else if (current <= level) {
                // H1 的层级肯定是 1
                if (current === 1) {
                    level = 1
                }
                else {
                    level = level - (previous - current)

                    if (level <= 1) {
                        level = 1
                    }
                }

                // 第一级的标题
                if (level === 1) {
                    pid = -1
                }
                else {
                    // 虽然看上去差点，不过能工作啊
                    pid = Outline._generatePid(chapters, previous - current, i)
                }
            }

            previous = current

            chapters.push({
                id: i,
                pid: pid,
                level: level,
                rel: heading.id,
                text: utils.stripTags(utils.trim(heading.node.innerHTML))
            })
        })

        this.generateChapterCode(chapters)

        return chapters
    }

    generateChapterCode (chapters) {
        let utils = Outline.Utils
        let groups = utils.groupBy(chapters, 'pid')

        groups.forEach((group) => {
            group.forEach((chapter, i) => {
                chapter.index = i + 1
            })
        })

        groups.forEach((group) => {
            group.forEach((member) => {
                chapters.forEach((chapter) => {
                    if (chapter.pid === -1) {
                        chapter.code = String(chapter.index)
                    } else {
                        if (chapter.pid === member.id) {
                            chapter.code = member.code + '.' + chapter.index
                        }
                    }
                })
            })
        })

        return this
    }

    render () {
        this.renderAnchors().renderOutline()

        return this
    }

    renderAnchors () {
        let dom = Outline.Utils.DOM
        let data = this.getData()
        let headings = data.headings
        let chapters = data.chapters
        let elements = this.getElements()
        let anchorURL = this.get('anchorURL')

        headings.forEach((heading, i) => {
            let el = heading.node
            let icon = dom.createElement('i', {
                className: 'icon icon-section outline-heading-icon'
            })
            let url = anchorURL ? anchorURL : '#' + heading.id
            let anchorStyle = this.get('anchorAt') === 'front' ? 'outline-heading-anchor-at-front' : 'outline-heading-anchor-at-end'
            let anchor = dom.createElement('a', {
                'aria-hidden': true,
                className: 'outline-heading-anchor ' + anchorStyle + ' outline-link outline-hidden',
                rel: heading.id,
                href: url
            }, [
                icon
            ])
            let code

            dom.addClass(el, 'outline-heading')
            el.id = heading.id

            if (this.get('isGenerateHeadingChapterCode')) {
                code = dom.createElement('span', {
                    className: 'outline-heading-code'
                }, [
                    chapters[i].code
                ])

                el.insertBefore(code, el.firstChild)
            }

            if (this.get('isGenerateHeadingAnchor')) {
                el.appendChild(anchor)
                elements.anchors.push(anchor)
            }
        })

        return this
    }

    renderOutline () {
        let position = this.get('position').toLowerCase()

        if (!this.get('isGenerateOutline')) {
            return this
        }

        // 以导航菜单形式显示
        switch (position) {
            case 'outside':
                this.renderOutsideOutline()
                break
            case 'inside':
                this.renderInsideOutline()
                break
        }

        this.renderChapters()

        return this
    }

    renderOutsideOutline () {
        let utils = Outline.Utils
        let dom = utils.DOM
        let elements = this.getElements()
        let title = this.get('title')

        // 创建导航头部
        elements.title = dom.createElement('h2', {
            className: 'outline-outside-title'
        }, [
            title
        ])
        elements.header = dom.createElement('div', {
            className: 'outline-outside-header'
        }, [
            elements.title
        ])

        elements.list = dom.createElement('ul', {
            className: 'outline-outside-list'
        })

        elements.body = dom.createElement('div', {
            className: 'outline-outside-body'
        }, [
            elements.list
        ])

        elements.switcher = dom.createElement('div', {
            className: 'outline-outside-button outline-outside-switcher'
        }, [
            dom.createElement('i', {
                className: 'icon icon-menu'
            })
        ])

        elements.top = dom.createElement('div', {
            className: 'outline-outside-button outline-outside-top'
        }, [
            dom.createElement('a', {
                href: '#top',
                className: 'outline-outside-top'
            }, [
                dom.createElement('i', {
                    className: 'icon icon-arrow-up'
                })
            ])
        ])

        elements.footer = dom.createElement('div', {
            className: 'outline-outside-footer'
        }, [
            elements.switcher,
            elements.top
        ])

        // 创建导航菜单主体框架
        elements.modal = dom.createElement('div', {
            className: 'outline-outside-modal'
        }, [
            elements.header,
            elements.body,
            elements.footer
        ])

        // 创建导航菜单遮罩层
        elements.overlay = dom.createElement('div', {
            className: 'outline-outside-overlay outline-hidden'
        })

        // 创建导航容器
        elements.wrap = dom.createElement('div', {
            className: 'outline-outside'
        }, [
            elements.modal,
            elements.overlay
        ])

        document.body.appendChild(elements.wrap)

        return this
    }

    renderInsideOutline () {
        let utils = Outline.Utils
        let dom = utils.DOM
        let elements = this.getElements()
        let title = this.get('title')

        // 创建导航头部
        elements.title = dom.createElement('h2', {
            className: 'outline-inside-title'
        }, [
            title
        ])
        elements.header = dom.createElement('div', {
            className: 'outline-inside-header'
        }, [
            elements.title
        ])

        elements.list = dom.createElement('ul', {
            className: 'outline-inside-list'
        })

        elements.body = dom.createElement('div', {
            className: 'outline-inside-body'
        }, [
            elements.list
        ])

        // 创建导航菜单主体框架
        elements.wrap = dom.createElement('div', {
            className: 'outline-inside'
        }, [
            elements.header,
            elements.body
        ])

        elements.article.insertBefore(elements.wrap, elements.article.firstChild)

        return this
    }

    renderChapters () {
        let chapters = this.getData().chapters
        let dom = Outline.Utils.DOM
        let list = this.getElements().list

        chapters.forEach((chapter) => {
            let pid = chapter.pid
            let parent
            let ul
            let li
            let code
            let text = dom.createElement('span', {
                className: 'outline-chapter-text'
            }, [
                chapter.text
            ])
            let link = dom.createElement('a', {
                className: 'outline-link',
                href: '#' + chapter.rel,
                rel: chapter.rel
            }, [
                text
            ])

            let children = []

            if (this.get('isGenerateOutlineChapterCode')) {
                code = dom.createElement('span', {
                    className: 'outline-chapter-code'
                }, [
                    chapter.code
                ])

                children.push(code)
            }

            children.push(link)

            li = dom.createElement('li', {
                id: 'outline-chapter-' + chapter.id,
                className: 'outline-chapter'
            }, children)

            if (pid === -1) {
                list.appendChild(li)
            } else {
                parent = document.getElementById('outline-chapter-' + pid)
                ul = document.getElementById('outline-subject-' + pid)

                if (!ul) {
                    ul = dom.createElement('ul', {
                        id: 'outline-subject-' + pid,
                        className: 'outline-subject'
                    }, [
                        li
                    ])

                    parent.appendChild(ul)
                } else {
                    ul.appendChild(li)
                }
            }
        })

        return this
    }

    scrollTo (top) {
        let utils = Outline.Utils
        let elements = document.querySelectorAll('html,body')
        let rootElement = elements[0].scrollTop - elements[1].scrollTop >= 0 ? elements[0] : elements[1]
        let scrollTop = rootElement.scrollTop
        let isScrollUp = top - rootElement.scrollTop < 0
        const MAX_SCROLL_HEIGHT = rootElement.scrollHeight - window.innerHeight
        const MAX_SCROLL_TOP = top - MAX_SCROLL_HEIGHT <= 0 ? top : MAX_SCROLL_HEIGHT
        const SPEED = 30
        let count = 0
        let scroll = () => {

            if (this.timer) {
                this.stop()
            }

            count+=1

            if (isScrollUp) {
                scrollTop -= utils.easeInQuad(count)
                rootElement.scrollTop = scrollTop

                if (rootElement.scrollTop <= top) {
                    rootElement.scrollTop = top
                    this.stop()
                    return false
                }
            } else {
                scrollTop += utils.easeInQuad(count)
                rootElement.scrollTop = scrollTop

                if (rootElement.scrollTop >= MAX_SCROLL_TOP) {
                    rootElement.scrollTop = MAX_SCROLL_TOP
                    this.stop()
                    return false
                }
            }

            this.timer = setTimeout(scroll, SPEED)
        }

        scroll()

        return this
    }

    stop () {
        clearTimeout(this.timer)
        this.timer = null

        return this
    }

    show () {
        let elements = this.getElements()
        let dom = Outline.Utils.DOM

        dom.addClass(elements.modal, 'outline-outside-modal-opened')
        dom.removeClass(elements.overlay, 'outline-hidden')

        return this
    }

    hide () {
        let elements = this.getElements()
        let dom = Outline.Utils.DOM

        dom.removeClass(elements.modal, 'outline-outside-modal-opened')
        dom.addClass(elements.overlay, 'outline-hidden')

        return this
    }

    toggle () {
        if (Outline.Utils.DOM.hasClass(this.getElements().modal, 'outline-outside-modal-opened')) {
            this.hide()
        } else {
            this.show()
        }

        return this
    }

    remove () {
        let elements = this.getElements()
        let wrap = elements.wrap

        this.removeListeners()

        if (this.get('isGenerateHeadingAnchor')) {
            elements.anchors.forEach((anchor) => {
                anchor.parentNode.removeChild(anchor)
            })
        }

        wrap.parentNode.removeChild(wrap)

        return this
    }

    destroy () {
        this.remove()

        // 所有配置属性
        this.attributes = {}

        // 控件的所有 DOM 节点
        this.elements = {
            article: null,
            wrap: null,
            modal: null,
            header: null,
            title: null,
            body: null,
            list: null,
            footer: null,
            switcher: null,
            top: null,
            overlay: null,
            anchors: []
        }

        // 控件的数据
        this.data = {
            headings: [],
            chapters: []
        }

        this.timer = null

        return this
    }

    removeListeners () {
        let elements = this.getElements()
        let article = elements.article
        let wrap = elements.wrap
        let utils = Outline.Utils
        let off = utils.Events.off
        let position = this.get('position').toLowerCase()

        off(article, 'mouseenter', this._handleArticleHeadingMouseEnter)
        off(article, 'mouseleave', this._handleArticleHeadingMouseLeave)

        if (position === 'outside') {
            off(wrap, 'click', this._handleSwitcherClick)
            off(wrap, 'click', this._handleTopClick)
            off(wrap, 'click', this._handleOverlayClick)
        }

        off(wrap, 'click', this._handleChapterClick)

        if (this.get('isGenerateHeadingAnchor')) {
            off(article, 'click', this._handleHeadingAnchorClick)
        }

        return this
    }

    addListeners () {
        let elements = this.getElements()
        let article = elements.article
        let wrap = elements.wrap
        let utils = Outline.Utils
        let events = utils.Events
        let delegate = events.delegate
        let position = this.get('position').toLowerCase()

        delegate(article, '.outline-heading', 'mouseenter', this._handleArticleHeadingMouseEnter, this)
        delegate(article, '.outline-heading', 'mouseleave', this._handleArticleHeadingMouseLeave, this)

        if (position === 'outside') {
            delegate(wrap, '.outline-outside-switcher', 'click', this._handleSwitcherClick, this)
            delegate(wrap, '.outline-outside-top', 'click', this._handleTopClick, this)
            delegate(wrap, '.outline-outside-overlay', 'click', this._handleOverlayClick, this)
        }

        delegate(wrap, '.outline-link', 'click', this._handleChapterClick, this)

        if (this.get('isGenerateHeadingAnchor')) {
            delegate(article, '.outline-heading-anchor', 'click', this._handleHeadingAnchorClick, this)
        }

        return this
    }

    _handleArticleHeadingMouseEnter (evt) {
        let target = evt.delegateTarget
        let anchor = target.querySelector('.outline-heading-anchor')

        if (anchor) {
            Outline.Utils.DOM.removeClass(anchor, 'outline-hidden')
        }

        return this
    }

    _handleArticleHeadingMouseLeave (evt) {
        let target = evt.delegateTarget
        let anchor = target.querySelector('.outline-heading-anchor')

        if (anchor) {
            Outline.Utils.DOM.addClass(anchor, 'outline-hidden')
        }

        return this
    }

    _handleHeadingAnchorClick (evt) {
        let anchor = evt.delegateTarget
        let rel = anchor.getAttribute('rel')
        let heading = document.querySelector('#' + rel)
        let utils = Outline.Utils
        let dom = utils.DOM
        let events = utils.Events
        let offsetTop = dom.offset(heading).top

        if(utils.isEmpty(this.get('anchorURL'))){
            this.stop().scrollTo(offsetTop)
            events.stop(evt)
        }

        return this
    }

    _handleChapterClick (evt) {
        let anchor = evt.delegateTarget
        let rel = anchor.getAttribute('rel')
        let heading = document.querySelector('#' + rel)
        let utils = Outline.Utils
        let dom = utils.DOM
        let events = utils.Events
        let offsetTop = dom.offset(heading).top

        if (this.get('position') === 'outside') {
            this.hide()
        }

        this.stop().scrollTo(offsetTop)
        events.stop(evt)

        return this
    }

    _handleSwitcherClick () {
        this.toggle()

        return this
    }

    _handleTopClick (evt) {
        let utils = Outline.Utils
        let events = utils.Events

        this.stop().scrollTo(0)

        events.stop(evt)

        return this
    }

    _handleOverlayClick () {
        this.hide()

        return this
    }
}

/**
 * Outline 对象的默认配置信息
 *
 * @type {Object}
 */
Outline.defaults = {
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

/**
 * 常用的静态方法集
 *
 * @type {Object}
 */
Outline.Utils = {
    uuid: 0,
    isObject: (o) => {
        return Object.prototype.toString.apply(o) === '[object Object]' && o !== null
    },
    isArray: (o) => {
        if (Array.isArray) {
            return Array.isArray(o)
        } else {
            return Object.prototype.toString.apply(o) === '[object Array]'
        }
    },
    isElement: (o) => {
        return o && o.nodeName && o.tagName && o.nodeType === 1
    },
    isEmpty: (str) => {
        return typeof str === 'string' && str === ''
    },
    guid: (prefix) => {
        let utils = Outline.Utils

        utils.uuid += 1

        return prefix ? prefix + '-' + utils.uuid : 'guid-' + utils.uuid
    },
    trim: (str) => {
        return str.replace(/^\s+/g, '').replace(/\s+$/g, '')
    },
    stripTags: (str) => {
        return str.replace(/<\/?[^>]+(>|$)/g, '')
    },
    groupBy: (list, prop) => {
        const groups = {}
        const cb = (o) => {
            return [o[prop]]
        }

        list.forEach((o) => {
            const group = JSON.stringify(cb(o))

            groups[group] = groups[group] || []
            groups[group].push(o)
        })

        return Object.keys(groups).map((group) => {
            return groups[group]
        })
    },
    easeInQuad: (x) => {
        return x * x
    },
    extend: (origin, source) => {
        for (let prop in source) {
            if (source.hasOwnProperty(prop)) {
                origin[prop] = source[prop]
            }
        }
    }
}

/**
 * DOM 相关的静态方法集
 *
 * @type {Object}
 */
Outline.Utils.DOM = {
    /**
     * 创建 DOM 节点，并添加属性和子节点
     *
     * @param {String} tagName - 标签名称
     * @param {Object} attributes - 属性对象
     * @param {Array} children - 子节点数组
     * @returns {HTMLElement}
     */
    createElement: (tagName, attributes, children) => {
        let utils = Outline.Utils
        let dom = utils.DOM
        let element = document.createElement(tagName)

        for (let attr in attributes) {
            if (attributes.hasOwnProperty(attr)) {
                dom.setAttribute(element, attr, attributes[attr])
            }
        }

        if (utils.isArray(children)) {
            children.forEach((child) => {
                let childNode = utils.isElement(child) ? child : document.createTextNode(child)

                element.appendChild(childNode)
            })
        }

        return element
    },
    /**
     * 给 DOM 节点设置属性/值
     *
     * @param {HTMLElement} el - DOM 节点
     * @param {String} attr - 属性名称
     * @param {String|Number|Boolean} value - 属性值
     */
    setAttribute: (el, attr, value) => {
        let tagName = el.tagName.toLowerCase()

        switch (attr) {
            case 'style':
                el.style.cssText = value
                break
            case 'value':
                if (tagName === 'input' || tagName === 'textarea') {
                    el.value = value
                } else {
                    el.setAttribute(attr, value)
                }
                break
            case 'className':
                el.className = value
                break
            default:
                el.setAttribute(attr, value)
                break
        }
    },
    /**
     * 检测 DOM 节点是否包含名为 className 的样式
     *
     * @param {HTMLElement} el - DOM 节点
     * @param {String} className - 样式名称
     * @returns {*}
     */
    hasClass (el, className) {
        let allClass = el.className

        if (!allClass) {
            return false
        }

        return allClass.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
    },
    /**
     * 给 DOM 节点添加名为 className 的样式
     *
     * @param {HTMLElement} el - DOM 节点
     * @param {String} className - 样式名称
     * @returns {Boolean}
     */
    addClass (el, className) {
        let allClass = el.className

        if (Outline.Utils.DOM.hasClass(el, className)) {
            return false
        }

        allClass += allClass.length > 0 ? ' ' + className : className

        el.className = allClass
    },
    /**
     * 移除 DOM 节点的 className 样式
     *
     * @param {HTMLElement} el - DOM 节点
     * @param {String} className - 样式名称
     * @returns {Boolean}
     */
    removeClass (el, className) {
        let utils = Outline.Utils
        let allClass = el.className

        if (!allClass || !utils.DOM.hasClass(el, className)) {
            return false
        }

        allClass = utils.trim(allClass.replace(className, ''))

        el.className = allClass
    },
    /**
     * 获取 DOM 节点相对于窗口的 left 和 top 值
     *
     * @param {HTMLElement} el - DOM 节点
     * @returns {{left: Number, top: Number}}
     */
    offset (el) {
        let dom = Outline.Utils.DOM
        let left = dom.offsetLeft(el)
        let top = dom.offsetTop(el)

        return {
            left: left,
            top: top
        }
    },
    /**
     * 获取 DOM 节点相对于窗口的 left （纵坐标）值
     *
     * @param {HTMLElement} el - DOM 节点
     * @returns {Number}
     */
    offsetTop (el) {
        let dom = Outline.Utils.DOM
        let top = el.offsetTop

        if (el.offsetParent !== null) {
            top += dom.offsetTop(el.offsetParent)
        }

        return top
    },
    /**
     * 获取 DOM 节点相对于窗口的 left（横坐标）值
     *
     * @param {HTMLElement} el - DOM 节点
     * @returns {Number}
     */
    offsetLeft (el) {
        let dom = Outline.Utils.DOM
        let left = el.offsetLeft

        if (el.offsetParent !== null) {
            left += dom.offsetLeft(el.offsetParent)
        }

        return left
    }
}

/**
 * 事件相关的静态方法集
 *
 * @type {Object}
 */
Outline.Utils.Events = {
    /**
     * 绑定代理事件
     * ========================================================
     * 说明：代码修改至 Nicolas Gallagher 的 delegate.js
     * 项目 GitHub 地址：https://github.com/necolas/delegate.js
     * ========================================================
     * @param {HTMLElement} el - 绑定代理事件的 DOM 节点
     * @param {String} selector - 触发 el 代理事件的 DOM 节点的选择器
     * @param {String} type - 事件类型
     * @param {Function} callback - 绑定事件的回调函数
     * @param {Object} [context] - callback 回调函数的 this 上下文（默认值：el）
     * @param {Boolean} [capture] - 是否采用事件捕获（默认值：false - 事件冒泡）
     */
    delegate (el, selector, type, callback, context, capture) {
        const wrapper = function (e) {
            if (e.delegateTarget = Outline.getDelegateTarget(el, e.target, selector)) {
                callback.call(context || el, e)
            }
        }

        if (type === 'mouseenter' || type === 'mouseleave') {
            capture = true
        }

        callback._delegateWrapper = callback
        el.addEventListener(type, wrapper, capture || false)
    },
    /**
     * 取消事件绑定
     * ========================================================
     * 说明：代码修改至 Nicolas Gallagher 的 delegate.js
     * 项目 GitHub 地址：https://github.com/necolas/delegate.js
     * ========================================================
     * @param {HTMLElement} el - 取消绑定（代理）事件的 DOM 节点
     * @param {String} type - 事件类型
     * @param {Function} callback - 绑定事件的回调函数
     * @param {Boolean} [capture] - 是否采用事件捕获（默认值：false - 事件冒泡）
     */
    off (el, type, callback, capture) {
        if (callback._delegateWrapper) {
            callback = callback._delegateWrapper
            delete callback._delegateWrapper
        }

        if (type === 'mouseenter' || type === 'mouseleave') {
            capture = true
        }

        el.removeEventListener(type, callback, capture || false)
    },
    /**
     * 停止事件（阻止默认行为和阻止事件的捕获或冒泡）
     *
     * @param {Event} evt - 事件对象
     */
    stop (evt) {
        let events = Outline.Utils.Events

        events.stopPropagation(evt)
        events.preventDefault(evt)
    },
    /**
     * 终止事件在传播过程的捕获或冒泡
     *
     * @param {Event} evt - 事件对象
     */
    stopPropagation (evt) {
        let event = window.event

        if(evt.stopPropagation){
            evt.stopPropagation()
        } else {
            event.cancelBubble = true
        }
    },
    /**
     * 阻止事件的默认行为
     *
     * @param {Event} evt - 事件对象
     */
    preventDefault (evt) {
        let event = window.event

        if(evt.preventDefault){
            evt.preventDefault()
        } else {
            event.returnValue = false
        }
    }
}

/**
 * 通过 className 获得事件代理节点的事件代理目标节点
 * ========================================================
 * 说明：代码修改至 Nicolas Gallagher 的 delegate.js
 * 项目 GitHub 地址：https://github.com/necolas/delegate.js
 * ========================================================
 * @static
 * @param {HTMLElement} el - 绑定事件代理的节点
 * @param target - （触发事件后）事件的目标对象
 * @param selector - 目标节点的类选择器
 * @returns {HTMLElement|Null}
 */
Outline.getDelegateTarget = (el, target, selector) => {
    while (target && target !== el) {
        if (Outline.Utils.DOM.hasClass(target, selector.replace('.', ''))) {
            return target
        }

        target = target.parentElement
    }

    return null
}

/**
 * 通过索引和两个标题之前的等级差值获得当前标题节点的父级标题节点的 pid
 *
 * @static
 * @private
 * @param {Array} chapters
 * @param {Number} differ
 * @param {Number} index
 * @returns {*}
 */
Outline._generatePid = (chapters, differ, index) => {
    let pid

    // 最大只有 5 级的差距
    switch (differ) {
        case 2:
            pid = chapters[chapters[chapters[index - 1].pid].pid].pid
            break
        case 3:
            pid = chapters[chapters[chapters[chapters[index - 1].pid].pid].pid].pid
            break
        case 4:
            pid = chapters[chapters[chapters[chapters[chapters[index - 1].pid].pid].pid].pid].pid
            break
        case 5:
            pid = chapters[chapters[chapters[chapters[chapters[chapters[index - 1].pid].pid].pid].pid].pid].pid
            break
        default:
            pid = chapters[chapters[index - 1].pid].pid
            break
    }

    return pid
}

if(window.jQuery) {
    // 将 outline 扩展为一个 jquery 插件
    $.extend($.fn, {
        outline: function (options) {
            let $article = $(this)

            return new Outline($.extend({}, options, {
                article: $article
            }));
        }
    })
}
