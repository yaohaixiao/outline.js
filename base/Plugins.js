class Plugins {
  constructor() {
    this.plugins = []

    return this
  }

  load(plugin, options) {
    if (this.hasPlugin(plugin.name)) {
      return this
    }

    const instance = new plugin(options)

    instance.initialize()

    this.plugins.push(plugin)

    return this
  }

  unload(plugin) {
    const plugins = this.plugins
    const index = plugins.indexOf(plugin)

    if (index > -1) {
      plugin.destroy()
      plugins.splice(index, 1)
    }

    return this
  }

  hasPlugin(name) {
    return !!this.getPlugin(name)
  }

  getPlugin(name) {
    return this.plugins.find((plugin) => plugin.name === name)
  }

  executeAll() {
    this.plugins.forEach((plugin) => {
      plugin.execute()
    })

    return this
  }
}

export default Plugins
