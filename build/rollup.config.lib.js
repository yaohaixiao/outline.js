import ROLLUP_PLUGIN_CONFIG from './rollup.plugin.config'

export default [
  // For full functions module
  {
    input: './outline.js',
    output: {
      name: 'Outline',
      file: './outline.min.js',
      format: 'umd',
      sourcemap: true
    },
    plugins: ROLLUP_PLUGIN_CONFIG
  },
  {
    input: './anchors/anchors.js',
    output: {
      name: 'Anchors',
      file: './anchors/anchors.min.js',
      format: 'umd',
      sourcemap: true
    },
    plugins: ROLLUP_PLUGIN_CONFIG
  },
  {
    input: './navigator/navigator.js',
    output: {
      name: 'Navigator',
      file: './navigator/navigator.min.js',
      format: 'umd',
      sourcemap: true
    },
    plugins: ROLLUP_PLUGIN_CONFIG
  },
  {
    input: './drawer/drawer.js',
    output: {
      name: 'Drawer',
      file: './drawer/drawer.min.js',
      format: 'umd',
      sourcemap: true
    },
    plugins: ROLLUP_PLUGIN_CONFIG
  },
  {
    input: './reader/reader.js',
    output: {
      name: 'Reader',
      file: './reader/reader.min.js',
      format: 'umd',
      sourcemap: true
    },
    plugins: ROLLUP_PLUGIN_CONFIG
  },
  {
    input: './toolbar/toolbar.js',
    output: {
      name: 'Toolbar',
      file: './toolbar/toolbar.min.js',
      format: 'umd',
      sourcemap: true
    },
    plugins: ROLLUP_PLUGIN_CONFIG
  },
  {
    input: './message/message.js',
    output: {
      name: 'Message',
      file: './message/message.min.js',
      format: 'umd',
      sourcemap: true
    },
    plugins: ROLLUP_PLUGIN_CONFIG
  }
]
