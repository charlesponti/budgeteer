"use strict";

/**
 * Module dependencies
 */
var fs = require('fs');
var path = require('path');

/**
 * Current Node environment
 * @type {String}
 */
var env = process.env.NODE_ENV;

/**
 * Get path configuraiton file. Configuration file must be named after Node
 * environment
 * @type {String}
 */
var config = require('./environments/'+env);

/**
 * Attach key-values in configuration file to process.env
 */
Object.keys(config).forEach(function(key) {
  process.env[key] = config[key];
});

/**
 * Export application environment configuration
 * @type {Object}
 */
module.exports = config;
