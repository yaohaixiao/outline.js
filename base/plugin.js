import Component from './component'

class Plugin extends Component {
  constructor(options) {
    super()

    this.attrs = {}
    this.name = 'plugin'

    if (options) {
      this.execute(options)
    }
  }

  execute(options) {
    this.attr(options).render().addListeners()
    return this
  }
}

export default Plugin
