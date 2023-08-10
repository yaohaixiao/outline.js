import { Base } from './base'

export type ChaptersDefaultOptions = {
    parentElement: '',
    scrollElement: '',
    selector: '.outline-heading',
    active: 0,
    closed: false,
    showCode: true,
    position: 'relative',
    stickyHeight: 0,
    chapters: [],
    created: null,
    mounted: null,
    afterClosed: null,
    afterOpened: null,
    afterScroll: null,
    beforeDestroy: null,
    afterDestroy: null,
    afterSticky: null
}

export declare class Chapters extends Base {
    /** The root DOM element of chapters */
    $el: object

    /** The title DOM element of chapters */
    $title: object

    /** The main DOM element of chapters */
    $main: object

    /** The list DOM element of chapters */
    $list: object

    /** The placeholder DOM element of chapters */
    $placeholder: object

    /** The parent DOM element where the root DOM element to append */
    $parentElement: object

    /** The DOM element which contains the article and can scroll */
    $scrollElement: object

    /** The current anchor DOM element which trigger the observer event */
    $active: object

    /** Chapters data */
    chapters: object[]

    /** If the chapters nav closed */
    closed: boolean

    /** If the index of active DOM element */
    active: number

    /** The offsetTop value of the root DOM element */
    offsetTop: number

    /** The offsetWidth value of the root DOM element */
    offsetWidth: number

    /** The timer of scroll event */
    scrollTimer: object

    /** The timer of resize event */
    resizeTimer: object

    /** If the scroll DOM element is moving */
    playing: boolean

    /** The instance of IntersectionObserver Object */
    Observer: object

    /** Default options */
    static DEFAULTS: ChaptersDefaultOptions
}
