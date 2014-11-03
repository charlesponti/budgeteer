'use strict';

var React = require('react');
var marked = require('marked');

var TaskActions = require('../../actions/TaskActions');
var TaskForm = React.createFactory(require('./Form.jsx'));

/**
 * Preview component
 * @type {ReactCompositeComponent}
 */
var Preview = React.createClass({

  propTypes: {
    text: React.PropTypes.string.isRequired
  },

  onEditClick: function(e, id) {
    TaskActions.loadTaskForm({
      title: 'Edit Task',
      data: this.props.task,
      component: <TaskForm task={this.props.task}/>
    });
  },

  onDeleteClick: function(e, id) {
    TaskActions.deleteTask(this.props.task);
  },

  /**
   * @returns {ReactCompositeComponent}
   */
  render: function() {
    var rawMarkup = marked(this.props.task.description);
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
