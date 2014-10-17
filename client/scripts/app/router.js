"use strict";

var React = window.React;

var AppRouter = Backbone.Router.extend({
  
  routes: {
    'tasks': 'loadTaskApp',

    // Default - catch all
    '*actions': 'defaultAction'
  },

  loadTaskApp: function() {
    var TaskForm = require('./view/tasks/form.jsx');
    var TaskList = require('./view/tasks/list.jsx');
    var TaskMainView = require('./view/tasks/main.jsx');
    React.renderComponent(new TaskMainView(), $('#app').get(0));
    React.renderComponent(new TaskList(), $('#task-list').get(0));
    React.renderComponent(new TaskForm(), $('#task-form').get(0));
  }

});

module.exports = AppRouter;
