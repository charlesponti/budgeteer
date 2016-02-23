import angular from 'angular'
import uirouter from 'angular-ui-router'
import transactionListItem from './transaction-list-item'

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
