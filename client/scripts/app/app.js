"use strict";

var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');

var App = merge(EventEmitter.prototype, {

  API: require("./service/api"),

  getCSRF: function() {
    return $('#csrf').data('value');
  },

start: function() {
    var Router = require("./router.jsx");

    this.Router = new Router();

    Backbone.history.start({
      pushState: true
    });
  }

});

module.exports = App;
