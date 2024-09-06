class Plugins {
  constructor() {
    this.plugins = []

    return this
  }

  /**
   * @find
   * @param {String} name
   * @param  {String} type
   * @return {Object}
   */
  find(name, type = 'plugin') {
    return type === 'plugin'
      ? this.plugins.find((plugin) => plugin.name === name)
      : this[name]
  }

  exists(name, type = 'plugin') {
    return !!this.find(name, type)
  }

  register(plugin, options) {
    this.add(plugin).load(plugin?.name, options)

    return this
  }

  destroy(plugin) {
    const name = plugin.name

    if (!name) {
      return false
    }

    this.unload(name).remove(name)

    return this
  }

  add(plugin) {
    const name = plugin.name

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
    const plugins = this.plugins
    const plugin = this.find(name)

    if (plugin) {
      plugins.splice(plugins.indexOf(plugin), 1)
    }

    return this
  }

  load(name, options) {
    let instance = this.find(name, 'instance')

    if (instance) {
      return this
    }

    const plugin = this.find(name)

    if (!plugin) {
      return this
    }

    instance = new plugin(options)
    this[name] = instance

    return this
  }

  unload(name) {
    const instance = this.find(name, 'instance')

    if (!instance) {
      return this
    }

    instance.destroy()
    delete this[name]

    return this
  }

  clear() {
    const plugins = this.plugins.map((plugin) => plugin.name)

    plugins.forEach((name) => {
      this.unload(name).remove(name)
    })

    return this
  }
}

export default Plugins
