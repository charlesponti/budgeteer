import angular from 'angular'
import uirouter from 'angular-ui-router'

export default (
  angular
    .module('transactions', [uirouter])
    .component('transactionListItem', {
      restrict: 'E',
      bindings: { transaction: '=' },
      template: require('./transaction-list-item.html'),
      controller: ['Transaction', '$state', function (Transaction, $state) {
        this.edit = function () {
          $state.go('new-transaction', { record: this.transaction })
        }

        this.remove = function () {
          Transaction.delete(this.transaction, () => $state.reload())
        }
      }]
    })
    .component('transactions', {
      restrict: 'E',
      template: require('./transactions.html'),
      controller: ['Transaction', function (Transaction) {
        this.transactions = Transaction.query()
      }]
    })
    .component('transactionForm', {
      restirct: 'E',
      template: require('./transaction-form.html'),
      controller: ['Transaction', '$state', '$stateParams', function (Transaction, $state, $stateParams) {
        if (angular.isObject($stateParams.record)) {
          this.record = $stateParams.record
        } else {
          this.record = {}
        }

        this.onSubmit = function () {
          Transaction.save(this.record, (data) => {
            $state.go('transactions')
          })
        }
      }]
    })
    .factory('Transaction', ['$resource', function ($resource) {
      return $resource('/transactions', {}, {
        post: {
          transformRequest: function(record) {
            record.amount = parseFloat(record.amount);
            return record;
          }
        }
      })
    }])
    .config(['$stateProvider', function ($stateProvider) {
      $stateProvider
        .state('transactions', {
          url: '/transactions',
          template: '<transactions></transactions>'
        })
        .state('new-transaction', {
          url: '/transactions/new',
          template: '<transaction-form></transaction-form>',
          params: {
            record: null
          }
        })
    }])
)
