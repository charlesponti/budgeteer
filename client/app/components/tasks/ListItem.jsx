'use strict';

// Module dependencies
var React = require('react');

// Application dependencies
var TaskStore = require('../../stores/TaskStore');
var AppDispatcher = require('../../dispatchers/App');
var TaskConstants = require('../../constants/TaskConstants');

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
      action: TaskConstants.UPDATE,
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
      action: TaskConstants.DESTROY,
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
      action: 'show-modal', 
      data: {
        title: 'Edit Task',
        buttonText: 'Edit Task',
        children: <TaskForm task={this.props.task}/>,
        buttonEvent: TaskConstants.UPDATE
      }
    });

    TaskStore.dispatch({
      action: TaskConstants.EDIT,
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
