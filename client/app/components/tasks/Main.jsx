'use strict';

// Module dependencies
var React = require('react');

// Application dependencies
var BackboneMixin = require('../../mixins/backbone');
var AppActions = require('../../actions/app');
var TaskStore = require('../../stores/tasks');

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
  getInitialState: function() {
    return {
      tasks: TaskStore.models
    };
  },

  /**
   * Load TaskStore
   */
  componentWillMount: function() {
    TaskStore.on('set reset sync', this.onTaskStoreChange);
    return TaskStore.fetch();
  },

  /**
   * Set state to current state of TaskStore.models
   */
  onTaskStoreChange: function() {
    return this.setState({
      tasks: TaskStore.models
    });
  },

  /**
   * Render view
   * @return {ReactElement}
   */
  render: function() {
    return (
      <div className="row tasks">
        <br/>
        <TaskList className="task-list" id='task-list' tasks={this.state.tasks}/>
        <TaskAddButton/>
      </div>
    );
  }

});

module.exports = TaskMain;
