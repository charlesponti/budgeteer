'use strict';

// Module dependencies
var React = require('react');

// Application dependencies
var AppConstants = require('../../constants/App');
var TaskStore = require('../../stores/TaskStore');
var AppDispatcher = require('../../dispatchers/App');
var TaskActions = require('../../actions/TaskActions');

/**
 * TaskForm Component
 * @type {ReactElement}
 */
var TaskForm = React.createClass({

  /**
   * Get initial state of component
   * @return {object}
   */
  getInitialState: function() {
    return { 
      task: this.props.task || { _id: '', title: '', description: '' },
      buttonText: this.props.task ? 'Edit Task' : 'Create Task'
    };
  },

  /**
   * Handle change to form fields
   * @param  {SyntheticEvent} e
   * @param  {String} id
   */
  handleChange: function(e, id) {
    var form = this.getDOMNode();
    this.setState({
      task: {
        _id: form.id.value,
        title: form.title.value,
        description: form.description.value,
        category: form.category.value || 'default'
      }
    });
  },

  onSubmit: function(e, id) {
    e.preventDefault();
    if (this.state.task._id.length) {
      TaskActions.updateTask(this.state.task);
    } else {
      TaskActions.createTask(this.state.task);
    }
  },

  /**
   * Render component
   */
  render: function() {
    var task = this.state.task;
    return (
      <form onSubmit={this.onSubmit} role="form">
        <input type="hidden" name="id" value={task._id} />
        <div className="form-group">
          <label htmlFor="title"> Title </label>
          <input className="form-control"
            name="title" onChange={this.handleChange} value={task.title}/>
        </div>
        <div className="form-group">
          <label htmlFor="title"> Description </label>
          <textarea className="form-control"
            name="description"
            onChange={this.handleChange}
            value={task.description} />
        </div>
        <div className="form-group">
          <select name="category" className="form-control" onChange={this.handleChange}>
            <option value="default"> Default </option>
            <option value="work"> Work </option>
            <option value="personal"> Personal </option>
          </select>
        </div>
        <button className="pull-right btn btn-success">
          {this.state.buttonText}
        </button>
      </form>
    )
  }

});

module.exports = TaskForm;
