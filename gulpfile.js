'use strict';

var gulp = require('gulp');
var less = require('gulp-less');
var gutil = require('gulp-util');
var watch = require('gulp-watch');
var jsHint = require('gulp-jshint');
var concat = require('gulp-concat');
var notify = require('gulp-notify');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var stylish = require('jshint-stylish');
var source = require('vinyl-source-stream');

var sources = {
  js: {
    dir: './client/app/**/*.js',
    tests: './client/test/specs/**/*.js',
    main: './client/app/main.jsx'
  },
  styles: {
    main: './client/styles/main.less',
    all: './client/styles/**/*.less',
    build: 'main.css',
    minified: 'main.min.css',
    buildDirectory: 'public/styles'
  },
  backend: [
    './server/**/*.js'
  ]
};

var webpackCallback = function (done, err, stats) {
  if (err) {
    throw new gutil.PluginError('[build-js]', err);
  }
  done();
};

/**
 * `build-scripts` task.
 * This task will bundle all of the client side scripts and place
 * the bundled file into `public/scripts/bundle.js`.
 */
gulp.task('build-client', ['lint-client'], function(done) {
  var bundler = browserify({
    entries: [sources.js.main],
    debug: true,
    cache: {},
    packageCache: {}
  });
  bundler.transform(reactify);
  return bundler
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./public/scripts/'));
});

/**
 * `lint-client` task
 * Run JSHint over client-side Javascript files
 */
gulp.task('lint-client', function() {
  gulp.src(sources.js.dir)
    .pipe(jsHint())
    .pipe(jsHint.reporter(stylish));
});

/**
 * `lint-backend`
 * Run JSHint against server-side .js files
 */
gulp.task('lint-backend', function() {
  gulp.src(sources.backend)
    .pipe(jsHint())
    .pipe(jsHint.reporter(stylish));
});

/**
 * `build-styles` task
 * Build CSS from .less files
 */
gulp.task('build-styles', function() {
  gulp.src(sources.styles.main)
    .pipe(less())
    .pipe(concat(sources.styles.build))
    .pipe(gulp.dest(sources.styles.buildDirectory));
});

/**
 * Watch for file changes
 */
gulp.task('watch', function() {
  // Watch .less files
  gulp.src(sources.styles.all)
    .pipe(watch('client/styles/**/*.less', ['build-styles']));

  // Watch client-side .js files
  gulp.src(sources.js.dir)
    .pipe(watch('client/app/**/*', ['build-client']));

  // Watch server-side .js files
  gulp.src(sources.backend)
    .pipe(watch(sources.backend, ['lint-backend']));
});

gulp.task('build', [ 'build-styles',  'build-client' ]);
gulp.task('default', [ 'watch' ]);
