import _ from 'lodash';
import Store from '../../Store.js';
import {constants, dispatcher} from '../../app';

function CostPerDayItem(props) {

  // Convert price to float if string
  if (typeof props.price === 'string') {
    props.price = parseFloat(props.price, 100);
  }

  // Calculate cost per day if not calculated yet
  if (!props.costPerDay) {
    if (props.type === 'monthly') {
      props.costPerDay = ((props.price * 12) / 365).toPrecision(2);
    }
    else if (props.type === 'yearly') {
      props.costPerDay = (props.price / 365).toPrecision(2);
    }
  }

  this.id = props.id;
  this.name = props.name;
  this.price = props.price;
  this.type = props.type;
  this.costPerDay = props.costPerDay;
}

var CostPerDayStore = _.extend({
  storeName: 'costPerDay',
  Model: CostPerDayItem
}, Store);

dispatcher.register((payload) => {
  switch (payload.action) {
    case constants.COSTPERDAY_CREATE:
      CostPerDayStore.add(payload.data);
      CostPerDayStore.emitChange();
      break;
    case constants.COSTPERDAY_REMOVE:
      CostPerDayStore.remove(payload.data);
      CostPerDayStore.emitChange();
      break;
  }
});

export default CostPerDayStore;
