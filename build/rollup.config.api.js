import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'

const PLUGIN_CONFIG = [
  nodeResolve({
    mainFields: [
      'module',
      'jsnext',
      'main',
      'browser'
    ]
  }),
  commonjs(),
  terser()
]

export default [
  // For api docs IIFE
  {
    input: 'api/js/main.js',
    output: {
      file: 'docs/js/docs.min.js',
      format: 'iife',
      sourcemap: true
    },
    plugins: PLUGIN_CONFIG
  }
]
