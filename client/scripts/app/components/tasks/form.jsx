'use strict';

var React = require('react');
var TaskConstants = require('../../constants/TaskConstants');
var TaskDispatcher = require('../../dispatchers/TaskDispatcher');

var TaskForm = React.createClass({

  /**
   * Get initial state of component
   */
  getInitialState: function() {
    return { 
      task: { title: '', description: '' },
      buttonText: 'Create Task' 
    };
  },

  /**
   * Handle form submission
   * @param  {SyntheticEvent} e Event object
   * @param  {String} id Id of form
   */
  onSubmit: function(e, id) {
    e.preventDefault();
    var event = this.state.task._id ? 'UPDATE' : 'CREATE';
    TaskDispatcher.dispatch({
      action: TaskConstants[event],
      data: this.state.task
    });
  },

  componentWillMount: function() {
    TaskDispatcher.register(this.dispatcher);
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
        this.setState({ 
          task: { title: '', description: '' },
          buttonText: 'Create Task'
        });
        break;
    }
    return true;
  },

  handleChange: function(e, id) {
    var form = this.getDOMNode();
    this.setState({
      task: {
        title: form.title.value,
        description: form.description.value  
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
        <input type="hidden" value={task._id} />
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
        <button className="btn btn-success">{this.state.buttonText}</button>
      </form>
    );
  }

});

module.exports = TaskForm;
