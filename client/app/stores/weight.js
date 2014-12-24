'use strict';

var Backbone = require('backbone');

var AppActions = require('../actions/app');
var AppConstants = require('../constants/app');
var AppDispatcher = require('../dispatchers/app');

var WeightStore = Backbone.Collection.extend({

  url: '/api/weight',

  model: require('../models/weight'),

  /**
   * Parse response from server
   * @param  {object} response
   * @return {array}
   */
  parse: function(response) {
    return response.data;
  },

  save: function() {
    var promises = [];
    this.each(function(weight) {
      if (!weight.get('_id')) {
        promises.push(weight.save());
      }
    });
  },

  create: function(weight) {
    weight = new this.model(weight);
    weight.save().then(function(res) {
      this.add(res.weight);
      AppActions.closeModal();
    }.bind(this));
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
   * Get `kgs` or `lbs` of weights
   * @param {string} measurement Measurement to retrieve
   * @return {Number[]}
   */
   getWeights: function(measurement) {
     return this.models.map(function(weight) {
       return weight.get(measurement || 'kgs');
     });
   }

});

WeightStore = new WeightStore();

WeightStore.dispatcherIndex = function(payload) {
  switch(payload.action) {
    case AppConstants.WEIGHT_CREATE:
      WeightStore.create(payload.data);
  }
};

WeightStore.dispatcherToken = AppDispatcher.register(WeightStore.dispatcherIndex);

module.exports = WeightStore;
