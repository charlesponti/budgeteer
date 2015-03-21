'use strict'

global.isProd = false

var babelify = require('babelify');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var del = require('del');
var gulp = require('gulp');
var runSequence = require('run-sequence');
var source = require('vinyl-source-stream');
var $ = require('gulp-load-plugins')();

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
gulp.task('build:js', function() {
  gulp.src('client/nav.js')
    .pipe($.uglify())
    .pipe($.rename('nav.min.js'))
    .pipe(gulp.dest('static/js'));

  return browserify({ debug: true })
    .transform(babelify)
    .require(files.js.main, { entry: true })
    .bundle()
    .on('error', $.util.log)
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe($.if(global.isProd, $.uglify()))
    .pipe($.if(global.isProd, $.rename('main.min.js')))
    .pipe($.size({ title: 'JS' }))
    .pipe(gulp.dest('static/js'));
});

gulp.task('vendor', function() {
  gulp.src([
    'bower_components/fontawesome/css/font-awesome.min.css',
    'bower_components/es5-shim/es5-shim.min.js',
    'bower_components/highcharts/highcharts-all.js'
  ])
    .pipe(gulp.dest('static/vendor'));
});

gulp.task('fonts', function() {
  gulp.src([
    'bower_components/fontawesome/fonts/fontawesome-webfont.eot',
    'bower_components/fontawesome/fonts/fontawesome-webfont.ttf',
    'bower_components/fontawesome/fonts/fontawesome-webfont.woff'
  ])
    .pipe(gulp.dest('static/fonts'));
});

gulp.task('images', function() {
  // TODO Process images and move them to static/images
})

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
      "components/**"
    ],
    env: {
      NODE_ENV: env
    },
    ext: "js jsx json"
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

gulp.task('clean', function(done) {
  return del('static/**', done);
});

gulp.task('build', function() {
  return runSequence(
    ['clean'],
    ['vendor'],
    ['fonts'],
    ['build:css', 'build:js']
  );
});

gulp.task('build:prod', function() {
  global.isProd = true;
  return runSequence('build');
});

gulp.task('start:dev', function() {
  return runSequence(['build'], ['watch'], 'serve');
});

gulp.task('default', ['start:dev']);
