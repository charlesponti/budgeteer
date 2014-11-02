'use strict';

// Module dependencies
var React = require('react');

// Application dependencies
var AppConstants = require('../../constants/App');
var TaskStore = require('../../stores/TaskStore');
var AppDispatcher = require('../../dispatchers/App');

// Factories
var TaskForm = React.createFactory(require('./Form.jsx'));
var Preview = React.createFactory(require('./Preview.jsx'));

/**
 * Task Component
 */
var TaskListItem = React.createClass({

  propTypes: {
    task: React.PropTypes.object.isRequired
  },

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
    TaskStore.dispatch({
      action: AppConstants.TASK_UPDATE,
      data: this.props.task
    });
  },

  /**
   * Handle delete click
   * @param  {SyntheticEvent} e
   * @param  {string} id HTMLElement id
   */
  onDeleteClick: function(e, id) {
    TaskStore.dispatch({
      action: AppConstants.TASK_DESTROY,
      data: this.props.task
    });
  },

  /**
   * Handle edit click
   * @param  {SyntheticEvent} e
   * @param  {string} id HTMLElement id
   */
  onEditClick: function(e, id) {
    AppDispatcher.dispatch({
      action: AppConstants.TASK_UPDATE,
      data: {
        title: 'Edit Task',
        buttonText: 'Edit Task',
        children: <TaskForm task={this.props.task}/>,
        buttonEvent: AppConstants.TASK_SUBMIT
      }
    });

    TaskStore.dispatch({
      action: AppConstants.TASK_EDIT,
      data: this.props.task
    });
  },

  /**
   * Handle click
   * @param  {SyntheticEvent} e
   * @param  {string} id HTMLElement id
   */
  onClick: function(e, id) {
    if (e.target.classList.contains('list-group-item')) {
      this.setState({ showDescription: !this.state.showDescription });  
    }
  },

  render: function() {
    var task = this.props.task;
    return (
      <li className="list-group-item task-list-item" onClick={this.onClick}>
        <div>
          <input type="checkbox" className="task-checkbox"
            onClick={this.onCheckboxClick} defaultChecked={task.completed}/>
          <b>{task.title}</b>
        </div>
        <div className='task-actions'>
          <i onClick={this.onEditClick} className="fa fa-pencil" alt="Edit"></i>
          <i onClick={this.onDeleteClick} className="fa fa-remove" alt="Delete"></i>
        </div>
        <span className="task-category pull-right">{task.category}</span>
        {this.state.showDescription ? <Preview text={task.description}/> : null}
      </li>
    );
  }

});

module.exports = TaskListItem;
