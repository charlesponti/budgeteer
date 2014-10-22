'use strict';

/**
 * Module dependencies
 */
var _ = require('lodash');
var $ = require('jquery');
var App = require('../app.jsx');
var BaseStore = require('./BaseStore');
var request = require('superagent/superagent');
var TaskConstants = require('../constants/TaskConstants');
var TaskDispatcher = require('../dispatchers/TaskDispatcher');

/**
 * Store which will hold tasks
 * @requires module: lodash
 * @requires module: superagent/superagent
 * @requires module: ./BaseStore
 * @requires module: ../constants/TaskConstants
 * @requires module: ../dispatchers/TaskDispatcher
 */
var TaskStore = BaseStore.new({

  url: 'tasks',

  /**
   * Load tasks fro API
   */
  load: function() {
    $.get('/api/tasks')
      .then(function(response) {
        this._records = response.tasks;
        TaskDispatcher.dispatch({
          action: TaskConstants.LOADED,
          data: this._records
        });
      }.bind(this))
      .fail(function(err) {
        throw err;
      });
    return this;
  },

  /**
   * Send API request to create new task
   * @param  {object} data
   * @param  {string} data.title
   * @param  {string} data.description
   */
  create: function(data) {
    request
      .post('/api/tasks')
      .type('form')
      .send({
        title: data.title,
        description: data.description,
        _csrf: App.getCSRF()
      })
      .end(function(err, response) {
        if (err) {
          throw err;
        } else {
          this.add(response.body.task);
          TaskDispatcher.dispatch({
            action: TaskConstants.CREATED,
            data: this._records
          });
        }
      }.bind(this));
    return this;
  },

  destroy: function(data) {
    request
      .del('/api/tasks')
      .send({
        id: data._id, _csrf: App.getCSRF()
      })
      .end(function(err, response) {
        if (err) {
          throw err;
        } else {
          this.remove(response.body.task);
          TaskDispatcher.dispatch({
            action: TaskConstants.UPDATED,
            data: this._records
          });
        }
      }.bind(this));
    return this;
  },

  update: function(data) {
    request
      .put('/api/tasks')
      .type('form')
      .send({
        id: data._id,
        title: data.title,
        description: data.description,
        _csrf: App.getCSRF()
      })
      .end(this.onUpdateResponse.bind(this));
  },

  /**
   * Mark task as completed
   * @param {object} data
   * @return {TaskStore}
   */
  completed: function(data) {
    request
      .put('/api/tasks')
      .type('form')
      .send({
        id: data._id,
        completed: data.completed,
        _csrf: App.getCSRF()
      })
      .end(this.onUpdateResponse.bind(this));
  },

  /**
   * Handle success response from update requests
   */
  onUpdateResponse: function(err, response) {
    if (err) {
      throw err;
    } else {
      this.updateRecord(response.body.task);
      TaskDispatcher.dispatch({
        action: TaskConstants.UPDATED,
        data: this._records
      });
    }
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
      case TaskConstants.COMPLETED:
        TaskStore.completed(payload.data);
        break;
    }

    return true;
  })

});

module.exports = TaskStore;
