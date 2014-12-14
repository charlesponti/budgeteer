'use strict';

// Module dependencies
var React = require('react');

// Application dependencies
var AppActions = require('../../actions/app');

// Factories
var Preview = require('./Preview.jsx');

/**
 * Task Component
 * @type {ReactElement}
 */
var TaskListItem = React.createClass({

  propTypes: {
    task: React.PropTypes.object.isRequired
  },

  /**
   * Handle checkbox click
   * @param  {SyntheticEvent} e
   * @param  {string} id HTMLElement id
   */
  onCheckboxClick: function() {
    // Negate 'completed' attribute of task
    this.props.task.completed = !this.props.task.completed;

    // Dispatch event
    AppActions.updateTask(this.props.update);
  },

  /**
   * Handle click
   * @param  {SyntheticEvent} e
   * @param  {string} id HTMLElement id
   */
  onTitleClick: function(e, id) {
    AppActions.loadModal({
      title: this.props.task.title,
      component: <Preview task={this.props.task}/>
    });
  },

  render: function() {
    var task = this.props.task;

    var categoryStyle = {
      color: task.category.color
    };

    return (
      <li className="list-group-item task-list-item">
        <div>
          <input type="checkbox" className="task-checkbox"
            onClick={this.onCheckboxClick} defaultChecked={task.completed}/>
          <h4 onClick={this.onTitleClick}>{task.title}</h4>

          <div className="task-listitem-category">
            <i className="fa fa-tag fa-4" style={categoryStyle}></i>
            {task.category.name}
          </div>
        </div>
      </li>
    );
  }

});

module.exports = TaskListItem;
