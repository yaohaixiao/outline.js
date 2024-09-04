const path = require('path')
const gulp = require('gulp')
const clean = require('gulp-clean')
const connect = require('gulp-connect')
const pug = require('gulp-pug')
const less = require('gulp-less')
const LessAutoPrefix = require('less-plugin-autoprefix')
const autoprefixer = new LessAutoPrefix({ browsers: ['last 2 versions'] })
const cssmin = require('gulp-cssmin')
const rename = require('gulp-rename')
const sourcemaps = require('gulp-sourcemaps')
const run = require('gulp-run')

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

/* ==================== 编译代码的 gulp 任务 ==================== */
const buildLibOutlineStyle = () => {
  return gulp
    .src(['./outline.less'], {
      allowEmpty: true
    })
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

const minifyLibOutlineStyle = () => {
  return gulp
    .src(['./outline.css'], {
      allowEmpty: true
    })
    .pipe(sourcemaps.init())
    .pipe(cssmin())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./'))
}

const buildLibComponentStyle = (component) => {
  return () => {
    return gulp
      .src([`./${component}/${component}.less`], {
        allowEmpty: true
      })
      .pipe(sourcemaps.init())
      .pipe(
        less({
          paths: [path.join(__dirname, 'less', 'includes')],
          plugins: [autoprefixer]
        })
      )
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(`./${component}`))
  }
}

const minifyLibComponentStyle = (component) => {
  return () => {
    return gulp
      .src([`./${component}/${component}.css`], {
        allowEmpty: true
      })
      .pipe(sourcemaps.init())
      .pipe(cssmin())
      .pipe(rename({ suffix: '.min' }))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(`./${component}`))
  }
}

const buildLibStyle = gulp.series(
  buildLibComponentStyle('anchors'),
  buildLibComponentStyle('drawer'),
  buildLibComponentStyle('message'),
  buildLibComponentStyle('navigator'),
  buildLibComponentStyle('reader'),
  buildLibComponentStyle('toolbar'),
  minifyLibComponentStyle('anchors'),
  minifyLibComponentStyle('drawer'),
  minifyLibComponentStyle('message'),
  minifyLibComponentStyle('navigator'),
  minifyLibComponentStyle('reader'),
  minifyLibComponentStyle('toolbar'),
  buildLibOutlineStyle,
  minifyLibOutlineStyle
)

const buildDocs = () => {
  return gulp
    .src(['api/pug/index.pug'])
    .pipe(
      pug({
        verbose: true
      })
    )
    .pipe(gulp.dest('docs'))
}

const buildExamples = () => {
  return gulp
    .src([
      'api/pug/examples/relative.pug',
      'api/pug/examples/sticky.pug',
      'api/pug/examples/fixed.pug',
      'api/pug/examples/flex.pug'
    ])
    .pipe(
      pug({
        verbose: true
      })
    )
    .pipe(gulp.dest('docs/examples'))
}

const buildDocsStyle = () => {
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

const minifyDocsStyle = () => {
  return gulp
    .src(['./docs/**/docs.css', './docs/**/example.css'])
    .pipe(sourcemaps.init())
    .pipe(cssmin())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./docs'))
}

const buildApiStyle = gulp.series(buildDocsStyle, minifyDocsStyle)

const buildApiScript = () => {
  return run('npm run build:api:script').exec()
}

const buildApi = gulp.series(
  cleanDocs,
  buildDocs,
  buildExamples,
  buildApiStyle,
  buildApiScript
)

/* ==================== 文档查看相关的 gulp 任务 ==================== */
const connectDocs = () => {
  return connect.server({
    root: 'docs',
    port: 8481,
    livereload: true
  })
}

const start = gulp.series(buildApi, connectDocs)

// 导出公共方法
module.exports.start = start
module.exports.clean = cleanDocs
module.exports.buildLibStyle = buildLibStyle
module.exports.buildDocs = buildDocs
module.exports.buildExamples = buildExamples
module.exports.buildApiScript = buildApiScript
module.exports.buildApiStyle = buildApiStyle
module.exports.buildApi = buildApi
