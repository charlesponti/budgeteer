'use strict';

// Module dependencies
var React = require('react');

// Application dependencies
var AppActions = require('../../actions/app');
var TaskStore = require('../../stores/TaskStore');

// Components
var TaskList = require('./List.jsx');
var TaskAddButton = require('./add-button.jsx');

/**
 * Main view for the Tasks application
 * @type {ReactCompositeComponent}
 */
var TaskMain = React.createClass({

  displayName: 'TaskMain',

  /**
   * Load TaskStore
   */
  componentWillMount: function() {
    TaskStore.load();
  },

  /**
   * Render view
   * @return {ReactElement}
   */
  render: function() {
    return (
      <div className="row tasks">
        <br/>
        <TaskList className="task-list" id='task-list' />
        <TaskAddButton/>
      </div>
    );
  }

});

module.exports = TaskMain;
