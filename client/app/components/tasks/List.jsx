'use strict';

var _ = require('lodash');
var React = require('react');

var TaskListItem = require('./ListItem.jsx');
var TaskStore = require('../../stores/TaskStore');
var TaskConstants = require('../../constants/TaskConstants');
var TaskDispatcher = require('../../dispatchers/TaskDispatcher');

/**
 * TaskList component
 * @type {ReactCompositeComponent}
 */
var TaskList = React.createClass({

  displayName: 'TaskList',

  getInitialState: function() {
    return { tasks: this.props.tasks };
  },

  dispatcher: function(payload) {
    if (this.isMounted()) {
      switch(payload.action) {
        case TaskConstants.LOADED:
        case TaskConstants.CREATED:
        case TaskConstants.UPDATED:
          this.setState({ tasks: payload.data });
          break;
      }
    }
  },

  /**
   * Handle logic when component will be mounted to the DOM
   */
  componentWillMount: function() {
    TaskDispatcher.register(this.dispatcher);
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
          <input className="form-control"
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
