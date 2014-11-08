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

AppActions.loadModal = function(data) {
  AppDispatcher.dispatch({
    action: AppConstants.SHOW_MODAL,
    data: data
  });
};

module.exports = AppActions;
