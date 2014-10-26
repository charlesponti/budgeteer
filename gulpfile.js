'use strict';

var del = require('del');
var gulp = require('gulp');
var less = require('gulp-less');
var gutil = require('gulp-util');
var webpack = require('webpack');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');
var jsHint = require('gulp-jshint');
var rename = require('gulp-rename');
var stylish = require('jshint-stylish');
var concatinate = require('gulp-concat');

var sources = {
  js: {
    dir: './client/app/**/*.js',
    main: './client/app/main.js'
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

/**
 * `clean-scripts` task
 * Remove files from public/scripts directory
 * @param  {Function} done
 */
gulp.task('clean-scripts', function(done) {
  del(['./public/scripts'], done);
});

/**
 * `clean-styles` task
 * Remove files from public/styles directory
 * @param  {Function} done
 */
gulp.task('clean-styles', function(done) {
  del(['./public/styles'], done);
});

/**
 * `build-scripts` task.
 * This task will bundle all of the client side scripts and place
 * the bundled file into `public/scripts/bundle.js`.
 */
gulp.task('build-scripts', ['clean-scripts', 'lint-client'], function(done) {
  return webpack(require('./webpack.config'), function (err, stats) {
    
    if (err) {
      throw new gutil.PluginError('[build-js]', err);
    }

    done();
  });
});

/**
 * `lint-client` task
 * Run JSHint over client-side Javascript files
 */
gulp.task('lint-client', function() {
  return gulp.src(sources.js.dir)
      .pipe(jsHint())
      .pipe(jsHint.reporter(stylish));
});

/**
 * `lint-backend`
 * Run JSHint against server-side .js files
 */
gulp.task('lint-backend', function() {
  return gulp.src(sources.backend)
      .pipe(jsHint())
      .pipe(jsHint.reporter(stylish));
});

/**
 * `build-styles` task
 * Build CSS from .less files
 */
gulp.task('build-styles', ['clean-styles'], function() {
  return gulp.src(sources.styles.main)
      .pipe(less())
      .pipe(concatinate(sources.styles.build))
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

  // Watch server-side .js files
  gulp.src(sources.backend)
    .pipe(watch(sources.backend, ['lint-backend']));
});

gulp.task('build', [ 'build-styles',  'build-scripts' ]);
gulp.task('default', [ 'watch' ]);
