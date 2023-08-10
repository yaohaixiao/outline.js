import { Base } from './base'

export type DrawerDefaultOptions = {
    placement: 'rtl',
    title: '标题',
    size: 'regular',
    hasClose: true,
    hasOverlay: true,
    hasOffset: false,
    hasPadding: true,
    autoHeight: true,
    created: null,
    mounted: null,
    afterClosed: null,
    afterOpened: null,
    afterScroll: null,
    beforeDestroy: null,
    afterDestroy: null,
    afterToggle: null
}

export declare class Drawer extends Base {
    /** Title */
    title : string

    /** If drawer closed */
    closed: boolean

    /** The root DOM element of drawer */
    $el: object

    /** The modal DOM element of drawer */
    $modal: object

    /** The header DOM element of drawer */
    $header: object

    /** The title DOM element of drawer */
    $title: object

    /** The close button DOM element of drawer */
    $close: object

    /** The main DOM element of drawer */
    $main: object

    /** The footer DOM element of drawer */
    $footer: object

    /** The overlay DOM element of drawer */
    $overlay: object

    /** Then z-index value of root DOM element */
    zIndex: number

    /** Default options */
    static DEFAULTS: DrawerDefaultOptions
}
