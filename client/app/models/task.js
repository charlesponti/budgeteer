'use strict';

var Backbone = require('backbone');

var TaskModel = Backbone.Model.extend({

  url: '/api/task'

});

module.exports = TaskModel;
