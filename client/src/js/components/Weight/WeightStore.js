import _ from 'lodash';
import BaseStore from '../../Store';
import constants from '../../app/constants';
import dispatcher from '../../app/dispatcher';

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

const WeightStore = _.extend({
  url: '/api/weight',

  Model: WeightModel,

  storeName: 'weight',

  /**
   * Get dates of weights
   * @return {Date[]}
   */
  getDates() {
    return this.records.map((weight) => {
      return (new Date(weight.get('date'))).toDateString();
    });
  },

  /**
   * Get `kgs` or `lbs` of weights
   * @param {string} measurement Measurement to retrieve
   * @return {Number[]}
   */
   getWeights(measurement) {
     return this.records.map((weight) => {
       return weight.get(measurement || 'kgs');
     });
   }
}, BaseStore);

WeightStore.dispatcherIndex = (payload) => {
  switch (payload.action) {
    case constants.WEIGHT_CREATE:
      WeightStore.add(payload.data);
      WeightStore.emitChange();
      break;
    case constants.WEIGHT_REMOVE:
      WeightStore.remove(payload.data);
      WeightStore.emitChange();
      break;
    default:
      break;
  }
};

WeightStore.dispatcherToken = dispatcher.register(WeightStore.dispatcherIndex);

export default WeightStore;
