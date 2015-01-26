'use strict';

global.isProd = false;

var aliasify = require('aliasify');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var reactify = require('reactify');
var runSequence = require('run-sequence');
var source = require('vinyl-source-stream');
var stylish = require('jshint-stylish');

var files = {
  js: {
    source: ['client/**', 'components/**'],
    main: './client/main.jsx'
  },
  css: {
    main: 'scss/main.scss',
    source: 'scss/**/*.scss'
  },
  backend: 'server/**/*.js'
};

/**
 * `build:js` task.
 * This task will bundle all of the client side scripts and place
 * the bundled file into `static/scripts/bundle.js`.
 */
gulp.task('build:js', function(done) {
  return browserify({
      entries: [files.js.main],
      debug: true,
      cache: {},
      packageCache: {},
      transform: [reactify, aliasify]
    })
    .bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe($.if(global.isProd, $.uglify()))
    .pipe($.if(global.isProd, $.rename('main.min.js')))
    .pipe($.size({ title: 'JS' }))
    .pipe(gulp.dest('static/js'));
});

/**
 * `lint:client` task
 * Run JSHint over client-side Javascript files
 */
gulp.task('lint:client', function() {
  gulp.src('static/js')
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
  gulp.src([
      'bower_components/es5-shim/es5-shim.min.js',
      'bower_components/highcharts/highcharts-all.js'
    ])
    .pipe(gulp.dest('static/vendor'));
});

gulp.task('images', function() {
  // TODO Process images and move them to static/images
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
    .pipe($.size({ title: 'CSS' }))
    .pipe(gulp.dest('static/css'));
});

/**
 * @desc Start Forever
 * @param  {String} env  NODE_ENV
 * @param  {Boolean} watch Whether or not Forever should watch for file changes
 */
function server(env) {
  return $.nodemon({
    script: 'server/index.js',
    verbose: true,
  	watch: [
  		"server/**",
  		"components/**",
  	],
  	env: {
  		NODE_ENV: env
  	},
  	ext: "js jsx json",
  });
}

gulp.task('serve', server.bind(null, 'development'));

gulp.task('serve:prod', server.bind(null, 'production'));

gulp.task('watch', function() {
  // Watch .less files
  gulp.watch(files.css.source, ['build:css']);

  // Watch client-side .js files
  gulp.watch(files.js.source, ['build:js']);

  // Watch server-side .js files
  gulp.src(files.backend, ['lint-backend']);
});

gulp.task('build', function() {
  return runSequence(
    'vendor',
    'build:css',
    'build:js'
  );
});

gulp.task('build:prod', function() {
  global.isProd = true;
  return runSequence('build');
});

gulp.task('start:dev', function() {
  return runSequence('build', 'watch', 'serve');
});

gulp.task('default', ['start:dev']);
