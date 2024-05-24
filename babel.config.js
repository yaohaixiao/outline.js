/**
 * babel.config.js - Babel 工程配置
 * =============================================================
 * Created By: Yaohaixiao
 * Update: 2023.2.27
 */
module.exports = {
  presets: [['@babel/preset-env']],
  plugins: [
    '@babel/plugin-transform-optional-chaining',
    '@babel/plugin-transform-spread',
    '@babel/plugin-transform-object-rest-spread'
  ],
  assumptions: {
    arrayLikeIsIterable: true
  }
}
