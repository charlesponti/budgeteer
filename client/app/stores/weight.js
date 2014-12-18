'use strict';

var Backbone = require('backbone');

var AppConstants = require('../constants/app');
var AppDispatcher = require('../dispatchers/app');

var WeightModel = Backbone.Model.extend({
  url: '/api/weight'
});

var WeightStore = Backbone.Collection.extend({

  url: '/api/weight',

  model: WeightModel,

  /**
   * Parse response from server
   * @param  {object} response
   * @return {array}
   */
  parse: function(response) {
    return response.data;
  },

  save: function() {
    this.each(function(weight) {
      weight.save();
    });
  },

  /**
   * Get dates of weights
   * @return {Date[]}
   */
  getDates: function() {
    return this.models.map(function(weight) {
      return (new Date(weight.get('date'))).toDateString();
    });
  },

  /**
   * Get kilograms of weights
   * @return {Number[]}
   */
  getWeights: function() {
    return this.models.map(function(weight) {
      return weight.get('kilograms');
    });
  }

});

WeightStore = new WeightStore();

WeightStore.dispatcherIndex = function(payload) {
  switch(payload.action) {
    case AppConstants.WEIGHT_CREATE:
      WeightStore.add(payload.data);
      WeightStore.save();
  }
};

WeightStore.dispatcherToken = AppDispatcher.register(WeightStore.dispatcherIndex);

module.exports = WeightStore;
