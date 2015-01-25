'use strict';

// Module dependencies
var React = require('react');
var AppActions = require('../../client/app').actions;
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
    AppActions.updateTask(this.props.task);
  },

  /**
   * Handle click
   * @param  {SyntheticEvent} e
   * @param  {string} id HTMLElement id
   */
  onTitleClick: function(e, id) {
    if (e.target.nodeName != 'INPUT') {
      var task = this.props.task;

      AppActions.loadModal({
        title: task.get('title'),
        component: <Preview task={task}></Preview>
      });
    }
  },

  render: function() {
    var task = this.props.task;
    var category = task.get('category');

    var categoryStyle = {
      color: category.color
    };

    return (
      <li className="list-item" key={task.get('_id')}>
        <div className="task-title" onClick={this.onTitleClick}>
          <input type="checkbox"
            className="task-checkbox"
            onClick={this.onCheckboxClick}
            defaultChecked={task.get('completed')}/>
            {task.get('title')}
        </div>
        <div className="tag" style={categoryStyle}>
          {category.name}
        </div>
      </li>
    );
  }

});

module.exports = TaskListItem;
