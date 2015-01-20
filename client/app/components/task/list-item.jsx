'use strict';

// Module dependencies
var React = require('react');

// Application dependencies
var AppActions = require('../../actions/app');

// Factories
var Preview = require('./preview.jsx');

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
    var task = this.props.task;

    task.set('completed', !task.get('completed'));

    // Dispatch event
    AppActions.updateTask(this.props.update);
  },

  /**
   * Handle click
   * @param  {SyntheticEvent} e
   * @param  {string} id HTMLElement id
   */
  onTitleClick: function(e, id) {
    var task = this.props.task;

    AppActions.loadModal({
      title: task.get('title'),
      component: <Preview task={task}/>
    });
  },

  render: function() {
    var task = this.props.task;
    var category = task.get('category');

    var categoryStyle = {
      color: category.color
    };

    return (
      <li className="list-group-item task-list-item" key={task.get('_id')}>
        <div>
          <input type="checkbox" className="task-checkbox"
            onClick={this.onCheckboxClick} defaultChecked={task.get('completed')}/>

          <h4 onClick={this.onTitleClick}>{task.get('title')}</h4>
        </div>
          <i className="fa fa-tag fa-4" style={categoryStyle}></i>
          {category.name}
      </li>
    );
  }

});

module.exports = TaskListItem;