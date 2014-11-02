'use strict';

// Module dependencies
var React = require('react');

// Application dependencies
var AppConstants = require('../../constants/App');
var TaskStore = require('../../stores/TaskStore');
var AppDispatcher = require('../../dispatchers/App');

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
      buttonText: 'Create Task' 
    };
  },

  /**
   * Handle form submission
   */
  onSubmit: function() {
    var event;

    if (this.state.task._id.length) {
      event = AppConstants.TASK_UPDATE_EXISTING;
    } else {
      event = AppConstants.TASK_CREATE_NEW;
    }
    
    AppDispatcher.dispatch({
      action: AppConstants[event],
      data: this.state.task
    });
  },

  /**
   * Handle logic when component is about to mount to DOM
   */
  componentWillMount: function() {
    AppDispatcher.register(this.dispatcherIndex);
  },

  /**
   * Create dispatcher
   * @param  {object} payload
   * @return {boolean}
   */
  dispatcherIndex: function(payload) {
    switch(payload.action) {
      case AppConstants.TASK_EDIT:
        this.setState({ task: payload.data, buttonText: 'Edit Task' });
        break;
      case AppConstants.TASK_SUBMIT:
        this.onSubmit();
        break;
      case AppConstants.TASK_CREATED:
      case AppConstants.TASK_UPDATED:
        this.setState(this.getInitialState());
        break;
    }
    return true;
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
      </form>
    )
  }

});

module.exports = TaskForm;
