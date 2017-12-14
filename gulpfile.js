var gulp = require('gulp');
var sass = require('gulp-sass');
var pi = require('pipe-iterators');
var inject = require('gulp-inject');

// Paths
var sass_dir = "sass";
var css_dir = ".";

// GULP
gulp.task('default', ['sass', 'index']);

gulp.task('build', ['sass', 'index']);

gulp.task('watch', function () {
  gulp.watch(sass_dir+'/**/*.scss', ['sass', 'index']);
});

gulp.task('sass', function () {
  return gulp.src(sass_dir+'/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest(css_dir));
});

gulp.task('index', function () {
    var target = gulp.src('./index.html');
    var timestamp = new Date().getTime();

    // It's not necessary to read the files (will speed up things), we're only after their paths:
    var sources = gulp.src(['./env.js', './js/*.js', './*.css', './css/*.css'], {read: false}, {relative: true});

    return target.pipe(inject(sources, {addSuffix: '?v='+timestamp}))
        .pipe(gulp.dest('.'));
});
