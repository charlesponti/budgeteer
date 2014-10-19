/** @jsx React.DOM */

'use strict';

var React = require('react');
var TaskForm = require('./Form.jsx');
var TaskList = require('./List.jsx');
var TaskStore = require('../../stores/TaskStore');

/**
 * Main view for the Tasks application
 */
var TaskApp = React.createClass({

  displayName: 'TaskApp',

  /**
   * Perform actions when componet will get mounted to the DOM
   */
  componentWillMount: function() {
    // Load Tasks from API
    TaskStore.load();
  },

  /**
   * Render view
   */
  render: function() {
    return (
      <div className="row">

        <h1 className="text-center"> Tasks </h1>

        <div className="col-sm-6" >
          <TaskList id='task-list' />
        </div>

        <div className="col-sm-6" >
          <TaskForm id='task-form' />
        </div>

      </div>
    )
  }

});

module.exports = TaskApp;
