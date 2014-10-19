"use strict";

var React = require('react');
var TaskApp = require('./components/tasks/App.jsx');

var AppRouter = Backbone.Router.extend({
  
  routes: {
    'tasks': 'loadTaskApp',

    // Default - catch all
    '*actions': 'defaultAction'
  },

  loadTaskApp: function() {  
    React.renderComponent(<TaskApp />, $('#app').get(0));
  }

});

module.exports = AppRouter;
