import template from './transaction-list-item.html'

export default {
  restrict: 'E',
  bindings: { transaction: '=' },
  template,
  controller: ['Transaction', '$state', function (Transaction, $state) {
    this.edit = function () {
      Transaction.update(this.transaction, () => $state.refresh())
    }

    this.remove = function () {
      Transaction.delete(this.transaction, () => $state.refresh())
    }
  }]
}
