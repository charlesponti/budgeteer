'use strict';

var React = require('react');
var TaskConstants = require('../../constants/TaskConstants');
var TaskDispatcher = require('../../dispatchers/TaskDispatcher');

var TaskForm = React.createClass({

  /**
   * Get initial state of component
   */
  getInitialState: function() {
    return { _id: '', title: '', description: '' };
  },

  /**
   * Handle form submission
   * @param  {SyntheticEvent} e Event object
   * @param  {String} id Id of form
   */
  onSubmit: function(e, id) {
    e.preventDefault();
    var event = this.state._id.length ? 'UPDATE' : 'CREATE';
    TaskDispatcher.dispatch({
      action: TaskConstants[event],
      data: this.state
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
      case TaskConstants.CREATED:
        this.setState({ title: '', description: '' });
        break;
      case TaskConstants.EDIT:
        this.setState(payload.data);
        break;
      case TaskConstants.UPDATED:
        this.setState({ title: '', description: '' });
        break;
    }
    return true;
  },

  handleChange: function(e, id) {
    var form = this.getDOMNode();
    this.setState({
      title: form.title.value,
      description: form.description.value,
    });
  },

  /**
   * Render component
   */
  render: function() {
    return (
      <form onSubmit={this.onSubmit} role="form">
        <input type="hidden" value={this.state._id} />
        <div className="form-group">
          <label htmlFor="title"> Title </label>
          <input className="form-control"
            name="title" onChange={this.handleChange} value={this.state.title}/>
        </div>
        <div className="form-group">
          <label htmlFor="title"> Description </label>
          <textarea className="form-control"
            name="description"
            onChange={this.handleChange}
            value={this.state.description} />
        </div>
        <button className="btn btn-success">Create Task</button>
      </form>
    );
  }

});

module.exports = TaskForm;
