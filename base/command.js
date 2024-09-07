import isFunction from '@/utils/types/isFunction'

class Command {
  constructor(name, action, options) {
    this.name = name
    this.options = options

    if (isFunction(action)) {
      this.action = action
    }
  }

  execute(options) {
    if (options) {
      this.options = options
    }

    this.action(options)

    return this
  }

  destroy() {
    this.name = ''
    this.options = null
    this.action = null
  }
}

export default Command
