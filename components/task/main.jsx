'use strict';

var CategoryMain = require('../category/main.jsx');
var CategoryStore = require('../../client/stores/categories');
var React = require('react');
var TaskList = require('./list.jsx');
var TaskStore = require('../../client/stores/tasks');
var TaskAddButton = require('./add-button.jsx');

var TaskApp = React.createClass({

  propTypes: {
    initialData: React.PropTypes.object
  },

  /**
   * Get initial state of tab panel
   * @return {object}
   */
  getInitialState: function() {
    var initialData = this.props.initialData || {};

    return {
      tasks: initialData.tasks || TaskStore.models,
      categories: initialData.categories || CategoryStore.models
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
            <a href="#tasks">Tasks</a>
          </li>
          <li role="presentation" key='categories'>
            <a href="#categories">Categories</a>
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
            <CategoryMain categories={this.state.categories} />
          </div>
        </div>
      </div>
    );
  }

});

module.exports = TaskApp;
