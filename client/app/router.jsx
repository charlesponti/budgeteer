'use strict';

// Module dependencies
var React = require('react');
var Backbone = require('backbone');

// Application dependencies
var AppDispatcher = require('./dispatchers/App');

// Components
var Tasks = React.createFactory(require('./components/TaskApp.jsx'));
var Account = React.createFactory(require('./components/account/Main.jsx'));

var Router = Backbone.Router.extend({

  routes: {
    'account': 'account',
    '*default': 'tasks'
  },

  /**
   * Render Tasks application
   */
  tasks: function() {
    React.render(<Tasks/>, document.getElementById('app'));
  },

  /**
   * Render Account application
   */
  account: function() {
    React.render(<Account/>, document.getElementById('app'));
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
