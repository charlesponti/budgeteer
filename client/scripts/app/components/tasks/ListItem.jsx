'use strict';

var React = require('react');
var TaskConstants = require('../../constants/TaskConstants');
var TaskDispatcher = require('../../dispatchers/TaskDispatcher');

var TaskListItem = React.createClass({

  propTypes: {
    task: React.PropTypes.object.isRequired
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

  render: function() {
    var task = this.props.task;

    return (
      <li className="list-group-item">
        <b>{task.title}</b>
        {/* <p>{task.description}</p> */}
        <i onClick={this.onDeleteClick}
          className="fa fa-remove pull-right" alt="Delete"></i>
        <i onClick={this.onEditClick}
          className="fa fa-pencil pull-right" alt="Edit"></i>
      </li>
    );
  }

});

module.exports = TaskListItem;
