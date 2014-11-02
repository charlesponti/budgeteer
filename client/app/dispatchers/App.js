'use strict';

var Dispatcher = require('flux').Dispatcher;

// Create instance of Dispatcher
var AppDispatcher = new Dispatcher();

AppDispatcher.handleAPIAction = function(action) {
  this.dispatch({
    source: 'API_ACTION',
    action: action
  });
};

// Convenience method to handle dispatch requests
AppDispatcher.handleViewAction = function(action) {
  this.dispatch({
    source: 'VIEW_ACTION',
    action: action
  });
};

module.exports = AppDispatcher;
