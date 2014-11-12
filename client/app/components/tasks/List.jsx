'use strict';

// Module dependencies
var _ = require('lodash');
var React = require('react');

// Application dependencies
var TaskStore = require('../../stores/TaskStore');
var AppConstants = require('../../constants/App');
var AppDispatcher = require('../../dispatchers/App');

// Components
var TaskListItem = React.createFactory(require('./ListItem.jsx'));

/**
 * TaskList component
 * @type {ReactElement}
 */
var TaskList = React.createClass({

  displayName: 'TaskList',

  /**
   * Get initial state of component
   * @return {object}
   */
  getInitialState: function() {
    return { tasks: undefined };
  },

  /**
   * Handle change of TaskStore
   * @param {array} tasks Array of tasks
   */
  onTaskStoreChange: function(tasks) {
    if (this.isMounted()) {
      this.setState({ tasks: tasks });
    }
  },

  /**
   * Handle logic when component will be mounted to the DOM
   */
  componentWillMount: function() {
    TaskStore.addChangeListener(this.onTaskStoreChange);
  },

  /**
   * Handle logic when component will be unmounted from the DOM
   */
  componentWillUnmount: function() {
    TaskStore.removeChangeListener(this.onTaskStoreChange);
  },

  /**
   * Filter tasks by search term
   * @param  {SyntheticEvent} e 
   * @param  {string} id
   */
  onSearchFieldChange: function(e, id) {
    var isTerm, completedTerm, categoryTerm, category;
    var searchTerm = e.target.value;
    var completedRegex = /is:\w+\s/;
    var categoryRegex = /category:\w+\s/;
    // Clone tasks
    var records = TaskStore.getRecords().slice(0);

    if (completedRegex.test(searchTerm)) {
      isTerm = completedRegex.exec(searchTerm)[0];
      completedTerm = isTerm.trim().replace('is:','');
      records = records.filter(function(task) { 
        switch(completedTerm) {
          case 'done':
            return task.completed === true;
          case 'notdone':
            return task.completed === false;
        }
      });
      searchTerm = searchTerm.replace(isTerm, '');
    }

    if (categoryRegex.test(searchTerm)) {
      category = categoryRegex.exec(searchTerm)[0];
      categoryTerm = category.trim().replace('category:','');
      records = records.filter(function(task) { 
        return (new RegExp(categoryTerm, 'i')).test(task.category.name);
      });
      searchTerm = searchTerm.replace(category, '');
    }

    if (searchTerm.length) {
      searchTerm = searchTerm.replace(' ', '');
      var regExp = new RegExp(searchTerm, 'i');
      records = records.filter(function(task) { 
        return regExp.test(task.title);
      });
    }

    this.setState({ tasks: records });
  },

  /**
   * Render component
   * @return {ReactElement}
   */
  render: function() {
    var sorted = (this.state.tasks || []).sort(function(task) {
      return task.completed ? 1: -1;
    });
    return (
      <div>
        <form role="form" className="task-search">
          <input className="form-control task-search"
            onChange={this.onSearchFieldChange} placeholder="Search" />
        </form>
        <ul className="list-group">
          {_.map(sorted, function(task) {
            return (<TaskListItem task={task} />);
          })}
        </ul>
      </div>
    );
  }

});

module.exports = TaskList;
