'use strict';

var React = require('react');
var TaskStore = require('../../stores/TaskStore');
var AppDispatcher = require('../../dispatchers/App');
var TaskConstants = require('../../constants/TaskConstants');

var TaskForm = React.createClass({

  /**
   * Get initial state of component
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
    var event = this.state.task._id.length ? 'UPDATE' : 'CREATE';
    TaskStore.dispatch({
      action: TaskConstants[event],
      data: this.state.task
    });
  },

  /**
   * Handle logic when component is about to mount to DOM
   */
  componentWillMount: function() {
    AppDispatcher.register(this.appDispatcherIndex);
    TaskStore.register(this.dispatcher);
  },

  appDispatcherIndex: function(payload) {
    switch(payload.action) {
      case TaskConstants.UPDATE:
        this.onSubmit();
        break;
    }
    return true;
  },

  /**
   * Create dispatcher
   * @param  {object} payload
   * @return {boolean}
   */
  dispatcher: function(payload) {
    switch(payload.action) {
      case TaskConstants.EDIT:
        this.setState({ task: payload.data, buttonText: 'Edit Task' });
        break;
      case TaskConstants.CREATED:
      case TaskConstants.UPDATED:
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
