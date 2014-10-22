'use strict';

var React = require('react');
var Preview = require('./Preview.jsx');
var TaskConstants = require('../../constants/TaskConstants');
var TaskDispatcher = require('../../dispatchers/TaskDispatcher');

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
    this.props.task.completed = !this.props.task.completed;
    TaskDispatcher.dispatch({
      action: TaskConstants.COMPLETED,
      data: this.props.task
    });
  },

  /**
   * Handle delete click
   * @param  {SyntheticEvent} e
   * @param  {string} id HTMLElement id
   */
  onDeleteClick: function(e, id) {
    TaskDispatcher.dispatch({
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
    TaskDispatcher.dispatch({
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
      <li className="list-group-item" onClick={this.onClick}>
        <input type="checkbox" className="task-checkbox"
          onClick={this.onCheckboxClick} defaultChecked={task.completed}/>
        <b>{task.title}</b>
        {/* <p>{task.description}</p> */}
        <i onClick={this.onDeleteClick}
          className="fa fa-remove pull-right" alt="Delete"></i>
        <i onClick={this.onEditClick}
          className="fa fa-pencil pull-right" alt="Edit"></i>
        {this.state.showDescription ? <Preview text={task.description}/> : null}
      </li>
    );
  }

});

module.exports = TaskListItem;
