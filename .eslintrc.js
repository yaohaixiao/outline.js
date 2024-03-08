/**
 * .eslintrc.js - eslint 配置
 * =============================================================
 * Created By: Yaohaixiao
 * Update: 2023.7.12
 */
module.exports = {
  root: true,
  // 环境定义了预定义的全局变量。
  env: {
    //环境定义了预定义的全局变量。更多在官网查看
    browser: true,
    node: true,
    commonjs: true,
    amd: true,
    es6: true,
    jest: true
  },
  extends: ['prettier', 'eslint:recommended', 'plugin:import/errors'],
  plugins: ['import', 'compat'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  // JavaScript 语言选项
  parserOptions: {
    // ECMAScript 版本
    ecmaVersion: 2020,
    // 设置为 "script" (默认) 或 "module"（如果你的代码是 ECMAScript 模块)。
    sourceType: 'module',
    // 想使用的额外的语言特性:
    ecmaFeatures: {
      // 允许在全局作用域下使用 return 语句
      globalReturn: false,
      impliedStrict: true,
      objectLiteralDuplicateProperties: false,
      modules: true
    }
  },
  settings: {
    'import/resolver': {
      jest: {
        jestConfigFile: './jest.config.js'
      }
    }
  },
  rules: {
    'compat/compat': 'error'
  }
}
