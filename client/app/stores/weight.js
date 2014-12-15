'use strict';

var Backbone = require('backbone');

var AppConstants = require('../constants/app');
var AppDispatcher = require('../dispatchers/app');

var WeightStore = new (Backbone.Collection.extend({

  url: '/api/weight',

  model: Backbone.Model.extend({
    url: '/api/weight'
  }),

  /**
   * Parse response from server
   * @param  {object} response
   * @return {array}
   */
  parse: function(response) {
    return response.data;
  },

  sync: function() {
    this.each(function(weight) {
      weight.save();
    });
  }

}))();


WeightStore.dispatcherIndex = function(payload) {

  switch(payload.action) {
    case AppConstants.WEIGHT_CREATE:
      WeightStore.add(payload.data);
      WeightStore.sync();
  }
};

WeightStore.dispatcherToken = AppDispatcher.register(WeightStore.dispatcherIndex);

module.exports = WeightStore;
