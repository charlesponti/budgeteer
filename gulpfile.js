'use strict';

// Dependencies
var config = require('./gulp/config');
var buffer = require('vinyl-buffer');
var gulp = require('gulp');
var psi = require('psi');
var runSequence = require('run-sequence');
var $ = require('gulp-load-plugins')();
var watchify = require('watchify');

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

// Lint and build source JavaScript files
gulp.task('js', require('./gulp/browserify'));

// Build CSS files
gulp.task('css', function() {
  var stream = gulp.src(config.css.main);

  stream
    .pipe(!isProd ? $.sourcemaps.init({ loadMaps: true }) : $.util.noop())
    .pipe($.less())
    .pipe(!isProd ? $.sourcemaps.write() : $.util.noop())
    .pipe($.size({ title: 'CSS' }))
    .pipe(gulp.dest(config.css.dest));

  return stream;
});

// Optimize Images
gulp.task('images', function() {
  return gulp.src(['src/images/**/*'])
    .pipe(gulp.dest('dist/images'));
});


gulp.task('watch', function() {
  gulp.watch(config.css.source, ['css']);
});

// Build development assets
gulp.task('build', function() {
  return runSequence(['images'], ['js', 'css' ]);
});

// Build development assets and serve
gulp.task('default', function() {
  if (isWatching) {
    return runSequence(['build'], 'watch');
  }
  return runSequence('build');
});
