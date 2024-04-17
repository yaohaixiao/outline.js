/**
 * 检测当前设备是否为移动设备
 * ========================================================================
 * @method isMobile
 * @return {boolean}
 */
const isMobile = () => {
  const ua = navigator.userAgent

  return /Mobile|mini|Fennec|Android|iP(ad|od|hone)|NokiaN[^/]*/.test(ua)
}

export default isMobile
