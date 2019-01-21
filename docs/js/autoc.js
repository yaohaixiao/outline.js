;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.AutocJs = factory();
  }
}(this, function() {
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AutocJs = function () {
    function AutocJs(options) {
        _classCallCheck(this, AutocJs);

        // 所有配置属性
        this.attributes = {};

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

            // 控件的数据
        };this.data = {
            headings: [],
            chapters: []
        };

        this.timer = null;

        // 运行程序
        this.initialize(options).render().addListeners();

        return this;
    }

    _createClass(AutocJs, [{
        key: 'initialize',
        value: function initialize(options) {
            var elements = this.getElements();
            var data = this.getData();
            var article = void 0;
            var headings = void 0;

            // 舒适化配置
            this.set(AutocJs.defaults).set(options);

            article = document.querySelector(this.get('article'));
            headings = this.generateHeadings(article.querySelectorAll(this.get('selector')));

            elements.article = article;

            data.headings = headings;
            data.chapters = this.generateChapters(headings);

            return this;
        }
    }, {
        key: 'reload',
        value: function reload(options) {
            this.destroy().initialize(options).render().addListeners();

            return this;
        }

        /**
         * 设置属性
         * @param {String|Object} prop
         * @param {*} [val]
         * @returns {Autoc}
         */

    }, {
        key: 'set',
        value: function set(prop, val) {
            var utils = AutocJs.Utils;
            var attrs = this.attributes;

            if (arguments.length === 2) {
                attrs[prop] = val;
            } else {
                if (utils.isObject(prop)) {
                    utils.extend(attrs, prop);
                }
            }

            return this;
        }

        // 获取属性值

    }, {
        key: 'get',
        value: function get(prop) {
            return this.attributes[prop];
        }
    }, {
        key: 'getElements',
        value: function getElements() {
            return this.elements;
        }
    }, {
        key: 'getData',
        value: function getData() {
            return this.data;
        }
    }, {
        key: 'generateHeadings',
        value: function generateHeadings(nodes) {
            var headings = [];
            var utils = AutocJs.Utils;

            Array.prototype.forEach.call(nodes, function (node) {
                headings.push({
                    id: utils.guid('outline-heading'),
                    node: node,
                    tagName: node.tagName,
                    level: parseInt(node.tagName.replace(/[h]/i, ''), 10)
                });
            });

            return headings;
        }
    }, {
        key: 'generateChapters',
        value: function generateChapters(headings) {
            var utils = AutocJs.Utils;
            var chapters = [];
            var previous = 1;
            var level = 0;

            headings.forEach(function (heading, i) {
                var current = heading.level;
                var pid = -1;

                // 当前标题的（标题标签）序号 > 前一个标题的序号：两个相连的标题是父标题 -> 子标题关系；
                // h2 （前一个标题）
                // h3 （当前标题）
                if (current > previous) {
                    level += 1;

                    // 第一层级的 pid 是 -1
                    if (level === 1) {
                        pid = -1;
                    } else {
                        pid = i - 1;
                    }
                }
                // 当前标题的（标题标签）序号 = 前一个标题的序号
                // h2 （前一个标题）
                // h2 （当前标题）
                // 当前标题的（标题标签）序号 < 前一个标题的序号，并且当前标题序号 > 当前的级别
                // h2
                // h4 （前一个标题）
                // h3 （当前标题：这种情况我们还是任务 h3 是 h2 的下一级章节）
                else if (current === previous || current < previous && current > level) {
                        // H1 的层级肯定是 1
                        if (current === 1) {
                            level = 1;

                            pid = -1;
                        } else {
                            pid = chapters[i - 1].pid;
                        }
                    } else if (current <= level) {
                        // H1 的层级肯定是 1
                        if (current === 1) {
                            level = 1;
                        } else {
                            level = level - (previous - current);

                            if (level <= 1) {
                                level = 1;
                            }
                        }

                        // 第一级的标题
                        if (level === 1) {
                            pid = -1;
                        } else {
                            // 虽然看上去差点，不过能工作啊
                            pid = AutocJs._generatePid(chapters, previous - current, i);
                        }
                    }

                previous = current;

                chapters.push({
                    id: i,
                    pid: pid,
                    level: level,
                    rel: heading.id,
                    text: utils.stripTags(utils.trim(heading.node.innerHTML))
                });
            });

            this.generateChapterCode(chapters);

            return chapters;
        }
    }, {
        key: 'generateChapterCode',
        value: function generateChapterCode(chapters) {
            var utils = AutocJs.Utils;
            var groups = utils.groupBy(chapters, 'pid');

            groups.forEach(function (group) {
                group.forEach(function (chapter, i) {
                    chapter.index = i + 1;
                });
            });

            groups.forEach(function (group) {
                group.forEach(function (member) {
                    chapters.forEach(function (chapter) {
                        if (chapter.pid === -1) {
                            chapter.code = String(chapter.index);
                        } else {
                            if (chapter.pid === member.id) {
                                chapter.code = member.code + '.' + chapter.index;
                            }
                        }
                    });
                });
            });

            return this;
        }
    }, {
        key: 'render',
        value: function render() {
            this.renderAnchors().renderOutline();

            return this;
        }
    }, {
        key: 'renderAnchors',
        value: function renderAnchors() {
            var _this = this;

            var dom = AutocJs.Utils.DOM;
            var data = this.getData();
            var headings = data.headings;
            var chapters = data.chapters;
            var elements = this.getElements();
            var anchorURL = this.get('anchorURL');

            headings.forEach(function (heading, i) {
                var el = heading.node;
                var icon = dom.createElement('i', {
                    className: 'icon icon-section outline-heading-icon'
                });
                var url = anchorURL ? anchorURL : '#' + heading.id;
                var anchorStyle = _this.get('anchorAt') === 'front' ? 'outline-heading-anchor-at-front' : 'outline-heading-anchor-at-end';
                var anchor = dom.createElement('a', {
                    'aria-hidden': true,
                    className: 'outline-heading-anchor ' + anchorStyle + ' outline-link outline-hidden',
                    rel: heading.id,
                    href: url
                }, [icon]);
                var code = void 0;

                dom.addClass(el, 'outline-heading');
                el.id = heading.id;

                if (_this.get('isGenerateHeadingChapterCode')) {
                    code = dom.createElement('span', {
                        className: 'outline-heading-code'
                    }, [chapters[i].code]);

                    el.insertBefore(code, el.firstChild);
                }

                if (_this.get('isGenerateHeadingAnchor')) {
                    el.appendChild(anchor);
                    elements.anchors.push(anchor);
                }
            });

            return this;
        }
    }, {
        key: 'renderOutline',
        value: function renderOutline() {
            var position = this.get('position').toLowerCase();

            if (!this.get('isGenerateOutline')) {
                return this;
            }

            // 以导航菜单形式显示
            switch (position) {
                case 'outside':
                    this.renderOutsideOutline();
                    break;
                case 'inside':
                    this.renderInsideOutline();
                    break;
            }

            this.renderChapters();

            return this;
        }
    }, {
        key: 'renderOutsideOutline',
        value: function renderOutsideOutline() {
            var utils = AutocJs.Utils;
            var dom = utils.DOM;
            var elements = this.getElements();
            var title = this.get('title');

            // 创建导航头部
            elements.title = dom.createElement('h2', {
                className: 'outline-outside-title'
            }, [title]);
            elements.header = dom.createElement('div', {
                className: 'outline-outside-header'
            }, [elements.title]);

            elements.list = dom.createElement('ul', {
                className: 'outline-outside-list'
            });

            elements.body = dom.createElement('div', {
                className: 'outline-outside-body'
            }, [elements.list]);

            elements.switcher = dom.createElement('div', {
                className: 'outline-outside-button outline-outside-switcher'
            }, [dom.createElement('i', {
                className: 'icon icon-menu'
            })]);

            elements.top = dom.createElement('div', {
                className: 'outline-outside-button outline-outside-top'
            }, [dom.createElement('a', {
                href: '#top',
                className: 'outline-outside-top'
            }, [dom.createElement('i', {
                className: 'icon icon-arrow-up'
            })])]);

            elements.footer = dom.createElement('div', {
                className: 'outline-outside-footer'
            }, [elements.switcher, elements.top]);

            // 创建导航菜单主体框架
            elements.modal = dom.createElement('div', {
                className: 'outline-outside-modal'
            }, [elements.header, elements.body, elements.footer]);

            // 创建导航菜单遮罩层
            elements.overlay = dom.createElement('div', {
                className: 'outline-outside-overlay outline-hidden'
            });

            // 创建导航容器
            elements.wrap = dom.createElement('div', {
                className: 'outline-outside'
            }, [elements.modal, elements.overlay]);

            document.body.appendChild(elements.wrap);

            return this;
        }
    }, {
        key: 'renderInsideOutline',
        value: function renderInsideOutline() {
            var utils = AutocJs.Utils;
            var dom = utils.DOM;
            var elements = this.getElements();
            var title = this.get('title');

            // 创建导航头部
            elements.title = dom.createElement('h2', {
                className: 'outline-inside-title'
            }, [title]);
            elements.header = dom.createElement('div', {
                className: 'outline-inside-header'
            }, [elements.title]);

            elements.list = dom.createElement('ul', {
                className: 'outline-inside-list'
            });

            elements.body = dom.createElement('div', {
                className: 'outline-inside-body'
            }, [elements.list]);

            // 创建导航菜单主体框架
            elements.wrap = dom.createElement('div', {
                className: 'outline-inside'
            }, [elements.header, elements.body]);

            elements.article.insertBefore(elements.wrap, elements.article.firstChild);

            return this;
        }
    }, {
        key: 'renderChapters',
        value: function renderChapters() {
            var _this2 = this;

            var chapters = this.getData().chapters;
            var dom = AutocJs.Utils.DOM;
            var list = this.getElements().list;

            chapters.forEach(function (chapter) {
                var pid = chapter.pid;
                var parent = void 0;
                var ul = void 0;
                var li = void 0;
                var code = void 0;
                var text = dom.createElement('span', {
                    className: 'outline-chapter-text'
                }, [chapter.text]);
                var link = dom.createElement('a', {
                    className: 'outline-link',
                    href: '#' + chapter.rel,
                    rel: chapter.rel
                }, [text]);

                var children = [];

                if (_this2.get('isGenerateOutlineChapterCode')) {
                    code = dom.createElement('span', {
                        className: 'outline-chapter-code'
                    }, [chapter.code]);

                    children.push(code);
                }

                children.push(link);

                li = dom.createElement('li', {
                    id: 'outline-chapter-' + chapter.id,
                    className: 'outline-chapter'
                }, children);

                if (pid === -1) {
                    list.appendChild(li);
                } else {
                    parent = document.getElementById('outline-chapter-' + pid);
                    ul = document.getElementById('outline-subject-' + pid);

                    if (!ul) {
                        ul = dom.createElement('ul', {
                            id: 'outline-subject-' + pid,
                            className: 'outline-subject'
                        }, [li]);

                        parent.appendChild(ul);
                    } else {
                        ul.appendChild(li);
                    }
                }
            });

            return this;
        }
    }, {
        key: 'scrollTo',
        value: function scrollTo(top) {
            var _this3 = this;

            var utils = AutocJs.Utils;
            var elements = document.querySelectorAll('html,body');
            var rootElement = elements[0].scrollTop - elements[1].scrollTop >= 0 ? elements[0] : elements[1];
            var scrollTop = rootElement.scrollTop;
            var isScrollUp = top - rootElement.scrollTop < 0;
            var MAX_SCROLL_HEIGHT = rootElement.scrollHeight - window.innerHeight;
            var MAX_SCROLL_TOP = top - MAX_SCROLL_HEIGHT <= 0 ? top : MAX_SCROLL_HEIGHT;
            var SPEED = 30;
            var count = 0;
            var scroll = function scroll() {

                if (_this3.timer) {
                    _this3.stop();
                }

                count += 1;

                if (isScrollUp) {
                    scrollTop -= utils.easeInQuad(count);
                    rootElement.scrollTop = scrollTop;

                    if (rootElement.scrollTop <= top) {
                        rootElement.scrollTop = top;
                        _this3.stop();
                        return false;
                    }
                } else {
                    scrollTop += utils.easeInQuad(count);
                    rootElement.scrollTop = scrollTop;

                    if (rootElement.scrollTop >= MAX_SCROLL_TOP) {
                        rootElement.scrollTop = MAX_SCROLL_TOP;
                        _this3.stop();
                        return false;
                    }
                }

                _this3.timer = setTimeout(scroll, SPEED);
            };

            scroll();

            return this;
        }
    }, {
        key: 'stop',
        value: function stop() {
            clearTimeout(this.timer);
            this.timer = null;

            return this;
        }
    }, {
        key: 'show',
        value: function show() {
            var elements = this.getElements();
            var dom = AutocJs.Utils.DOM;

            dom.addClass(elements.modal, 'outline-outside-modal-opened');
            dom.removeClass(elements.overlay, 'outline-hidden');

            return this;
        }
    }, {
        key: 'hide',
        value: function hide() {
            var elements = this.getElements();
            var dom = AutocJs.Utils.DOM;

            dom.removeClass(elements.modal, 'outline-outside-modal-opened');
            dom.addClass(elements.overlay, 'outline-hidden');

            return this;
        }
    }, {
        key: 'toggle',
        value: function toggle() {
            if (AutocJs.Utils.DOM.hasClass(this.getElements().modal, 'outline-outside-modal-opened')) {
                this.hide();
            } else {
                this.show();
            }

            return this;
        }
    }, {
        key: 'remove',
        value: function remove() {
            var elements = this.getElements();
            var wrap = elements.wrap;

            this.removeListeners();

            if (this.get('isGenerateHeadingAnchor')) {
                elements.anchors.forEach(function (anchor) {
                    anchor.parentNode.removeChild(anchor);
                });
            }

            wrap.parentNode.removeChild(wrap);

            return this;
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            this.remove();

            // 所有配置属性
            this.attributes = {};

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

                // 控件的数据
            };this.data = {
                headings: [],
                chapters: []
            };

            this.timer = null;

            return this;
        }
    }, {
        key: 'removeListeners',
        value: function removeListeners() {
            var elements = this.getElements();
            var article = elements.article;
            var wrap = elements.wrap;
            var utils = AutocJs.Utils;
            var off = utils.Events.off;
            var position = this.get('position').toLowerCase();

            off(article, 'mouseenter', this._handleArticleHeadingMouseEnter);
            off(article, 'mouseleave', this._handleArticleHeadingMouseLeave);

            if (position === 'outside') {
                off(wrap, 'click', this._handleSwitcherClick);
                off(wrap, 'click', this._handleTopClick);
                off(wrap, 'click', this._handleOverlayClick);
            }

            off(wrap, 'click', this._handleChapterClick);

            if (this.get('isGenerateHeadingAnchor')) {
                off(article, 'click', this._handleHeadingAnchorClick);
            }

            return this;
        }
    }, {
        key: 'addListeners',
        value: function addListeners() {
            var elements = this.getElements();
            var article = elements.article;
            var wrap = elements.wrap;
            var utils = AutocJs.Utils;
            var events = utils.Events;
            var delegate = events.delegate;
            var position = this.get('position').toLowerCase();

            delegate(article, '.outline-heading', 'mouseenter', this._handleArticleHeadingMouseEnter, this);
            delegate(article, '.outline-heading', 'mouseleave', this._handleArticleHeadingMouseLeave, this);

            if (position === 'outside') {
                delegate(wrap, '.outline-outside-switcher', 'click', this._handleSwitcherClick, this);
                delegate(wrap, '.outline-outside-top', 'click', this._handleTopClick, this);
                delegate(wrap, '.outline-outside-overlay', 'click', this._handleOverlayClick, this);
            }

            delegate(wrap, '.outline-link', 'click', this._handleChapterClick, this);

            if (this.get('isGenerateHeadingAnchor')) {
                delegate(article, '.outline-heading-anchor', 'click', this._handleHeadingAnchorClick, this);
            }

            return this;
        }
    }, {
        key: '_handleArticleHeadingMouseEnter',
        value: function _handleArticleHeadingMouseEnter(evt) {
            var target = evt.delegateTarget;
            var anchor = target.querySelector('.outline-heading-anchor');

            if (anchor) {
                AutocJs.Utils.DOM.removeClass(anchor, 'outline-hidden');
            }

            return this;
        }
    }, {
        key: '_handleArticleHeadingMouseLeave',
        value: function _handleArticleHeadingMouseLeave(evt) {
            var target = evt.delegateTarget;
            var anchor = target.querySelector('.outline-heading-anchor');

            if (anchor) {
                AutocJs.Utils.DOM.addClass(anchor, 'outline-hidden');
            }

            return this;
        }
    }, {
        key: '_handleHeadingAnchorClick',
        value: function _handleHeadingAnchorClick(evt) {
            var anchor = evt.delegateTarget;
            var rel = anchor.getAttribute('rel');
            var heading = document.querySelector('#' + rel);
            var utils = AutocJs.Utils;
            var dom = utils.DOM;
            var events = utils.Events;
            var offsetTop = dom.offset(heading).top;

            if (utils.isEmpty(this.get('anchorURL'))) {
                this.stop().scrollTo(offsetTop);
                events.stop(evt);
            }

            return this;
        }
    }, {
        key: '_handleChapterClick',
        value: function _handleChapterClick(evt) {
            var anchor = evt.delegateTarget;
            var rel = anchor.getAttribute('rel');
            var heading = document.querySelector('#' + rel);
            var utils = AutocJs.Utils;
            var dom = utils.DOM;
            var events = utils.Events;
            var offsetTop = dom.offset(heading).top;

            if (this.get('position') === 'outside') {
                this.hide();
            }

            this.stop().scrollTo(offsetTop);
            events.stop(evt);

            return this;
        }
    }, {
        key: '_handleSwitcherClick',
        value: function _handleSwitcherClick() {
            this.toggle();

            return this;
        }
    }, {
        key: '_handleTopClick',
        value: function _handleTopClick(evt) {
            var utils = AutocJs.Utils;
            var events = utils.Events;

            this.stop().scrollTo(0);

            events.stop(evt);

            return this;
        }
    }, {
        key: '_handleOverlayClick',
        value: function _handleOverlayClick() {
            this.hide();

            return this;
        }
    }]);

    return AutocJs;
}();

/**
 * Outline 对象的默认配置信息
 *
 * @type {Object}
 */


AutocJs.defaults = {
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

    /**
     * 常用的静态方法集
     *
     * @type {Object}
     */
};AutocJs.Utils = {
    uuid: 0,
    isObject: function isObject(o) {
        return Object.prototype.toString.apply(o) === '[object Object]' && o !== null;
    },
    isArray: function isArray(o) {
        if (Array.isArray) {
            return Array.isArray(o);
        } else {
            return Object.prototype.toString.apply(o) === '[object Array]';
        }
    },
    isElement: function isElement(o) {
        return o && o.nodeName && o.tagName && o.nodeType === 1;
    },
    isEmpty: function isEmpty(str) {
        return typeof str === 'string' && str === '';
    },
    guid: function guid(prefix) {
        var utils = AutocJs.Utils;

        utils.uuid += 1;

        return prefix ? prefix + '-' + utils.uuid : 'guid-' + utils.uuid;
    },
    trim: function trim(str) {
        return str.replace(/^\s+/g, '').replace(/\s+$/g, '');
    },
    stripTags: function stripTags(str) {
        return str.replace(/<\/?[^>]+(>|$)/g, '');
    },
    groupBy: function groupBy(list, prop) {
        var groups = {};
        var cb = function cb(o) {
            return [o[prop]];
        };

        list.forEach(function (o) {
            var group = JSON.stringify(cb(o));

            groups[group] = groups[group] || [];
            groups[group].push(o);
        });

        return Object.keys(groups).map(function (group) {
            return groups[group];
        });
    },
    easeInQuad: function easeInQuad(x) {
        return x * x;
    },
    extend: function extend(origin, source) {
        for (var prop in source) {
            if (source.hasOwnProperty(prop)) {
                origin[prop] = source[prop];
            }
        }
    }

    /**
     * DOM 相关的静态方法集
     *
     * @type {Object}
     */
};AutocJs.Utils.DOM = {
    /**
     * 创建 DOM 节点，并添加属性和子节点
     *
     * @param {String} tagName - 标签名称
     * @param {Object} attributes - 属性对象
     * @param {Array} children - 子节点数组
     * @returns {HTMLElement}
     */
    createElement: function createElement(tagName, attributes, children) {
        var utils = AutocJs.Utils;
        var dom = utils.DOM;
        var element = document.createElement(tagName);

        for (var attr in attributes) {
            if (attributes.hasOwnProperty(attr)) {
                dom.setAttribute(element, attr, attributes[attr]);
            }
        }

        if (utils.isArray(children)) {
            children.forEach(function (child) {
                var childNode = utils.isElement(child) ? child : document.createTextNode(child);

                element.appendChild(childNode);
            });
        }

        return element;
    },
    /**
     * 给 DOM 节点设置属性/值
     *
     * @param {HTMLElement} el - DOM 节点
     * @param {String} attr - 属性名称
     * @param {String|Number|Boolean} value - 属性值
     */
    setAttribute: function setAttribute(el, attr, value) {
        var tagName = el.tagName.toLowerCase();

        switch (attr) {
            case 'style':
                el.style.cssText = value;
                break;
            case 'value':
                if (tagName === 'input' || tagName === 'textarea') {
                    el.value = value;
                } else {
                    el.setAttribute(attr, value);
                }
                break;
            case 'className':
                el.className = value;
                break;
            default:
                el.setAttribute(attr, value);
                break;
        }
    },
    /**
     * 检测 DOM 节点是否包含名为 className 的样式
     *
     * @param {HTMLElement} el - DOM 节点
     * @param {String} className - 样式名称
     * @returns {*}
     */
    hasClass: function hasClass(el, className) {
        var allClass = el.className;

        if (!allClass) {
            return false;
        }

        return allClass.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
    },

    /**
     * 给 DOM 节点添加名为 className 的样式
     *
     * @param {HTMLElement} el - DOM 节点
     * @param {String} className - 样式名称
     * @returns {Boolean}
     */
    addClass: function addClass(el, className) {
        var allClass = el.className;

        if (AutocJs.Utils.DOM.hasClass(el, className)) {
            return false;
        }

        allClass += allClass.length > 0 ? ' ' + className : className;

        el.className = allClass;
    },

    /**
     * 移除 DOM 节点的 className 样式
     *
     * @param {HTMLElement} el - DOM 节点
     * @param {String} className - 样式名称
     * @returns {Boolean}
     */
    removeClass: function removeClass(el, className) {
        var utils = AutocJs.Utils;
        var allClass = el.className;

        if (!allClass || !utils.DOM.hasClass(el, className)) {
            return false;
        }

        allClass = utils.trim(allClass.replace(className, ''));

        el.className = allClass;
    },

    /**
     * 获取 DOM 节点相对于窗口的 left 和 top 值
     *
     * @param {HTMLElement} el - DOM 节点
     * @returns {{left: Number, top: Number}}
     */
    offset: function offset(el) {
        var dom = AutocJs.Utils.DOM;
        var left = dom.offsetLeft(el);
        var top = dom.offsetTop(el);

        return {
            left: left,
            top: top
        };
    },

    /**
     * 获取 DOM 节点相对于窗口的 left （纵坐标）值
     *
     * @param {HTMLElement} el - DOM 节点
     * @returns {Number}
     */
    offsetTop: function offsetTop(el) {
        var dom = AutocJs.Utils.DOM;
        var top = el.offsetTop;

        if (el.offsetParent !== null) {
            top += dom.offsetTop(el.offsetParent);
        }

        return top;
    },

    /**
     * 获取 DOM 节点相对于窗口的 left（横坐标）值
     *
     * @param {HTMLElement} el - DOM 节点
     * @returns {Number}
     */
    offsetLeft: function offsetLeft(el) {
        var dom = AutocJs.Utils.DOM;
        var left = el.offsetLeft;

        if (el.offsetParent !== null) {
            left += dom.offsetLeft(el.offsetParent);
        }

        return left;
    }
};

/**
 * 事件相关的静态方法集
 *
 * @type {Object}
 */
AutocJs.Utils.Events = {
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
    delegate: function delegate(el, selector, type, callback, context, capture) {
        var wrapper = function wrapper(e) {
            if (e.delegateTarget = AutocJs.getDelegateTarget(el, e.target, selector)) {
                callback.call(context || el, e);
            }
        };

        if (type === 'mouseenter' || type === 'mouseleave') {
            capture = true;
        }

        callback._delegateWrapper = callback;
        el.addEventListener(type, wrapper, capture || false);
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
    off: function off(el, type, callback, capture) {
        if (callback._delegateWrapper) {
            callback = callback._delegateWrapper;
            delete callback._delegateWrapper;
        }

        if (type === 'mouseenter' || type === 'mouseleave') {
            capture = true;
        }

        el.removeEventListener(type, callback, capture || false);
    },

    /**
     * 停止事件（阻止默认行为和阻止事件的捕获或冒泡）
     *
     * @param {Event} evt - 事件对象
     */
    stop: function stop(evt) {
        var events = AutocJs.Utils.Events;

        events.stopPropagation(evt);
        events.preventDefault(evt);
    },

    /**
     * 终止事件在传播过程的捕获或冒泡
     *
     * @param {Event} evt - 事件对象
     */
    stopPropagation: function stopPropagation(evt) {
        var event = window.event;

        if (evt.stopPropagation) {
            evt.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    },

    /**
     * 阻止事件的默认行为
     *
     * @param {Event} evt - 事件对象
     */
    preventDefault: function preventDefault(evt) {
        var event = window.event;

        if (evt.preventDefault) {
            evt.preventDefault();
        } else {
            event.returnValue = false;
        }
    }
};

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
AutocJs.getDelegateTarget = function (el, target, selector) {
    while (target && target !== el) {
        if (AutocJs.Utils.DOM.hasClass(target, selector.replace('.', ''))) {
            return target;
        }

        target = target.parentElement;
    }

    return null;
};

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
AutocJs._generatePid = function (chapters, differ, index) {
    var pid = void 0;

    // 最大只有 5 级的差距
    switch (differ) {
        case 2:
            pid = chapters[chapters[chapters[index - 1].pid].pid].pid;
            break;
        case 3:
            pid = chapters[chapters[chapters[chapters[index - 1].pid].pid].pid].pid;
            break;
        case 4:
            pid = chapters[chapters[chapters[chapters[chapters[index - 1].pid].pid].pid].pid].pid;
            break;
        case 5:
            pid = chapters[chapters[chapters[chapters[chapters[chapters[index - 1].pid].pid].pid].pid].pid].pid;
            break;
        default:
            pid = chapters[chapters[index - 1].pid].pid;
            break;
    }

    return pid;
};

if (window.jQuery) {
    // 将 ArticleOutline 扩展为一个 jquery 插件
    $.extend($.fn, {
        articleOutline: function articleOutline(options) {
            var $article = $(this);

            return new AutocJs($.extend({}, options, {
                article: $article
            }));
        }
    });
}
return AutocJs;
}));
