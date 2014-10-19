'use strict';

var Dispatcher = require('flux').Dispatcher;
var TaskConstants = require('../constants/TaskConstants');

/**
 * Create TaskDispatcher
 * @type {Dispatcher}
 */
var TaskDispatcher = new Dispatcher();

/**
 * Handle action from view
 * @param  {string} action Action taken place
 */
TaskDispatcher.handleViewAction = function(action) {
  this.dispatch({
    source: 'VIEW_ACTION',
    action: action
  })
};

module.exports = TaskDispatcher;
