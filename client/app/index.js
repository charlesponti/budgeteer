'use strict';

var User = require('../models/user');

var App = {

  authenticated: false,

  initialData: {},

  init: function() {
    var dataNode = document.getElementById('initial-data');
    var userNode = document.getElementById('initial-user');

    var userData = userNode.textContent && JSON.parse(userNode.textContent);
    this.initialData = dataNode.textContent && JSON.parse(dataNode.textContent);

    if (userData) {
      this.user = new User(userData);
      this.authenticated = true;
    }

    this.el = document.getElementById('app');

    // Remove data nodes
    userNode.remove();
    dataNode.remove();

    return this;
  },

  actions: require('./actions'),

  constants: require('./constants'),

  dispatcher: require('./dispatcher')

};

module.exports = App;
