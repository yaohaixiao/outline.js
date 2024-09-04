import ROLLUP_PLUGIN_CONFIG from './rollup.plugin.config'

export default [
  {
    input: './api/js/main.js',
    output: {
      name: 'outline',
      file: './docs/js/docs.min.js',
      format: 'umd',
      sourcemap: true
    },
    plugins: ROLLUP_PLUGIN_CONFIG
  },
  {
    input: './outline.js',
    output: {
      name: 'Outline',
      file: './docs/js/outline.min.js',
      format: 'umd',
      sourcemap: true
    },
    plugins: ROLLUP_PLUGIN_CONFIG
  }
]
