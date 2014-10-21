'use strict';

var React = require('react');
var TaskConstants = require('../../constants/TaskConstants');
var TaskDispatcher = require('../../dispatchers/TaskDispatcher');

var TaskForm = React.createClass({

  /**
   * Handle form submission
   * @param  {SyntheticEvent} e Event object
   * @param  {String} id Id of form
   */
  handleSubmit: function(e, id) {
    e.preventDefault();
    var form = this.getDOMNode();
    TaskDispatcher.dispatch({
      action: TaskConstants.CREATE,
      data: {
        title: form.title.value,
        description: form.description.value
      }
    });
  },

  /**
   * Render component
   */
  render: function() {
    return (
      <form onSubmit={this.handleSubmit} role="form">
        <div className="form-group">
          <label htmlFor="title"> Title </label>
          <input className="form-control" name="title" />
        </div>
        <div className="form-group">
          <label htmlFor="title"> Description </label>
          <input className="form-control" name="description" />
        </div>
        <button className="btn btn-success">Create Task</button>
      </form>
    );
  }

});

module.exports = TaskForm;
