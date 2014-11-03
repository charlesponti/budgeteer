'use strict';

// Application dependencies
var AppConstants = require('../constants/App');
var AppDispatcher = require('../dispatchers/App');

var TaskActions = {};

TaskActions.updateTask = function(task) {
  AppDispatcher.dispatch({
    action: AppConstants.TASK_UPDATE,
    data: task
  });
};

TaskActions.createTask = function(task) {
  AppDispatcher.dispatch({
    action: AppConstants.TASK_CREATE,
    data: task
  });
};

TaskActions.deleteTask = function(task) {
  AppDispatcher.dispatch({
    action: AppConstants.TASK_DESTROY,
    data: task
  });
};

TaskActions.loadTaskForm = function(data) {
  AppDispatcher.dispatch({
    action: AppConstants.SHOW_MODAL,
    data: data
  });
};

TaskActions.openTask = function(data) {
  AppDispatcher.dispatch({
    action: AppConstants.SHOW_MODAL,
    data: data
  });
};

module.exports = TaskActions;
