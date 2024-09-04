import alias from '@rollup/plugin-alias'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { babel } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'
import postcss from 'rollup-plugin-postcss'
import cssnano from 'cssnano'
import less from 'less'
import path from 'path'

const getRollupPluginConfig = (name, isApi = false) => {
  const dirPath = name === 'outline' ? './' : `./${name}`

  return [
    alias({
      entries: [
        {
          find: '@',
          replacement: path.resolve('./')
        }
      ]
    }),
    postcss({
      extract: isApi ? false : path.resolve(dirPath, `${name}.css`),
      // 将 CSS 提取到一个单独的文件
      extensions: ['.less'],
      plugins: [
        // 使用 cssnano 进行压缩
        cssnano()
      ],
      process: (context) => {
        return new Promise((resolve, reject) => {
          less.render(context, (err, result) => {
            if (err) {
              reject(err)
            } else {
              resolve(result.css)
            }
          })
        })
      }
    }),
    nodeResolve({
      mainFields: ['module', 'jsnext', 'main', 'browser']
    }),
    commonjs(),
    babel({ babelHelpers: 'bundled' }),
    terser()
  ]
}

export default getRollupPluginConfig
