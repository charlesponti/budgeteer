'use strict';

var App = {

  getEl: function() {
    this.el = document.getElementById('app');
    return this;
  },

  getUser: function() {
    var node = document.getElementById('initial-user');

    // Parse node content
    this.user = node.textContent && JSON.parse(node.textContent);

    // Remove node
    node.remove();

    return this;
  },

  getInitialData: function getInitialData() {
    var node = document.getElementById('initial-data');

    // Parse node content
    this.initialData = node.textContent && JSON.parse(node.textContent);

    // Empty #initial-data
    node.remove();

    return this;
  },

  actions: require('./actions'),

  constants: require('./constants'),

  dispatcher: require('./dispatcher')

};

module.exports = App;
