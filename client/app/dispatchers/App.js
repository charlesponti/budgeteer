'use strict';

var Dispatcher = require('flux').Dispatcher;

// Create instance of Dispatcher
var AppDispatcher = new Dispatcher();

/**
 * Dispatch event for api actions
 * @param {String|Object} action
 */
AppDispatcher.handleAPIAction = function(action) {
  this.dispatch({
    source: 'API_ACTION',
    action: action
  });
};

/**
 * Dispatch event for view actions
 * @param {String|Object} action
 */
AppDispatcher.handleViewAction = function(action) {
  this.dispatch({
    source: 'VIEW_ACTION',
    action: action
  });
};

module.exports = AppDispatcher;
