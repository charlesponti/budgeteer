'use strict';

// Application dependencies
var AppConstants = require('../constants/App');
var AppDispatcher = require('../dispatchers/App');

var AppActions = {};

AppActions.navigate = function(route) {
  AppDispatcher.dispatch({
    navigate: route
  });
};

module.exports = AppActions;
