var gulp = require('gulp');
const pug = require('gulp-pug');
const less = require('gulp-less');
const minifyCSS = require('gulp-csso');
const babel = require("gulp-babel");
var gls = require('gulp-live-server');

function css_processing() {
  return gulp.src('src/css/*.css')
        .pipe(minifyCSS())
        .pipe(gulp.dest('public/css'));
}

function less_processing(){
  return gulp.src('src/css/*.less')
        .pipe(less())
        .pipe(minifyCSS())
        .pipe(gulp.dest('public/css'));
}

function js_processing() { 
  return gulp.src('src/js/*.js', { sourcemaps: true })
    .pipe(babel())
    .pipe(gulp.dest('public/js', { sourcemaps: true })) // sourcemap??
}

function livereload(){
  var server = gls.new('server.js');
  server.start();

  //use gulp.watch to trigger server actions(notify, start or stop)
  gulp.watch(['src/**/*.css', 'src/**/*.less', 'src/**/*.js'], gulp.parallel(css_processing, less_processing, js_processing));
  gulp.watch(['server.js','routes.js'], function() {
    console.log("Reloading server");
    server.start.bind(server)()
    server.notify.apply(server);
  });

}
exports.default = gulp.parallel(css_processing, less_processing, js_processing);
exports.serve = gulp.series(gulp.parallel(css_processing, less_processing, js_processing),livereload);