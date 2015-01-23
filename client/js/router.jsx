'use strict';

var App = require('./app');
var AppDispatcher = App.dispatcher;

App.getEl();

var Account = require('_/common/components/account/main.jsx');
var Backbone = require('backbone');
var React = require('react');
var TaskApp = require('_/common/components/task/main.jsx');
var Weight = require('_/common/components/weight/main.jsx');

var Router = Backbone.Router.extend({

  routes: {
    'account': 'account',
    'weight': 'weight',
    'tasks': 'tasks',
    '*default': 'tasks'
  },

  // Render Tasks application
  tasks: function() {
    var data = {
      tasks: App.initialData.tasks,
      categories: App.initialData.categories
    }
    return React.render(<TaskApp initialData={data}/>, App.el);
  },

  // Render Weight application
  weight: function() {
    var data = App.initialData.weights;
    return React.render(<Weight initialData={data} />, App.el);
  },

  // Render Account application
  account: function() {
    var data = App.initialData.user;
    return React.render(<Account initialData={data} />, App.el);
  },

  dispatcherIndex: function(payload) {
    if (payload.navigate) {
      this.navigate(payload.navigate, true);
    }
  }

});

AppRouter = new Router();

AppDispatcher.register(AppRouter.dispatcherIndex.bind(AppRouter));

Backbone.history.start({ pushState: true });
