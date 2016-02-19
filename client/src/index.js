import angular from 'angular'
import uirouter from 'angular-ui-router'
import 'angular-resource'

import navigation from './navigation.html'
import possessions from './possessions'
import weight from './weight'
import transactions from './transactions'
import itemActionButtons from './components/item-action-buttons'

// Import bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap'

import './main.less'

angular.module('backpack',
  [
    uirouter,
    possessions.name,
    weight.name,
    transactions.name
  ])
  .component('navigation', {
    restrict: 'E',
    template: navigation,
    controller: ['$scope', '$element', ($scope, $element) => {
      $element.find('.navbar-collapse a').on('click', function () {
        $element.find('.navbar-collapse').collapse('hide')
      })
    }]
  })
  .component('itemActionButtons', itemActionButtons)
  .config(['$urlRouterProvider', function ($urlRouterProvider) {
    $urlRouterProvider.otherwise('/')
  }])
