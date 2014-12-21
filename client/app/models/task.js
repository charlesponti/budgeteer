'use strict';

var Backbone = require('backbone');

var TaskModel = Backbone.Model.extend({

  url: '/api/task',

  idAttribute: '_id'

});

module.exports = TaskModel;
