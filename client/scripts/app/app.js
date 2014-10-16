"use strict";

var AppModel = Backbone.Model.extend({

  collections: {},

  views: {},

  models: {},

  currentView: null,

  /**
   * Add templates module
   * @type {exports}
   */
  templates: require('./templates'),

  /**
   * Add API Service
   * @type {exports}
   */
  API: require("./service/api"),
  
  start: function() {
    var AppRouter = require("./router");

    this.Router = new AppRouter();

    Backbone.history.start({
      pushState: true
    });
  }

});

module.exports = AppModel;
