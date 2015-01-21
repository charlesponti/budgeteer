'use strict';

// Module dependencies
var React = require('react');

var TaskStore = require('../../stores/tasks');

// Components
var TaskList = require('./list.jsx');
var TaskAddButton = require('./add-button.jsx');
var CategoryMain = require('../category/Main.jsx');

var TaskApp = React.createClass({

  /**
   * Get initial state of tab panel
   * @return {object}
   */
  getInitialState: function() {
    return {
      tasks: this.props.tasks || [],
      categories: this.props.categories || []
    };
  },

  /**
  * Set state to current state of TaskStore.models
  * @param {Backbone.Collection} store
  * @param {Object} response Response from API
  */
  onTaskStoreChange: function(store, response) {
    if (this.isMounted()) {
      return this.setState({
        tasks: store.models
      });
    }
  },

  /**
   * Load TaskStore
   */
  componentWillMount: function() {
    TaskStore.on('set reset sync', this.onTaskStoreChange);
    if (!this.state.tasks.length) {
      return TaskStore.fetch();
    }
    return this;
  },

  render: function() {
    return (
      <div className="tab-panel">
        <ul className="tab-list">
          <li className="active" role="presentation" key='tasks'>
            <a role="tab" data-toggle="tab" href="#tasks">Tasks</a>
          </li>
          <li role="presentation" key='categories'>
            <a role="tab" data-toggle="tab" href="#categories">Categories</a>
          </li>
        </ul>
        <div className="tab-content">
          <div className="tab-pane" id="tasks">
            <h2> Tasks </h2>
            <TaskAddButton/>
            <TaskList className="task-list" id='task-list' tasks={this.state.tasks}/>
          </div>
          <div className="tab-pane" id="categories">
            <h2> Categories </h2>
            <CategoryMain categories={this.state.categories}/>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = TaskApp;
