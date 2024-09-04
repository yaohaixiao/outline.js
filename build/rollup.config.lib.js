import getRollupPluginConfig from './rollup.plugin.config'

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
    plugins: getRollupPluginConfig('outline')
  },
  {
    input: './anchors/anchors.js',
    output: {
      name: 'Anchors',
      file: './anchors/anchors.min.js',
      format: 'umd',
      sourcemap: true
    },
    plugins: getRollupPluginConfig('anchors')
  },
  {
    input: './navigator/navigator.js',
    output: {
      name: 'Navigator',
      file: './navigator/navigator.min.js',
      format: 'umd',
      sourcemap: true
    },
    plugins: getRollupPluginConfig('navigator')
  },
  {
    input: './drawer/drawer.js',
    output: {
      name: 'Drawer',
      file: './drawer/drawer.min.js',
      format: 'umd',
      sourcemap: true
    },
    plugins: getRollupPluginConfig('drawer')
  },
  {
    input: './reader/reader.js',
    output: {
      name: 'Reader',
      file: './reader/reader.min.js',
      format: 'umd',
      sourcemap: true
    },
    plugins: getRollupPluginConfig('reader')
  },
  {
    input: './toolbar/toolbar.js',
    output: {
      name: 'Toolbar',
      file: './toolbar/toolbar.min.js',
      format: 'umd',
      sourcemap: true
    },
    plugins: getRollupPluginConfig('toolbar')
  },
  {
    input: './message/message.js',
    output: {
      name: 'Message',
      file: './message/message.min.js',
      format: 'umd',
      sourcemap: true
    },
    plugins: getRollupPluginConfig('message')
  }
]
