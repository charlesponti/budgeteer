
var babelify = require('babelify');
var browserify = require('browserify');
var config = require('./config');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');
var notify = require('gulp-notify');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');
var watchify = require('watchify');
var isProd = gutil.env.prod;

module.exports = function() {
  var bundler = browserify({
    entries: config.js.entry,
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true
  });

  if (gutil.env.watch) {
    bundler = watchify(bundler);
    bundler.on('update', function() {
      rebundle();
    });
  }

  const transforms = [
    babelify
  ];

  transforms.forEach(function(transform) {
    bundler.transform(transform);
  });

  bundler.on('bytes', function(bytes) {
    var whichSize = 0;
    const sizes = ['bytes', 'kb', 'mb'];

    if (bytes > 1000) {
      bytes = bytes / 1000;
      whichSize = 1;
    }

    if (bytes > 1000) {
      bytes = bytes / 1000;
      whichSize = 2;
    }

    return gutil.log(
      gutil.colors.magenta('Bundle'),
      'is',
      gutil.colors.magenta(bytes, sizes[whichSize])
    );
  });

  bundler.on('time', function(time) {
    return gutil.log(
      gutil.colors.magenta('Bundle'),
      'completed in',
      gutil.colors.magenta(time+' milliseconds')
    );
  });

  function rebundle() {
    gutil.log('Rebundle...');

    return bundler.bundle()
      .on('error', function(error) {
        if (!isProd) {
          const args = Array.prototype.slice.call(arguments);

          // Send error to notification center with gulp-notify
          notify.onError({
            title: 'Compile Error',
            message: '<%= error.message %>'
          }).apply(this, args);

          // Keep gulp from hanging on this task
          this.emit('end');
        }
        else {
          // Log the error and stop the process
          // to prevent broken code from building
          console.log(error);
          process.exit(1);
        }
      })
      .pipe(source('main.js'))
      .pipe(gulpif(isProd, streamify(uglify({
        compress: {drop_console: true}
      }))))
      .pipe(gulp.dest(config.js.dest));
  }

  return rebundle();
};
