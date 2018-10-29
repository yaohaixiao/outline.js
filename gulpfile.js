const gulp = require('gulp')
const pump = require('pump')
const pug = require('gulp-pug')
const babel = require('gulp-babel')
const umd = require('gulp-umd')
const eslint = require('gulp-eslint')
const csslint = require('gulp-csslint')
const uglify = require('gulp-uglify')
const cssmin = require('gulp-cssmin')
const rename = require('gulp-rename')
const sourcemaps = require('gulp-sourcemaps')
const autoprefixer = require('gulp-autoprefixer')
const connect = require('gulp-connect')
const watch = require('gulp-watch')
const clean = require('gulp-clean')

const SRC_JS_PATH = 'src/js/articleoutline.js'
const DIST_JS_PATH = 'dist/articleoutline.js'
const SRC_CSS_PATH = 'src/css/articleoutline.css'

/* ==================== 清理相关的任务 ==================== */
// 清空 docs 目录下的所有文件
gulp.task('clean:docs', (cb) => {
    pump(
        [
            gulp.src('docs/**/*.*'),
            clean({force: true})
        ],
        cb
    )
})

// 清空 dist 目录下的所有文件
gulp.task('clean:dist', (cb) => {
    pump(
        [
            gulp.src('dist/**/*.*'),
            clean({force: true})
        ],
        cb
    )
})

// 清空任务
gulp.task('clean', [
    'clean:docs',
    'clean:dist'
])


/* ==================== API 文档构建相关的任务 ==================== */
// 创建 API 文档 HTTP 服务
gulp.task('connect', () => {
    connect.server({
        root: 'docs',
        livereload: true
    });
})

// 生成 API 文档的 HTML 文件
gulp.task('pug', (cb) => {
    pump(
        [
            gulp.src('src/pug/index.pug'),
            pug({
                verbose: true
            }),
            gulp.dest('docs')
        ],
        cb
    )
})


/* ==================== 文件复制相关的任务 ==================== */
// 复制 API 文档字体图标相关的资源
gulp.task('copy:fonts:dist', (cb) => {
    pump(
        [
            // 拷贝字体文件
            gulp.src('src/css/fonts/*.*'),
            gulp.dest('dist/css/fonts')
        ],
        cb
    )
})

// 复制 API 文档字体图标相关的资源
gulp.task('copy:fonts:docs', (cb) => {
    pump(
        [
            // 拷贝字体文件
            gulp.src('src/css/fonts/*.*'),
            gulp.dest('docs/css/fonts')
        ],
        cb
    )
})

// 复制 API 文档的 CSS 文件
gulp.task('copy:css', (cb) => {
    pump(
        [
            gulp.src('src/css/docs.css'),
            gulp.dest('docs/css')
        ],
        cb
    )
})

// 复制任务
gulp.task('copy', [
    'copy:fonts:dist',
    'copy:fonts:docs',
    'copy:css'
])


/* ==================== 源代码编码规范校验相关的任务 ==================== */
// 使用 ESLint 校验 src/js/outline.js 的编码规范
gulp.task('lint:js', (cb) => {
    pump(
        [
            gulp.src(SRC_JS_PATH),
            eslint(),
            // eslint.format() outputs the lint results to the console.
            // Alternatively use eslint.formatEach() (see Docs).
            eslint.format(),
            // To have the process exit with an error code (1) on
            // lint error, return the stream and pipe to failAfterError last.
            eslint.failOnError()
        ],
        cb
    )
})

// 使用 CSSLint 校验 outline.css 文件的代码规范
gulp.task('lint:css', (cb) => {
    pump(
        [
            gulp.src(SRC_CSS_PATH),
            csslint('csslintrc.json'),
            csslint.formatter()
        ],
        cb
    )
})

// 校验任务
gulp.task('lint', [
    'lint:js',
    'lint:css'
])


/* ==================== 编译 src/js/outline.js 相关的任务 ==================== */
// 使用 babel 将源代码 ES6 语法转化成适合浏览器使用的 ES5 语法，并使其符合 UMD 规范
gulp.task('transform', (cb) => {
    pump(
        [
            gulp.src(SRC_JS_PATH),
            babel(),
            // gives streaming vinyl file object
            umd({
                exports: function () {
                    return 'ArticleOutline'
                },
                namespace: function () {
                    return 'ArticleOutline'
                }
            }),
            gulp.dest('dist'),
            gulp.dest('docs/js'),
            sourcemaps.init({
                loadMaps: true
            }),
            uglify(),
            rename({suffix: '.min'}),
            sourcemaps.write('./'),
            gulp.dest('dist')
        ],
        cb
    )
})

/* ==================== 编译 src/css/outline.css ==================== */
// 用 autoperfixer 将部分需要添加前缀的属性，自动生成浏览器兼容的写法
// 将未压缩的代码复制到 docs/css 目录下，然后压缩 outline.css 源代码，
// 将压缩后的代码输出到 dist/css 目录翔，并生成 source map 文件
gulp.task('uglify:css', (cb) => {
    pump(
        [
            gulp.src(SRC_CSS_PATH),
            sourcemaps.init({
                loadMaps: true
            }),
            autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            }),
            gulp.dest('dist/css'),
            gulp.dest('docs/css'),
            cssmin(),
            rename({suffix: '.min'}),
            sourcemaps.write('./'),
            gulp.dest('dist/css')
        ],
        cb
    )
})

/* ==================== 监听文件变化相关的 ==================== */
// 监听 outline.js 代码变化
gulp.task('watch:js', () => {
    // 监视 src/js/outline.js，编译并压缩源代码
    gulp.watch(SRC_JS_PATH, [
        'transform'
    ])
})

// 监听 pug 文件变化，生成新的 API 文档 HTML 文件
gulp.task('watch:pug', () => {
    gulp.watch('src/pug/**/*.pug', [
        'pug'
    ])
})

// 监听 css 文件变化
gulp.task('watch:src:css', () => {
    // 监视 src/css/outline.css 文件变化, 压缩后复制 dist/css 目录下
    gulp.watch([
        'src/css/outline.css'
    ], [
        'uglify:css'
    ])
})


gulp.task('watch:docs:css', () => {
    // 监视 src/css/outline.css 文件变化, 压缩后复制 dist/css 目录下
    gulp.watch([
        'src/css/docs.css'
    ], [
        'copy:css'
    ])
})

gulp.task('watch:docs', () => {
    // 监视 src/css/docs.css 文件变化，并复制到 docs/css 目录下
    gulp.watch([
        'docs/**/*.*'
    ], () => {
        connect.reload()
    })
})

// 监听任务
gulp.task('watch', [
    'watch:js',
    'watch:pug',
    'watch:src:css',
    'watch:docs:css',
    'watch:docs'
])


/* ==================== 项目的相关主任务 ==================== */
// 编译压缩代码
gulp.task('build', [
    'lint:js',
    'transform',
    'uglify:css'
])

// 启动开发环境
gulp.task('dev', [
    'connect',
    'pug',
    'copy',
    'build',
    'watch'
])

// 开发环境任务的别名
gulp.task('start', [
    'dev'
])

// 默认任务，针对生产环境，只监听文件变化编译JS源代码
gulp.task('default', [
    'build',
    'watch:js',
    'watch:src:css'
])
