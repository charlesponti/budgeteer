'use strict';

var del = require('del');
var gulp = require('gulp');
var less = require('gulp-less');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');
var jsHint = require('gulp-jshint');
var rename = require('gulp-rename');
var html = require('html-browserify');
var browserify = require('browserify');
var stylish = require('jshint-stylish');
var concatinate = require('gulp-concat');
var source = require('vinyl-source-stream');

var sources = {
  js: {
    dir: './client/scripts/**/*.js',
    main: './client/scripts/main.js'
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

gulp.task('clean-scripts', function(done) {
  del(['./public/scripts'], done);
});

gulp.task('clean-styles', function(done) {
  del(['./public/styles'], done);
});

gulp.task("jshint", function(done) {
  var stream = gulp.src(sources.js.dir)
      .pipe(jsHint())
      .pipe(jsHint.reporter(stylish));
  stream.on('end', function() {
    done();
  });
});

/**
 * `scripts` task.
 * This task will bundle all of the client side scripts and place
 * the bundled file into `public/scripts/bundle.js`.
 */
gulp.task('scripts', ['clean-scripts'], function() {
  // build bundle
  return browserify(sources.js.main)
    .transform('jstify')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('public/scripts/'));
});

/**
 * `bundle-tests` task
 * This task will bundle the client-side tests.
 */
gulp.task('bundle-tests', function() {
  return browserify('./client/test/specs/main.js')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./client/test/'));
});

gulp.task('lint-backend', function() {
  return gulp.src(sources.backend)
      .pipe(jsHint())
      .pipe(jsHint.reporter(stylish))
      .pipe(uglify());
});

// Build CSS from Less files
gulp.task('styles', ['clean-styles'], function(done) {
  var stream = gulp.src(sources.styles.main)
      .pipe(less())
      .pipe(concatinate(sources.styles.build))
      .pipe(gulp.dest(sources.styles.buildDirectory));
  stream.on('end', function() {
    done();
  });
});

// Watch for file changes
gulp.task('watch', function(done) {
  gulp.src(sources.styles.all).pipe(watch({
    glob: 'client/styles/**/*.less'
  }, function() {
    gulp.start('styles');
  }));

  gulp.src(sources.js.dir).pipe(watch({
    glob: 'client/scripts/**/*.js'
  }, function() {
    gulp.start('scripts');
  }));

  gulp.src(sources.backend).pipe(watch({
    glob: sources.backend
  }, function() {
    gulp.start('lint-backend');
  }));
});

gulp.task('build', [ 'styles', 'scripts' ]);
gulp.task('default', ['lint-backend', 'watch', 'build' ]);
