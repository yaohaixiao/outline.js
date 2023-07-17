import emit from './emit'
import on from './on'
import off from './off'

const observer = {
  on(topic, handler) {
    return on(topic, handler)
  },

  emit(topic, data, async = true) {
    emit(topic, data, async)

    return this
  },

  off(topic, token) {
    off(topic, token)

    return this
  }
}

export default observer
