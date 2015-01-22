'use strict';

global.isProd = false;

var browserify = require('browserify');
var forever = require('forever-monitor');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var reactify = require('reactify');
var runSequence = require('run-sequence');
var source = require('vinyl-source-stream');
var stylish = require('jshint-stylish');

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
    .pipe($.sass({
      sourceComments: global.isProd ? 'none' : 'map',
      sourceMap: 'sass',
      outputStyle: global.isProd ? 'compressed' : 'nested',
      precision: 10,
      onError: console.error.bind(console, 'Sass error:')
    }))
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

/**
 * @desc Start Forever
 * @param  {String} env  NODE_ENV
 * @param  {Array} args Arguments to pass to Forever CLI
 */
function server(env, args) {
  var child = new (forever.Monitor)('./index.js', {
    max: 3,
    silent: false,
    args: args,
    env: {
      'NODE_ENV': env
    }
  });

  child.on('exit', function () {
    console.log('Backpack has exited after 3 restarts');
  });

  child.start();
}

gulp.task('serve', server.bind(null, 'development', ['-w']));

gulp.task('serve:prod', server.bind(null, 'production', []));

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
