const path = require('path')
const gulp = require('gulp')
const clean = require('gulp-clean')
const connect = require('gulp-connect')
const eslint = require('gulp-eslint')
const os = require('os')
const open = require('gulp-open')
const pug = require('gulp-pug')
const less = require('gulp-less')
const LessAutoPrefix = require('less-plugin-autoprefix')
const autoprefixer = new LessAutoPrefix({ browsers: ['last 2 versions'] })
const cssmin = require('gulp-cssmin')
const rename = require('gulp-rename')
const sourcemaps = require('gulp-sourcemaps')
const run = require('gulp-run')
const watch = require('gulp-watch')

const SOURCE_PATH = ['./utils/**/*.js', './*.js']

/* ==================== 清理相关 gulp 任务 ==================== */
const cleanHtml = () => {
  return gulp
    .src('./docs/**/*.html', {
      allowEmpty: true
    })
    .pipe(clean())
}

const cleanStyle = () => {
  return gulp
    .src('./docs/css/*.css', {
      allowEmpty: true
    })
    .pipe(clean())
}

const cleanScript = () => {
  return gulp
    .src('./docs/js/docs.*.js', {
      allowEmpty: true
    })
    .pipe(clean())
}

const cleanDocs = gulp.parallel(cleanHtml, cleanStyle, cleanScript)

/* ==================== 代码规范校验相关的 gulp 任务 ==================== */
const lint = () => {
  return gulp
    .src(SOURCE_PATH)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError())
}

const check = () => {
  return run('npm run prettier:write').exec()
}

const test = gulp.series(lint, check)

/* ==================== 编译代码的 gulp 任务 ==================== */
const buildSourceStyles = () => {
  return gulp
    .src(
      [
        './src/theme/anchors.less',
        './src/theme/chapters.less',
        './src/theme/drawer.less',
        './src/theme/toolbar.less',
        './src/theme/outline.less'
      ],
      {
        allowEmpty: true
      }
    )
    .pipe(sourcemaps.init())
    .pipe(
      less({
        paths: [path.join(__dirname, 'less', 'includes')],
        plugins: [autoprefixer]
      })
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./'))
}

const minifySourcesStyle = () => {
  return gulp
    .src(
      [
        './anchors.css',
        './chapters.css',
        './drawer.css',
        './toolbar.css',
        './outline.css'
      ],
      {
        allowEmpty: true
      }
    )
    .pipe(sourcemaps.init())
    .pipe(cssmin())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./'))
}

const buildLibStyles = gulp.series(buildSourceStyles, minifySourcesStyle)

const buildScript = () => {
  return run('npm run build:lib').exec()
}

const buildApi = () => {
  return gulp
    .src([
      'api/pug/index.pug',
      'api/pug/relative.pug',
      'api/pug/sticky.pug',
      'api/pug/fixed.pug',
      'api/pug/flex.pug'
    ])
    .pipe(
      pug({
        verbose: true
      })
    )
    .pipe(gulp.dest('docs'))
}

const buildStyle = () => {
  return gulp
    .src(['./api/less/docs.less', './api/less/example.less'])
    .pipe(sourcemaps.init())
    .pipe(
      less({
        paths: [path.join(__dirname, 'less', 'includes')],
        plugins: [autoprefixer]
      })
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./docs/css'))
}

const minifyStyle = () => {
  return gulp
    .src('./docs/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(cssmin())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./docs'))
}

const buildApiStyle = gulp.series(buildStyle, minifyStyle)

const buildApiScript = () => {
  return run('npm run build:api:script').exec()
}

const buildDocs = gulp.series(
  cleanDocs,
  buildApi,
  buildApiStyle,
  buildApiScript
)

const build = gulp.series(test, cleanDocs, buildDocs)

/* ==================== 文档查看相关的 gulp 任务 ==================== */
const openDocs = () => {
  let browser
  if (os.platform() === 'darwin') {
    browser = os.platform() === 'linux' ? 'google-chrome' : 'google chrome'
  } else {
    browser = os.platform() === 'linux' ? 'google-chrome' : 'chrome'
  }
  return gulp.src('docs/index.html').pipe(
    open({
      app: browser,
      uri: 'http://localhost:8481'
    })
  )
}

const connectDocs = () => {
  return connect.server({
    root: 'docs',
    port: 8481,
    livereload: true
  })
}

const reload = () => {
  return connect.reload()
}

const start = gulp.series(build, connectDocs, openDocs)

/* ==================== 检测源代码变更相关的 gulp 任务 ==================== */
const watchSource = () => {
  return watch(
    ['**/*.(js|less)'],
    gulp.series(lint, buildScript, buildLibStyles)
  )
}

const watchApi = () => {
  return watch(['api/**/*.*'], gulp.series(buildDocs))
}

const watchDocs = () => {
  return watch('docs/**/*.*', {
    ignoreInitial: false
  }).pipe(reload())
}

const watchAll = gulp.parallel(watchSource, watchApi, watchDocs)

// 导出公共方法
module.exports.start = start
module.exports.clean = cleanDocs
module.exports.buildLibStyles = buildLibStyles
module.exports.buildApi = buildApi
module.exports.buildApiStyle = buildApiStyle
module.exports.build = build
module.exports.lint = lint
module.exports.check = check
module.exports.test = test
module.exports.watch = watchAll
