'use strict';

/**
 * Main view for the Tasks application
 * @type {Backbone.View}
 */
var TaskMainView = Backbone.View.extend({

  tagName: 'div',

  id: 'task-app',

  className: 'tasks',

  template: _.template(App.templates.tasks.list),

  initialize: function() {
    this.render();
  },

  render: function() {
    $('#app').html(this.$el.html(this.template()));
  }

});

module.exports = TaskMainView;
