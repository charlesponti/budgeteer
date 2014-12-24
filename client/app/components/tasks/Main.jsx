'use strict';

// Module dependencies
var React = require('react');

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
   * Set state to current state of TaskStore.models
   */
  getDefaultProps: function() {
    return {
      tasks: []
    };
  },

  /**
   * Render view
   * @return {ReactElement}
   */
  render: function() {
    return (
      <div className="row tasks">
        <br/>
        <TaskList className="task-list" id='task-list' tasks={this.props.tasks}/>
        <TaskAddButton/>
      </div>
    );
  }

});

module.exports = TaskMain;
