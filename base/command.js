import isFunction from '@/utils/types/isFunction'

class Command {
  constructor(name, action) {
    this.name = name

    if (isFunction(action)) {
      this.action = action
    }
  }

  execute() {
    this.action()

    return this
  }
}

export default Command
