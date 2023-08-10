import { Base } from './base'

export type AnchorsDefaultOptions = {
    scrollElement: 'html,body',
    articleElement: '#article',
    selector: 'h1,h2,h3,h4,h5,h6',
    stickyHeight: 0,
    anchorURL: '',
    hasAnchor: true,
    isAtStart: true,
    showCode: false,
    created: null,
    mounted: null,
    afterScroll: null,
    beforeDestroy: null,
    afterDestroy: null
}

export declare class Anchors extends Base {
    /** The DOM element which contains the article content of web page */
    $articleElement: object

    /** The DOM element which contains the article and can scroll */
    $scrollElement: object

    /** The data of heading tags */
    $headings: object[]

    /** The data of chapters */
    chapters: object[]

    /** Default options */
    static DEFAULTS: AnchorsDefaultOptions
}
