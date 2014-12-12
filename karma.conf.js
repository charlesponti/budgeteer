'use strict';

module.exports = function(config) {
  config.set({

    browsers: [
      'Chrome'
    ],

    frameworks: [
      'jasmine'
    ],

    files: [
      'client/test/**/*spec.js'
    ],

    preprocessors: {
      'client/test/**/*spec.js': ['webpack']
    },

    webpack: {
      resolve: {
        modulesDirectories: ['bower_components', 'node_modules']
      }
    },

    webpackServer: {
      noInfo: true
    },

    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      require('karma-webpack')
    ]

  });
};
