'use strict';

var App = {

  getEl: function() {
    this.el = document.getElementById('app');
    return this;
  },

  initialData: function getInitialData() {
    var node = $('#initial-data');

    // Parse initial data
    this.initialData = node.html() && JSON.parse(node.html());

    // Empty #initial-data
    node.html('');

    return this;
  },

  actions: require('./actions'),

  constants: require('./constants'),

  dispatcher: require('./dispatcher')

};

module.exports = App;
