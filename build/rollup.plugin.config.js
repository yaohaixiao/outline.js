import alias from '@rollup/plugin-alias'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { babel } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'
import path from 'path'

const ROLLUP_PLUGIN_CONFIG = [
  alias({
    entries: [
      {
        find: '@',
        replacement: path.resolve('./')
      }
    ]
  }),
  nodeResolve({
    mainFields: ['module', 'jsnext', 'main', 'browser']
  }),
  commonjs(),
  babel({ babelHelpers: 'bundled' }),
  terser()
]

export default ROLLUP_PLUGIN_CONFIG
