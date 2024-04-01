import publish from './utils/observer/emit'

class Speech {
  constructor(options) {
    this.utterance = new SpeechSynthesisUtterance()

    if (options) {
      this.initialize(options)
    }
  }

  _initialize(options) {
    if (options.lang) {
      this.setLang(options.lang)
    }

    if (options.pitch) {
      this.setPitch(options.pitch)
    }

    if (options.rate) {
      this.setRate(options.rate)
    }

    if (options.text) {
      this.setText(options.text)
    }

    if (options.voice) {
      this.setVoice(options.voice)
    }

    if (options.volume) {
      this.setVolume(options.volume)
    }

    return this
  }

  initialize(options) {
    this._initialize(options)._addListeners()
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

  setLang(lang) {
    this.utterance.lang = lang
    return this
  }

  setPitch(pitch) {
    this.utterance.pitch = pitch
    return this
  }

  setRate(rate) {
    this.utterance.rate = rate
    return this
  }

  setText(text) {
    this.utterance.text = text
    return this
  }

  setVoice(voice) {
    this.utterance.voice = voice
    return this
  }

  setVolume(volume) {
    this.utterance.volume = volume
    return this
  }

  speak(text) {
    if (text) {
      this.setText(text)
    }

    speechSynthesis.speak(this.utterance)

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
    this.setText('')
    return this
  }

  _addListeners() {
    const UTTERANCE_EVENTS = [
      'boundary',
      'end',
      'error',
      'start',
      'mark',
      'pause',
      'resume'
    ]
    const utterance = this.utterance
    const speech = this

    UTTERANCE_EVENTS.forEach((name) => {
      utterance[`on${name}`] = (event) => {
        publish(name, {
          event,
          speech
        })
      }
    })

    speechSynthesis.onvoiceschanged = (event) => {
      publish('voiceschanged', {
        event,
        speech
      })
    }

    return this
  }
}

Speech.isSupport = (() => {
  return 'speechSynthesis' in window
})()

export default Speech
