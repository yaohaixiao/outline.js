class Plugins {
  constructor() {
    this.plugins = []

    return this
  }

  getPlugin(name) {
    return this.plugins.find((plugin) => plugin.name === name)
  }

  isExists(name) {
    return !!this.getPlugin(name)
  }

  add(plugin) {
    const name = plugin.name

    if (!name) {
      throw new Error('Plugin name required')
    }

    if (this.isExists(name)) {
      return this
    }

    this.plugins.push(plugin)

    return this
  }

  remove(name) {
    const plugins = this.plugins
    const plugin = this.getPlugin(name)

    if (plugin) {
      plugins.splice(plugins.indexOf(plugin), 1)
    }

    return this
  }

  clear() {
    this.plugins = []

    return this
  }
}

export default Plugins
