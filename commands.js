import isFunction from './utils/types/isFunction'

class Commands {
  constructor() {
    this.commands = []
  }

  add(command) {
    this.commands.push(command)

    return this
  }

  del(name) {
    const commands = this.commands
    const command = commands.find((cmd) => cmd.name === name)
    const index = command ? commands.indexOf(command) : -1

    if (index > -1) {
      commands.splice(index, 1)
    }

    return this
  }

  clear() {
    this.commands = []

    return this
  }

  execute(name) {
    const command = this.commands.find((cmd) => cmd.name === name)

    if (isFunction(command?.execute)) {
      command.execute()
    }

    return this
  }
}

export default Commands
