'use strict';

module.exports = function(config) {
  config.set({

    browsers: [
      'Chrome'
    ],

    frameworks: [
      'browserify',
      'jasmine'
    ],

    files: [
      'client/test/**/*spec.js'
    ],

    preprocessors: {
      'client/test/**/*spec.js': ['browserify']
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
