import angular from 'angular'
import uirouter from 'angular-ui-router'

export default (
  angular
    .module('transactions', [uirouter])
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
