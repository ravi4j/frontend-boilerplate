const eslint = require('gulp-eslint');
const sassLint = require('gulp-sass-lint');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require( 'gulp-postcss');
const autoprefixer = require('autoprefixer');
const path = require('path');
const gutil = require('gulp-util');
const execSync = require('child_process').execSync;
const gulp = require('gulp');
const mocha = require('gulp-mocha');
const runSequence = require('run-sequence');
const webpack = require('webpack-stream');
const babel = require('babel-register');

gulp.task('default', ['dev-server']);

gulp.task('dev-server', function (callback) {
    execSync(`node bin/dev-server.js`, {stdio: [0, 1, 2]});
    callback();
});

gulp.task('sass-lint', function () {
    gulp.src('./src/**/*.s+(a|c)ss')
        .pipe(sassLint())
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError());
});

gulp.task('lint', function () {
    return gulp.src(['./src/**/*.js'])
        .pipe(eslint({
            configFile: './.eslintrc'
        }))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('test', function() {
    return gulp.src(['test/*.js'])
      .pipe(mocha({
          reporter : 'nyan',
        compilers:babel
    }));
});

gulp.task('tdd', function () {
    return gulp.watch(['src/**/*.js', 'test/**/*.js'], ['test']);
});

gulp.task('tdd-single', function() {
    return gulp.watch('test/*.js')
      .on('change', function(file) {
        gulp.src(file.path)
          .pipe(mocha({
            reporter : 'nyan',
            compilers: babel
          }))
      });
  });

gulp.task('test:dev', ['tdd', 'test']);

gulp.task('autoprefixer', function () {
    const dest = gutil.env.dest || '';
    const destDir = path.join(dest, '/css');
    const destFile = path.join(destDir, '/styles.css');
    return gulp.src(destFile)
        .pipe(sourcemaps.init())
        .pipe(postcss([ autoprefixer({
            browsers: ['last 2 versions']
        })]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(destDir));
});