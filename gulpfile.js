const { src, dest, parallel, watch, series } = require('gulp'),
    concat = require('gulp-concat'),
    scss = require("gulp-sass")(require("node-sass")),
    pug = require('gulp-pug'),
    browserSync = require('browser-sync').create()

const FilesPath = {
    scssFiles: 'scss/*.scss',
    htmlFiles: 'pug/pages/*.pug'
}

const { scssFiles, htmlFiles } = FilesPath;

function scssTask() {
    return src(scssFiles).pipe(scss()).pipe(concat('style.css')).pipe(dest('./dist/css')).pipe(browserSync.stream());
}

function htmlTask() {
    return src(htmlFiles).pipe(pug({ pretty: true })).pipe(dest('./dist')).pipe(browserSync.stream());
}

function assetsTask() {
    return src('assets/**/*').pipe(dest('dist/assets'))
}

function serve() {
    browserSync.init({ server: { baseDir: './dist' } });
    watch("scss/**/*.scss", scssTask);
    watch("pug/**/*.pug", htmlTask);
}

exports.scss = scssTask;
exports.html = htmlTask;
exports.assets = assetsTask;
exports.default = series(parallel(htmlTask, scssTask, assetsTask));
exports.serve = series(serve, parallel(htmlTask, scssTask, assetsTask));