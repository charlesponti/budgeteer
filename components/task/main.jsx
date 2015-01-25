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
  * @param {Backbone.Model} model
  * @param {Object} response Response from API
  */
  onTaskStoreChange: function(model, response) {
    if (this.isMounted()) {
      return this.setState({
        tasks: TaskStore.models
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
      <div className="tasks" id="tasks">
        <h2> Tasks </h2>
        <TaskList tasks={this.state.tasks}/>
        <TaskAddButton/>
      </div>
    );
  }

});

module.exports = TaskApp;
