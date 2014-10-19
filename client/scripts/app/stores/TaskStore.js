'use strict';

/**
 * Module dependencies
 */
var BaseStore = require('./base-store');
var request = require('superagent/superagent');
var TaskConstants = require('../constants/TaskConstants');
var TaskDispatcher = require('../dispatchers/TaskDispatcher');

/**
 * Store which will hold tasks
 * @requires module: superagent/superagent
 * @requires module: BaseStore
 * @requires module: TaskConstants
 * @requires module: TaskDispatcher
 */
var TaskStore = BaseStore.new({

  url: 'tasks',

  add: function(task) {
    if (_.isArray(this._records)) {
      this._records.push(task);
    }

    return this._records;
  },

  load: function() {
    return request
      .get('/api/tasks')
      .end(function(err, response) {
        this._records = response.body.tasks;
        this.emit('loaded', this._records);
      }.bind(this));
  },

  /**
   * Send API request to create new task
   * @param  {object} data
   * @param  {string} data.title
   * @param  {string} data.description
   */
  create: function(data) {
    return request
        .post('/api/tasks')
        .send({
          title: data.title,
          description: data.description,
          _csrf: App.getCSRF()
        })
        .end(function(err, response) {
          debugger
          err = err || response.error;
          if (err) {
            return console.log(err);
          }
          TaskStore.add(response.body.task);
          TaskStore.emit('loaded');
        });
  },

  destroy: function(data) {
    return request
      .del('/api/tasks')
      .send({
        id: data._id, _csrf: App.getCSRF()
      })
      .end(function(err, response) {
        debugger;
      });
  },

  /**
   * Register dispatcher
   */
  dispatcherIndex: TaskDispatcher.register(function(payload) {

    switch (payload.action) {
      case TaskConstants.CREATE:
        TaskStore.create(payload.data);
        break;
      case TaskConstants.UPDATE:
        TaskStore.update(payload.data);
        break;
      case TaskConstants.DESTROY:
        TaskStore.destroy(payload.data);
        break;
    }

    return true;
  })

});

module.exports = TaskStore;
