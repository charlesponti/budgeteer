'use strict';

// Module dependencies
var React = require('react');
var marked = require('marked');

// Application dependencies
var AppActions = require('../../actions/app');
var TaskForm = require('./Form.jsx');

/**
 * Preview component
 * @type {ReactCompositeComponent}
 */
var Preview = React.createClass({

  propTypes: {
    task: React.PropTypes.object.isRequired
  },

  /**
   * Load modal with TaskForm
   * @param  {SytheticEvent} e
   * @param  {string} id
   */
  onEditClick: function(e, id) {
    AppActions.loadModal({
      title: 'Edit Task',
      component: <TaskForm task={this.props.task}/>
    });
  },

  /**
   * Dispatch delete task event
   * @param  {SynteticEvent} e
   * @param  {string} id
   */
  onDeleteClick: function(e, id) {
    AppActions.deleteTask(this.props.task);
  },

  /**
   * @returns {ReactCompositeComponent}
   */
  render: function() {
    var rawMarkup = marked(this.props.task.get('description'));
    return (
      <div>
        <div className="preview" dangerouslySetInnerHTML={{__html: rawMarkup}}/>
        <div className="pull-right">
          <button onClick={this.onEditClick} className="btn btn-default">
            Edit Task
          </button>
          <button onClick={this.onDeleteClick} className="btn btn-danger">
            Delete Task
          </button>
        </div>
      </div>
    );
  }

});

module.exports = Preview;
