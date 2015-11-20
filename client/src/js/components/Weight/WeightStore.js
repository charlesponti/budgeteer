var _ = require('lodash');
var App = require('../app');
var BaseStore = require('../../Store');
var AppDispatcher = require('../../app/dispatcher');

class WeightModel {

  constructor(props) {
    this.id = props.id;
    this.kgs = props.kgs;
    this.lbs = props.lbs;
    this.created = (new Date(props.created)).getTime();
  }

  getDate() {
    return new Date(this.created);
  }

}

var WeightStore = _.extend({

  url: '/api/weight',

  Model: WeightModel,

  storeName: 'weight',

  /**
   * Get dates of weights
   * @return {Date[]}
   */
  getDates: function() {
    return this.records.map(function(weight) {
      return (new Date(weight.get('date'))).toDateString();
    });
  },

  /**
   * Get `kgs` or `lbs` of weights
   * @param {string} measurement Measurement to retrieve
   * @return {Number[]}
   */
   getWeights: function(measurement) {
     return this.records.map(function(weight) {
       return weight.get(measurement || 'kgs');
     });
   }

}, BaseStore);

WeightStore.dispatcherIndex = function(payload) {
  switch(payload.action) {
    case constants.WEIGHT_CREATE:
      WeightStore.add(payload.data);
      WeightStore.emitChange();
      break;
    case constants.WEIGHT_REMOVE:
      WeightStore.remove(payload.data);
      WeightStore.emitChange();
      break;
  }
};

WeightStore.dispatcherToken = AppDispatcher.register(WeightStore.dispatcherIndex);

export default WeightStore;
