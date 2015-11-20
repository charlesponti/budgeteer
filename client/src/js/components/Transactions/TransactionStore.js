import {constants, dispatcher} from '../../app';
import Store from '../../Store.js';

function Transaction(transaction) {
  this.id = transaction.id;
  this.description = transaction.description;
  this.category = transaction.category;
  this.amount = parseFloat(transaction.amount);
  this.amountToString = function() {
    return `${this.amount.toFixed(2)}`
  };
}

var TransactionStore = _.extend({
  storeName: 'transactions',
  Model: Transaction
}, Store);

dispatcher.register((payload) => {
  switch (payload.action) {
    case constants.TRANSACTIONS_CREATE:
      TransactionStore.add(payload.data);
      TransactionStore.emitChange();
      break;
    case constants.TRANSACTIONS_REMOVE:
      TransactionStore.remove(payload.data);
      TransactionStore.emitChange();
      break;
  }
});

export default TransactionStore;
