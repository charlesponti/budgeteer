'use strict';

// Module dependencies
var React = require('react');

// Application dependencies
var TaskStore = require('../../stores/TaskStore');
var TaskActions = require('../../actions/TaskActions');

// Components
var TaskForm = React.createFactory(require('./Form.jsx'));
var TaskList = React.createFactory(require('./List.jsx'));

/**
 * Main view for the Tasks application
 * @type {ReactElement}
 */
var TaskMain = React.createClass({

  displayName: 'TaskMain',

  /**
   * Perform actions when component will get mounted to the DOM
   */
  componentWillMount: function() {
    TaskStore.load();
  },

  onAddClick: function() {
    TaskActions.addTask({
      title: 'Create Task',
      component: <TaskForm />
    });
  },

  /**
   * Render view
   */
  render: function() {
    return (
      <div className="row">

        <h1 className="col-xs-12 col-md-10 col-md-offset-1 text-center"> 
          Tasks
          <i onClick={this.onAddClick} className="fa fa-plus pull-right"></i>
        </h1>

        <div className="col-xs-12 col-md-10 col-md-offset-1 task-list">
          <TaskList id='task-list' />
        </div>

      </div>
    );
  }

});

module.exports = TaskMain;
