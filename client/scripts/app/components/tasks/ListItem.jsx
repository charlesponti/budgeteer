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
  _onDeleteClick: function(e, id) {
    TaskDispatcher.dispatch({
      action: TaskConstants.DESTROY,
      data: this.props.task
    });
  },

  render: function() {
    var task = this.props.task;

    return (
      <li className="list-group-item">
        <b>{task.title}</b>
        {/* <p>{task.description}</p> */}
        <button onClick={this._onDeleteClick} 
          className="btn btn-danger pull-right"> Delete </button>
      </li>
    )
  }

});

module.exports = TaskListItem;
