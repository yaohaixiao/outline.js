/**
 * 停止事件（阻止默认行为和阻止事件的捕获或冒泡）
 * ========================================================================
 * @method stop
 * @param {Event} evt - 事件对象
 *
 * @example
 * <div id="nav" class="nav">
 *   <a id="service" class="anchor" href="https://www.yaohaixiao.com/serivce">Service</a>
 *   <a id="help" class="anchor" href="https://www.yaohaixiao.com/help">Help</a>
 * </div>
 *
 * const $nav = document.querySelector('#nav')
 * const $service = document.querySelector('.anchor')
 *
 * on($nav, 'click', function(evt) {
 *   console.log('你点击了导航栏')
 * })
 *
 * on($anchor, 'click', function(evt) {
 *   console.log('tagName', this.tagName)
 *
 *   // 工作台输出：'a'
 *   // 不会触发事件冒泡，输出：'你点击了导航栏'
 *   // 也不会切换到 href 属性的页面，阻止了点击链接的默认行为
 *   stopEvent(evt)
 * })
 */
const stop = function (evt) {
  evt.stopPropagation()
  evt.preventDefault()
}

export default stop
