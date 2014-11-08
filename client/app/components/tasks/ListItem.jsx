'use strict';

// Module dependencies
var React = require('react');

// Application dependencies
var TaskActions = require('../../actions/TaskActions');

// Factories
var Preview = React.createFactory(require('./Preview.jsx'));

/**
 * Task Component
 * @type {ReactElement}
 */
var TaskListItem = React.createClass({

  propTypes: {
    task: React.PropTypes.object.isRequired
  },

  /**
   * Get initial state of component
   * @return {object}
   */
  getInitialState: function() {
    return { showDescription: false };
  },

  /**
   * Handle checkbox click
   * @param  {SyntheticEvent} e
   * @param  {string} id HTMLElement id
   */
  onCheckboxClick: function() {
    // Negate 'completed' attribute of task
    this.props.task.completed = !this.props.task.completed;
    
    // Dispatch event
    TaskActions.updateTask(this.props.update);
  },

  /**
   * Handle click
   * @param  {SyntheticEvent} e
   * @param  {string} id HTMLElement id
   */
  onTitleClick: function(e, id) {
    TaskActions.openTask({
      title: this.props.task.title,
      component: <Preview task={this.props.task}/>
    });
  },

  render: function() {
    var task = this.props.task;
    return (
      <li className="list-group-item task-list-item">
        <div>
          <input type="checkbox" className="task-checkbox"
            onClick={this.onCheckboxClick} defaultChecked={task.completed}/>
          <h4 onClick={this.onTitleClick}>{task.title}</h4>
        </div>
        <span className="task-category pull-right">{task.category}</span>
      </li>
    );
  }

});

module.exports = TaskListItem;
