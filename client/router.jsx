'use strict';

var App = require('./app');
var AppDispatcher = App.dispatcher;

App.getUser();
App.getEl();

var Account = require('../components/account/main.jsx');
var Backbone = require('backbone');
var React = require('react');
var TaskApp = require('../components/task/main.jsx');
var Weight = require('../components/weight/main.jsx');

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
    if (App.user) {
      return React.render(<TaskApp />, App.el);
    }
    this.navigate('/')
  },

  // Render Weight application
  weight: function() {
    if (App.user) {
      return React.render(<Weight />, App.el);
    }
    this.navigate('/');
  },

  // Render Account application
  account: function() {
    if (App.user) {
      return React.render(<Account />, App.el);
    }
    this.navigate('/');
  },

  dispatcherIndex: function(payload) {
    if (payload.navigate) {
      this.navigate(payload.navigate, true);
    }
  }

});

var AppRouter = new Router();

AppDispatcher.register(AppRouter.dispatcherIndex.bind(AppRouter));

Backbone.history.start({ pushState: true });
