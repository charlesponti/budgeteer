'use strict';

// Module dependencies
var React = require('react');
var Backbone = require('backbone');

// Application dependencies
var AppDispatcher = require('./dispatchers/app');

// Components
var Tasks = require('./components/task/main.jsx');
var Weight = require('./components/weight/main.jsx');
var Account = require('./components/account/Main.jsx');

// #app element
var appEl = document.getElementById('app');

var Router = Backbone.Router.extend({

  routes: {
    'account': 'account',
    'weight': 'weight',
    'tasks': 'tasks',
    '*default': 'tasks'
  },

  // Render Tasks application
  tasks: function() {
    React.render(<Tasks/>, appEl);
  },

  // Render Weight application
  weight: function() {
    React.render(<Weight/>, appEl);
  },

  // Render Account application
  account: function() {
    React.render(<Account/>, appEl);
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
