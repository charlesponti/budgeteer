import angular from 'angular'
import uirouter from 'angular-ui-router'
import transactionFormController from './transaction-form'

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
      controller: transactionFormController
    })
    .factory('Transaction', ['$resource', function ($resource) {
      const Transaction = $resource('/transactions', null, {
        query: {
          isArray: true,
          transformResponse: (data) => {
            return angular.fromJson(data).map((item) => {
              item.date = new Date(item.date)
              return new Transaction(item)
            })
          }
        },
        update: {
          method: 'PUT'
        }
      })

      Transaction.prototype.getAmount = function () {
        return this.amount
      }

      Transaction.prototype.format = function () {
        this.amount = parseFloat(this.amount)
        return this
      }

      return Transaction
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
