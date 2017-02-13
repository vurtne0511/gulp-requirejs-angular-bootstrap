'use strict';

// gulp 基础包 和 gulp常用插件包
const gulp = require('gulp');

const header = require('gulp-header');
const footer = require('gulp-footer');

const less = require('gulp-less');
const sourcemaps = require('gulp-sourcemaps');
const cleanCss = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const concat = require('gulp-concat');

const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const assign = require('lodash.assign');
const es = require('event-stream');

const notify = require('gulp-notify');

// const gzip = require('gulp-gzip');
// const pngquant = require('imagemin-pngquant');

let handlerError = () => {

    let args = Array.prototype.slice.call(arguments);

    notify.onError({ title: 'compile error', message: '<%=error.message %>' }).apply(this, args);

    this.emit(); //提交
};

// 重命名插件，例如 js 压缩时文件名改为 *.min.js 等
const rename = require('gulp-rename');
const del = require('del');

// 浏览器自动刷新依赖
const nodemon = require('gulp-nodemon');
const browserSync = require('browser-sync').create();

let reload = browserSync.reload;

const path = require('path');

// 读取配置文件
const config = require('./config');


// 目录定义
let basePath = './';
let dist = path.join(basePath, (config.gulp.path || {}).dist || 'dist');
let src = path.join(basePath, (config.gulp.path || {}).src || 'src');

// 文件目录
let filepath = {
    'libs': ['bower_components/**/*'],
    'css': path.join(src, 'css/**/*.css'),
    'js': path.join(src, 'js/**/*.js'),
    'less': path.join(src, 'less/**/*.less'),
    'sass': path.join(src, 'sass/**/*.scss'),
    'image': path.join(src, 'image/**/*'),
    'view': [path.join(src, '**/*.html'), '!' + path.join(src, 'libs/**/*.html')]
};

// 编译文件内容
let lessFiles = ['less/style.less', 'less/login.less', 'less/themes/*.theme.less'];

// 编译less
gulp.task('less', ['libs'], () =>
    gulp.src(lessFiles.map((file) => path.join(src, file)))
        .pipe(less())
        .on('error', handlerError)
        .pipe(gulp.dest(path.join(src, 'css')))
);


gulp.task('less-quick', () =>
    // 将你的默认的任务代码放在这
    gulp.src(lessFiles.map((file) => path.join(src, file)))
        .pipe(less())
        .on('error', handlerError)
        // .pipe(sourcemaps.write('./'))  // 输出sourcemap
        .pipe(gulp.dest(path.join(src, 'css')))
        .pipe(browserSync.stream())
);



// 打包第三方包
gulp.task('libs', () =>
    gulp.src(filepath.libs)
        .pipe(gulp.dest(path.join(src, 'libs')))
);


// 服务器监听
gulp.task('dev-server', () => {

    nodemon({
        script: 'app.js',
        ignore: [
            '.vscode',
            '.idea',
            'bower_components/',
            'src/',
            'dist/',
            'private/',
            'gulpfile.js'
        ],
        env: { 'NODE_ENV': 'localhost' }
    });

    browserSync.init(null, {
        proxy: 'http://localhost:' + config.port,
        files: [filepath.css, filepath.js, filepath.view],
        notify: false,
        open: false,
        port: config.gulp.browserSync.port
    });
});

// 编译
gulp.task('build', ['less', 'libs']);

// 监听
gulp.task('watch', () => {
    gulp.watch(filepath.less, ['less-quick']);
});
// 开发模式
gulp.task('dev', ['dev-server', 'build', 'watch']);

// 清理缓存
gulp.task('cleanCache', cb => cache.clearAll(cb));

// 清空发布目录
gulp.task('clean', ['cleanCache'], cb => del([path.join(dist, '**/*')], cb));


// 发布流程:html
gulp.task('release:html', () =>
    gulp.src(filepath.view)
        .pipe(htmlmin({
            //清除HTML注释
            removeComments: true,

            //压缩HTML
            collapseWhitespace: true,

            //删除所有空格作属性值 <input id="" /> ==> <input />
            removeEmptyAttributes: true,

            //压缩页面JS
            minifyJS: true,

            //压缩页面CSS
            minifyCSS: true
        }))
        .pipe(gulp.dest(dist))
);

// 发布流程:style
gulp.task('release:style', ['build'], () =>
    gulp.src(filepath.css)
        .pipe(cleanCss({ keepSpecialComments: 1 }))
        .pipe(gulp.dest(path.join(dist, 'css')))
);

// 发布流程:js
gulp.task('release:javascript', () =>
    gulp.src(filepath.js)
        .pipe(uglify())
        // .pipe(gzip()) //不需要处理
        .pipe(gulp.dest(path.join(dist, 'js')))
);

// 发布流程:前端第三方库
gulp.task('release:libs', ['libs'], () =>
    gulp.src(path.join(src, 'libs/**/*'))
        .pipe(gulp.dest(path.join(dist, 'libs')))
);

// 发布流程:图片处理
gulp.task('release:images', () =>
    gulp.src(path.join(src, 'images/**/*'))
        .pipe(gulp.dest(path.join(dist, 'images')))
);

// 发布任务list
let releaseTasks = [
    'release:html',
    'release:style',
    'release:javascript',
    'release:libs',
    'release:images',
    'build'
];

// 发布
gulp.task('release', releaseTasks);