'use strict';

// Module dependencies
var _ = require('lodash');

// Application dependencies
var BaseStore = require('./BaseStore');
var service = require('../service/api');
var AppActions = require('../actions/app');
var AppConstants = require('../constants/app');
var AppDispatcher = require('../dispatchers/app');

var TaskModel = require('../models/task');

/**
 * Store which will hold tasks
 * @requires module: lodash
 * @requires module: ./BaseStore
 * @requires module: ../service/api
 * @requires module: ../constants/appConstants
 */
var TaskStore = BaseStore.extend({

  url: '/api/tasks',

  model: TaskModel,

  parse: function(response) {
    return response.tasks;
  }

});

/**
 * Handle events dispatched and received
 * @param  {object} payload
 * @return {boolean}
 */
TaskStore.dispatcherIndex = function(payload) {

  switch (payload.action) {
    case AppConstants.TASK_CREATE:
      TaskStore.create(payload.data);
      break;
    case AppConstants.TASK_UPDATE:
      TaskStore.update(payload.data);
      break;
    case AppConstants.TASK_DESTROY:
      TaskStore.destroy(payload.data);
      break;
  }

  return true;
};

// Register event handler
TaskStore.dispatchToken = AppDispatcher.register(TaskStore.dispatcherIndex);

TaskStore = new TaskStore();

module.exports = TaskStore;
