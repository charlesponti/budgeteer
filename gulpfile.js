'use strict';

global.isProd = false;

var browserify = require('browserify');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var stylish = require('jshint-stylish');
var reactify = require('reactify');
var runSequence = require('run-sequence');
var source = require('vinyl-source-stream');

var files = {
  js: {
    source: 'client/app/**',
    tests: 'client/test/specs/**/*.js',
    main: './client/app/main.jsx'
  },
  css: {
    main: 'client/scss/main.scss',
    source: 'client/scss/**/*.scss'
  },
  backend: 'server/**/*.js'
};

/**
 * `build:js` task.
 * This task will bundle all of the client side scripts and place
 * the bundled file into `public/scripts/bundle.js`.
 */
gulp.task('build:js', function(done) {
  return browserify({
      entries: [files.js.main],
      debug: true,
      cache: {},
      packageCache: {},
      transform: [reactify]
    })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe($.if(global.isProd, $.streamify($.uglify())))
    .pipe(gulp.dest('public/js/'));
});

/**
 * `lint:client` task
 * Run JSHint over client-side Javascript files
 */
gulp.task('lint:client', function() {
  gulp.src('public/js')
    .pipe($.jshint())
    .pipe($.jshint.reporter(stylish));
});

/**
 * `lint:backend`
 * Run JSHint against server-side .js files
 */
gulp.task('lint:backend', function() {
  gulp.src(files.backend)
    .pipe($.jshint())
    .pipe($.jshint.reporter(stylish));
});

gulp.task('vendor', function() {
  // TODO Move needed bower_component files to public/vendor
});

gulp.task('images', function() {
  // TODO Process images and move them to public/images
});

/**
 * `build:css` task
 * Build CSS from .less files
 */
gulp.task('build:css', function() {
  gulp.src(files.css.main)
    .pipe($.sass())
    .pipe($.if(global.isProd, $.csso()))
    .pipe($.if(global.isProd, $.rename('main.min.css')))
    .pipe(gulp.dest('public/css'));
});

gulp.task('build', function() {
  return runSequence('build:css', 'build:js');
});

gulp.task('build:prod', function() {
  global.isProd = true;
  return runSequence('build');
});

gulp.task('serve', function() {
  process.env.NODE_ENV = 'development';
  var server = require('./server');
  server.start();
});

gulp.task('serve:prod', function() {
  process.env.NODE_ENV = 'production';
  var server = require('./server');
  server.start();
});

gulp.task('watch', function() {
  // Watch .less files
  gulp.watch(files.css.source, ['build:css']);

  // Watch client-side .js files
  gulp.watch(files.js.source, ['build:js']);

  // Watch server-side .js files
  gulp.src(files.backend, ['lint-backend']);
});

gulp.task('default', function() {
  return runSequence('build', 'watch', 'serve');
});
