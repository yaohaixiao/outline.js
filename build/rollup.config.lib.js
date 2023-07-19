import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'

const PLUGIN_CONFIG = [
  nodeResolve({
    mainFields: ['module', 'jsnext', 'main', 'browser']
  }),
  commonjs(),
  terser()
]

export default [
  // For full functions module
  {
    input: 'src/outline.js',
    output: {
      name: 'Outline',
      file: './outline.min.js',
      format: 'umd',
      sourcemap: true
    },
    plugins: PLUGIN_CONFIG
  },
  {
    input: 'src/anchors.js',
    output: {
      name: 'Anchors',
      file: './anchors.min.js',
      format: 'umd',
      sourcemap: true
    },
    plugins: PLUGIN_CONFIG
  },
  {
    input: 'src/chapters.js',
    output: {
      name: 'Chapters',
      file: './chapters.min.js',
      format: 'umd',
      sourcemap: true
    },
    plugins: PLUGIN_CONFIG
  },
  {
    input: 'src/drawer.js',
    output: {
      name: 'Drawer',
      file: './drawer.min.js',
      format: 'umd',
      sourcemap: true
    },
    plugins: PLUGIN_CONFIG
  },
  {
    input: 'src/toolbar.js',
    output: {
      name: 'Toolbar',
      file: './toolbar.min.js',
      format: 'umd',
      sourcemap: true
    },
    plugins: PLUGIN_CONFIG
  },
  // build for documentation
  {
    input: 'src/outline.js',
    output: {
      name: 'Outline',
      file: './docs/js/outline.min.js',
      format: 'umd',
      sourcemap: true
    },
    plugins: PLUGIN_CONFIG
  }
]
