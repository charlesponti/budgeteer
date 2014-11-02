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
    return { tasks: this.props.tasks };
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
    TaskStore.on('change', this.onTaskStoreChange);
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
    var records = TaskStore.getRecords();

    if (completedRegex.test(searchTerm)) {
      isTerm = completedRegex.exec(searchTerm)[0];
      completedTerm = isTerm.trim().replace('is:','');
      if (completedTerm == 'done') {
        records = records.filter(function(task) { 
          return task.completed == true;
        });
      }
      if (completedTerm == 'notdone') {
        records = records.filter(function(task) { 
          return task.completed == false;
        });
      }
      searchTerm = searchTerm.replace(isTerm, '');
    }

    if (categoryRegex.test(searchTerm)) {
      category = categoryRegex.exec(searchTerm)[0];
      categoryTerm = category.trim().replace('category:','');
      records = records.filter(function(task) { 
        return (new RegExp(categoryTerm)).test(task.category);
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
   * @return {ReactCompositeComponent}
   */
  render: function() {
    var sorted = (this.state.tasks || []).sort(function(task) {
      if (task.completed) {
        return 1;
      }
      return -1;
    });
    return (
      <div>
        <form role="form" className="task-search">
          <input className="form-control task-search"
            onChange={this.onSearchFieldChange} placeholder="Search" />
        </form>
        <ul className="list-group">
          {_.map(sorted, function(task) {
            return (<TaskListItem key={task._id} task={task} />);
          })}
        </ul>
      </div>
    );
  }

});

module.exports = TaskList;
