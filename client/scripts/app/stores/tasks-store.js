'use strict';

/**
 * Module dependencies
 * @type {[type]}
 */
var BaseStore = require('./base-store');

var TasksStore = BaseStore.new({

  url: 'tasks'

});

module.exports = TasksStore;
