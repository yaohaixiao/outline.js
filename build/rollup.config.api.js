import getRollupPluginConfig from './rollup.plugin.config'

export default [
  {
    input: './api/js/main.js',
    output: {
      name: 'outline',
      file: './docs/js/docs.min.js',
      format: 'umd',
      sourcemap: true
    },
    plugins: getRollupPluginConfig('docs', true)
  },
  {
    input: './outline.js',
    output: {
      name: 'Outline',
      file: './docs/js/outline.min.js',
      format: 'umd',
      sourcemap: true
    },
    plugins: getRollupPluginConfig('outline', true)
  }
]
