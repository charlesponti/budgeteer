'use strict';

// Module dependencies
var React = require('react');

// Application dependencies
var AppConstants = require('../../constants/App');
var TaskStore = require('../../stores/TaskStore');
var AppDispatcher = require('../../dispatchers/App');
var TaskActions = require('../../actions/TaskActions');

// Factories
var Modal = React.createFactory(require('../Modal.jsx'));
var TaskForm = React.createFactory(require('./Form.jsx'));
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
   * Handle delete click
   * @param  {SyntheticEvent} e
   * @param  {string} id HTMLElement id
   */
  onDeleteClick: function(e, id) {
    TaskActions.deleteTask(this.props.task);
  },

  /**
   * Handle edit click
   * @param  {SyntheticEvent} e
   * @param  {string} id HTMLElement id
   */
  onEditClick: function(e, id) {
    TaskActions.loadTaskForm({
      title: 'Edit Task',
      component: <TaskForm task={this.props.task}/>
    });
  },

  /**
   * Handle click
   * @param  {SyntheticEvent} e
   * @param  {string} id HTMLElement id
   */
  onTitleClick: function(e, id) {
    TaskActions.openTask({
      title: this.props.task.title,
      component: <Preview text={this.props.task.description}/>
    });
  },

  render: function() {
    var task = this.props.task;
    return (
      <li className="list-group-item task-list-item">
        <div>
          <input type="checkbox" className="task-checkbox"
            onClick={this.onCheckboxClick} defaultChecked={task.completed}/>
          <b onClick={this.onTitleClick}>{task.title}</b>
        </div>
        <div className='task-actions'>
          <i onClick={this.onEditClick} className="fa fa-pencil" alt="Edit"></i>
          <i onClick={this.onDeleteClick} className="fa fa-remove" alt="Delete"></i>
        </div>
        <span className="task-category pull-right">{task.category}</span>
      </li>
    );
  }

});

module.exports = TaskListItem;
