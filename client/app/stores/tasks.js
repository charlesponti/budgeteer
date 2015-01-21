'use strict';

// Module dependencies
var _ = require('lodash');
var Backbone = require('backbone');

// Application dependencies
var TaskModel = require('../models/task');
var AppActions = require('../actions/app');
var AppConstants = require('../constants/app');
var AppDispatcher = require('../dispatchers/app');

/**
 * Store which will hold tasks
 * @requires module: lodash
 * @requires module: ./BaseStore
 * @requires module: ../constants/appConstants
 */
var TaskStore = Backbone.Collection.extend({

  url: '/api/tasks',

  model: TaskModel,

  parse: function(response) {
    return response.data;
  },

  update: function(task) {
    return;
  },

  destroy: function(task) {
    return;
  }

});

TaskStore = new TaskStore();

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

module.exports = TaskStore;
