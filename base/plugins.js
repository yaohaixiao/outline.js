class Plugins {
  constructor() {
    this.plugins = []
    this.instances = []

    return this
  }

  /**
   * @find
   * @param {String} name
   * @param  {String} type
   * @return {Object}
   */
  find(name, type = 'plugin') {
    const elements = type === 'plugin' ? this.plugins : this.instances
    return elements.find((element) => element.name === name)
  }

  exists(name, type = 'plugin') {
    return !!this.find(name, type)
  }

  use(plugin, options) {
    this.add(plugin).load(plugin?.name, options)

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
    const plugin = this.find(name)
    let instance = this.find(name, 'instance')

    if (!plugin || instance) {
      return this
    }

    instance = new plugin(options)

    this.instances.push(instance)

    return this
  }

  unload(name) {
    const instances = this.instances
    const instance = this.find(name, 'instance')

    if (!instance) {
      return this
    }

    instance.destroy()
    instances.splice(instances.indexOf(instance), 1)

    return this
  }

  clear() {
    const plugins = this.plugins.map((plugin) => plugin.name)

    plugins.forEach((name) => {
      this.unload(name)
      this.remove(name)
    })

    return this
  }
}

export default Plugins
