const angular = require('angular')
const uirouter = require('angular-ui-router')
require('angular-resource')

const navigation = require('./site-navigation.html')
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
    template: navigation
  })
  .component('itemActionButtons', itemActionButtons)
  .config(['$urlRouterProvider', function ($urlRouterProvider) {
    $urlRouterProvider.otherwise('/')
  }])
