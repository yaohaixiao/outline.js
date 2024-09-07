import isFunction from '@/utils/types/isFunction'

class Commands {
  constructor() {
    this.commands = []
  }

  find(name) {
    return this.commands.find((cmd) => cmd.name === name)
  }

  exists(name) {
    return !!this.find(name)
  }

  add(command) {
    if (this.exists(command)) {
      return this
    }

    this.commands.push(command)

    return this
  }

  remove(name) {
    const command = this.find(name)

    if (!command) {
      return this
    }

    const commands = this.commands

    commands.splice(commands.indexOf(command), 1)

    return this
  }

  execute(name) {
    const command = this.find(name)

    if (isFunction(command?.execute)) {
      command.execute()
    }

    return this
  }

  clear() {
    this.commands = []

    return this
  }
}

export default Commands
