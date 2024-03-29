import isString from './utils/types/isString'
import hasOwn from './utils/lang/hasOwn'
import isObject from './utils/types/isObject'
import extend from './utils/lang/extend'

class Speech {
  constructor(options) {
    this._utterance = new SpeechSynthesisUtterance()

    if (options) {
      this.initialize(options)
    }
  }

  initialize(options) {
    this.utterance(options)
    return this
  }

  utterance(prop, value) {
    const attrs = this._utterance

    if (isString(prop)) {
      // 只能扩展 attrs 中已有的属性
      if (value && hasOwn(attrs, prop)) {
        // 更新单个配置信息
        attrs[prop] = value
        return this
      }

      // 只传递 prop 参数，则返回对应的属性值
      return attrs[prop]
    } else if (isObject(prop)) {
      // 批量更新配置信息
      extend(attrs, prop)

      return this
    } else if (arguments.length === 0) {
      // 不传递参数，直接返回整个
      return attrs
    }

    return this
  }

  isSpeaking() {
    return speechSynthesis.speaking
  }

  isPending() {
    return speechSynthesis.pending
  }

  isPaused() {
    return speechSynthesis.paused
  }

  getVoices() {
    return speechSynthesis.getVoices()
  }

  speak(text) {
    if (text) {
      this.utterance('text', text)
    }

    speechSynthesis.speak(this._utterance)

    return this
  }

  pause() {
    speechSynthesis.pause()
    return this
  }

  resume() {
    speechSynthesis.resume()
    return this
  }

  cancel() {
    speechSynthesis.cancel()
    this.utterance('text', '')
    return this
  }
}

Speech.isSupport = (() => {
  return 'speechSynthesis' in window
})()

export default Speech
