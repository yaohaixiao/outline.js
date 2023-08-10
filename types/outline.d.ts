import { Base } from './base'
import { Anchors } from './anchors'
import { Chapters } from './chapters'
import { Drawer } from './drawer'
import { Toolbar } from './toolbar'

export type OutlineDefaultOptions = {
  articleElement: '#article',
  selector: 'h2,h3,h4,h5,h6',
  title: '目录',
  scrollElement: 'html,body',
  position: 'relative',
  parentElement: '#aside',
  placement: 'rtl',
  showCode: true,
  anchorURL: '',
  stickyHeight: 0,
  homepage: '',
  git: '',
  tags: '',
  issues: '',
  customClass: '',
  afterSticky: null,
  afterToggle: null,
  afterScroll: null
}

export declare class Outline extends Base {
  anchors: Anchors
  drawer: Chapters
  chapters: Drawer
  toolbar: Toolbar

  /** Default options */
  static DEFAULTS: OutlineDefaultOptions
}
