'use strict';

module.exports = {
  js: {
    entry: './client/src/js/main.js',
    source: 'client/src/js/**/*.js',
    dest: 'client/dist/js'
  },
  css: {
    main: './client/src/less/main.less',
    source: 'client/src/less/**/*.less',
    dest: 'client/dist/css'
  }
};
