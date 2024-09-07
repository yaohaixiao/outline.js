class Plugins {
  constructor() {
    this.plugins = []

    return this
  }

  find(name) {
    return this.plugins.find((plugin) => plugin.name === name)
  }

  exists(name) {
    return !!this.find(name)
  }

  add(plugin) {
    const { name } = plugin

    if (!name) {
      throw new Error('Plugin name required')
    }

    if (this.exists(name)) {
      return this
    }

    this.plugins.push(plugin)

    return this
  }

  remove(name) {
    const plugin = this.find(name)

    if (!plugin) {
      return this
    }

    const plugins = this.plugins

    plugins.splice(plugins.indexOf(plugin), 1)

    return this
  }

  execute(name, options) {
    const plugin = this.find(name)

    if (!plugin) {
      return this
    }

    plugin.execute(options)

    return this
  }

  executeAll() {
    const plugins = this.plugins

    plugins.forEach((plugin) => {
      this.execute(plugin.name)
    })

    return this
  }

  destroy(name) {
    const plugin = this.find(name)

    if (!plugin) {
      return this
    }

    plugin.destroy()

    this.remove(name)

    return this
  }

  destroyAll() {
    const plugins = this.plugins.map((plugin) => plugin.name)

    plugins.forEach((name) => {
      this.destroy(name)
    })

    return this
  }
}

export default Plugins
