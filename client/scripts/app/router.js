"use strict";

var React = require('react');
var TasksStore = require('./stores/tasks-store');

var AppRouter = Backbone.Router.extend({
  
  routes: {
    'tasks': 'loadTaskApp',

    // Default - catch all
    '*actions': 'defaultAction'
  },

  loadTaskApp: function() {
    TasksStore.load();
    var TaskMainView = require('./view/tasks/main.jsx');
    React.renderComponent(new TaskMainView(), $('#app').get(0));
  }

});

module.exports = AppRouter;
