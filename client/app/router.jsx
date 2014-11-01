'use strict';

var React = require('react');
var Tasks = require('./components/tasks/Main.jsx');
var Account = require('./components/account/Main.jsx');

var AppRouter = Backbone.Router.extend({

  routes: {
    'tasks': 'tasks',
    'account': 'account'
  },

  tasks: function() {
    React.render(<Tasks/>, document.getElementById('app'));
  },

  account: function() {
    React.render(<Account/>, document.getElementById('app'));
  }

});

module.exports = {
  start: function() {
    new AppRouter();
    Backbone.history.start({ pushState: true });
  }
};
