'use strict';

module.exports = function(config) {
  config.set({

    basePath: '../../',

    browsers: [
      'Chrome'
    ],

    frameworks: [
      'browserify',
      'jasmine'
    ],

    files: [
      'client/js/main.jsx',
      'test/client/**/*spec.js'
    ],

    preprocessors: {
      'client/js/main.jsx': ['browserify'],
      'test/client/**/*spec.js': ['browserify']
    },

    browserify: {
      debug: true,
      transform: ['reactify'],
      extensions: ['.js','.jsx']
    },

    plugins: [
      'karma-jasmine',
      'karma-browserify',
      'karma-chrome-launcher'
    ]

  });
};
