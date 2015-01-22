'use strict';

var Account = require('./components/account/Main.jsx');
var AppDispatcher = require('./app-dispatcher');
var Backbone = require('backbone');
var initialData = require('./initial-data');
var React = require('react');
var TaskApp = require('./components/task/main.jsx');
var Weight = require('./components/weight/main.jsx');

// #app element
var appEl = document.getElementById('app');

var Router = Backbone.Router.extend({

  routes: {
    'account': 'account',
    'weight': 'weight',
    'tasks': 'tasks',
    '*default': 'home'
  },

  home: function() {
    return;
  },

  // Render Tasks application
  tasks: function() {
    var data = {
      tasks: initialData.tasks,
      categories: initialData.categories
    }
    return React.render(<TaskApp initialData={data}/>, appEl);
  },

  // Render Weight application
  weight: function() {
    return React.render(<Weight initialData={initialData.weights} />, appEl);
  },

  // Render Account application
  account: function() {
    return React.render(<Account initialData={initialData.users} />, appEl);
  },

  dispatcherIndex: function(payload) {
    if (payload.navigate) {
      this.navigate(payload.navigate, true);
    }
  }

});

var App = new Router();

AppDispatcher.register(App.dispatcherIndex.bind(App));

Backbone.history.start({ pushState: true });
