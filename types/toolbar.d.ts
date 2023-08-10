import { Base } from './base'

export type ToolbarDefaultOptions = {
    placement: 'ltr',
    closed: false,
    disabled: false,
    rounded: true,
    buttons: [],
    created: null,
    mounted: null,
    afterClosed: null,
    afterOpened: null,
    afterDisabled: null,
    afterEnabled: null,
    beforeDestroy: null,
    afterDestroy: null
}

export declare class Toolbar extends Base {
    /** The root DOM element of toolbar */
    $el: object

    /** If toolbar disabled */
    disabled: boolean

    /** If toolbar closed */
    closed: boolean

    /** Buttons data */
    buttons: object[]

    /** Default options */
    static DEFAULTS: ToolbarDefaultOptions
}
