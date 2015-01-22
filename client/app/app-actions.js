'use strict';

// Application dependencies
var AppConstants = require('./app-constants');
var AppDispatcher = require('./app-dispatcher');

var AppActions = {};

AppActions.navigate = function(route) {
  AppDispatcher.dispatch({
    navigate: route
  });
};

AppActions.loadModal = function(data) {
  AppDispatcher.dispatch({
    action: AppConstants.OPEN_MODAL,
    data: data
  });
};

AppActions.closeModal = function() {
  AppDispatcher.dispatch({
    action: AppConstants.CLOSE_MODAL
  });
};

AppActions.updateCategory = function(category) {
  AppDispatcher.dispatch({
    action: AppConstants.CATEGORY_UPDATE,
    data: category
  });
};

AppActions.createCategory = function(category) {
  AppDispatcher.dispatch({
    action: AppConstants.CATEGORY_CREATE,
    data: category
  });
};

AppActions.deleteCategory = function(category) {
  AppDispatcher.dispatch({
    action: AppConstants.CATEGORY_DESTROY,
    data: category
  });
};

AppActions.updateTask = function(task) {
  AppDispatcher.dispatch({
    action: AppConstants.TASK_UPDATE,
    data: task
  });
};

AppActions.createTask = function(task) {
  AppDispatcher.dispatch({
    action: AppConstants.TASK_CREATE,
    data: task
  });
};

AppActions.deleteTask = function(task) {
  AppDispatcher.dispatch({
    action: AppConstants.TASK_DESTROY,
    data: task
  });
};

module.exports = AppActions;
