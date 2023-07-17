/**
 * jest.config.js - jest 配置
 * =============================================================
 * Created By: Yaohaixiao
 * Update: 2023.3.31
 */
module.exports = {
  moduleFileExtensions: ['js'],
  testMatch: ['**/tests/**/*.spec.(js)'],
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^esm/(.*)$': '<rootDir>/esm/$1'
  },
  collectCoverage: true,
  coverageDirectory: 'report/coverage',
  reporters: [
    'default',
    [
      './node_modules/jest-html-reporter',
      {
        pageTitle: 'subscribers.js 单测报告',
        outputPath: 'report/unit-test/index.html',
        includeFailureMsg: true
      }
    ]
  ]
}
