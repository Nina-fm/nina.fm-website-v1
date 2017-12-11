var gulp = require('gulp');
var sass = require('gulp-sass');
var pi = require('pipe-iterators');

// Paths
var sass_dir = "sass";
var css_dir = ".";

// GULP
gulp.task('default', ['sass']);

gulp.task('watch', function () {
  gulp.watch(sass_dir+'/**/*.scss', ['sass']);
});

gulp.task('sass', function () {
  return gulp.src(sass_dir+'/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest(css_dir));
});
