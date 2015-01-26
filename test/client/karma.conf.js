'use strict';

module.exports = function(config) {
  config.set({

    basePath: '../../',

    browsers: [
      'Chrome'
    ],

    frameworks: [
      'browserify',
      'jasmine',
      'fixture'
    ],

    files: [
      { pattern: 'test/client/fixtures/**' },
      'client/main.jsx',
      'test/client/**/*spec.js'
    ],

    preprocessors: {
      '**/*.html': ['html2js'],
      'client/main.jsx': ['browserify'],
      'test/client/**/*spec.js': ['browserify']
    },

    browserify: {
      debug: true,
      transform: ['reactify'],
      extensions: ['.jsx']
    },

    plugins: [
      'karma-fixture',
      'karma-jasmine',
      'karma-browserify',
      'karma-chrome-launcher',
      'karma-html2js-preprocessor'
    ]

  });
};
