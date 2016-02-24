import angular from 'angular'
import uirouter from 'angular-ui-router'
import transactionListItem from './transaction-list-item'
import template from './transactions.html'

export default (
  angular
    .module('transactions', [uirouter])
    .component('transactionListItem', transactionListItem)
    .component('transactions', {
      restrict: 'E',
      template,
      controller: ['Transaction', function (Transaction) {
        this.transactions = Transaction.query()
      }]
    })
    .component('transactionForm', {
      restirct: 'E',
      template: require('./transaction-form.html'),
      controller: ['Transaction', '$state', function (Transaction, $state) {
        this.onSubmit = function () {
          Transaction.save(this.record, (data) => {
            $state.go('transactions')
          })
        }
      }]
    })
    .factory('Transaction', ['$resource', function ($resource) {
      return $resource('/transactions', {}, {})
    }])
    .config(['$stateProvider', function ($stateProvider) {
      $stateProvider
        .state('transactions', {
          url: '/transactions',
          template: '<transactions></transactions>'
        })
        .state('new-transaction', {
          url: '/transactions/new',
          template: '<transaction-form></transaction-form>'
        })
    }])
)
