'use strict';

var gulp = require('gulp');
var less = require('gulp-less');
var gutil = require('gulp-util');
var webpack = require('webpack');
var watch = require('gulp-watch');
var jsHint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var concat = require('gulp-concat');

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
gulp.task('build-scripts', ['lint-client'], function(done) {
  webpack(require('./webpack.dev'), webpackCallback.bind(this, done));
});

/**
 * `build-client-prod` task.
 * This task will bundle all of the client side scripts and place
 * the bundled file into `public/scripts/bundle.prod.js`.
 */
gulp.task('build-client-prod', function(done) {
  webpack(require('./webpack.prod'), webpackCallback.bind(this, done));
});

/**
 * `build-client-test` task.
 * This task will bundle all of the client side test scripts and place
 * the bundled file into `client/test/bundle.js`.
 */
gulp.task('build-client-test', function(done) {
  webpack(require('./webpack.test'), webpackCallback.bind(this, done));
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
    .pipe(watch('client/app/**/*', ['build-scripts']));

  // Watch client-side tests
  gulp.src(sources.js.tests)
    .pipe(watch('client/test/specs/*', ['build-client-test']));

  // Watch server-side .js files
  gulp.src(sources.backend)
    .pipe(watch(sources.backend, ['lint-backend']));
});

gulp.task('build', [ 'build-styles',  'build-scripts' ]);
gulp.task('default', [ 'watch' ]);
