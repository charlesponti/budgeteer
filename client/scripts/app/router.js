"use strict";

var TaskMainView = require('./view/tasks/main');

var AppRouter = Backbone.Router.extend({
  
  routes: {
    'tasks': 'loadTaskApp',

    // Default - catch all
    '*actions': 'defaultAction'
  },

  loadTaskApp: function() {
    var view = new TaskMainView();
    view.render();
  }

});

module.exports = AppRouter;
