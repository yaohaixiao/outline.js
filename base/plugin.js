class Plugin {
  constructor(name, module, options) {
    this.name = name
    this.module = module
    this.options = options
    this.instance = null

    return this
  }

  execute(options) {
    if (options) {
      this.options = options
    }

    this.instance = new this.module(this.options)

    return this
  }

  destroy() {
    this.instances = null

    return this
  }
}

export default Plugin
