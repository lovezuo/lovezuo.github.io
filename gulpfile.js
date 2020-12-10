//导入模块
let {src,dest,watch} = require('gulp');
let sass = require('gulp-sass');
let cssnano = require('gulp-cssnano');
let rename = require('gulp-rename');
let uglify = require('gulp-uglify');
let babel = require('gulp-babel');
let htmlmin = require('gulp-htmlmin');
let imagemin = require('gulp-imagemin');

//创建任务
//复制index.html
function fnCopyIndex(){
    return src('./src/index.html')
    .pipe(dest('./dist'));
}
//css
function fnCSS(){
    return src('./src/sass/*.scss')
    // .pipe(sass())
    .pipe(sass({outputStyle : 'expanded'}))
    // .pipe(cssnano())
    .pipe(rename({suffix : '.min'}))
    .pipe(dest('./dist/css'));
}
//js
function fnJS(){
    return src('./src/js/*.js')
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(rename({suffix : '.min'}))
    .pipe(dest('./dist/js'));
}
//img
function fnImg(){
    return src('./src/img/*')
    .pipe(imagemin())
    .pipe(dest('./dist/img'))
}
//pape
function fnPage(){
      return src('./src/pages/*.html')
      .pipe(htmlmin())
      .pipe(dest('./dist/pages')); 
}
//watch
function fnWatch(){
    watch('./src/index.html',fnCopyIndex);
    watch('./src/sass/*.scss',fnCSS);
    watch('./src/js/*.js',fnJS);
    watch('./src/pages/*.html',fnPage);
}
//导出模块
exports.copyIndex = fnCopyIndex;
exports.css = fnCSS;
exports.js = fnJS;
exports.img = fnImg;
exports.page = fnPage;
exports.default = fnWatch;