'use strict';

var Backbone = require('backbone');

var WeightModel = Backbone.Model.extend({

  url: '/api/weight',

  getDate: function() {
    return new Date(this.get('date'));
  }

});

module.exports = WeightModel;
