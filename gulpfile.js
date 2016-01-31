'use strict';

// Dependencies
var buffer = require('vinyl-buffer');
var gulp = require('gulp');
var psi = require('psi');
var runSequence = require('run-sequence');
var $ = require('gulp-load-plugins')();
var watchify = require('watchify');
var babelify = require('babelify');
var browserify = require('browserify');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');
var notify = require('gulp-notify');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');

/**
 * If gulp tasks should be run in 'production' mode
 * @return {Boolean}
 */
var isProd = $.util.env.prod;
var isWatching = $.util.env.watch;

var bower = function(path) { return 'bower_components/'+path; };

// Run Pagespeed Insights on mobile
gulp.task('pagespeed:mobile', function(done) {
  return psi.output(config.deploySite, {
    nokey: 'true',
    strategy: 'mobile'
  }, done);
});

// Run Pagespeed Insights on mobile
gulp.task('pagespeed:desktop', function(done) {
  return psi.output(config.deploySite, {
    nokey: 'true',
    strategy: 'desktop'
  }, done);
});

// Run Pagespeed Insights on both mobile and desktop
gulp.task('pagespeed', function() {
  return runSequence('pagespeed:mobile', 'pagespeed:desktop');
});
