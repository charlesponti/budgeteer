const angular = require('angular')
const uirouter = require('angular-ui-router')
require('angular-resource')

const navigation  = require('./site-navigation.html')
const costPerDay = require('./components/CostPerDay')
const weights = require('./components/Weight')
const itemActionButtons = require('./components/item-action-buttons')

// Import bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';

import './main.less';

angular.module('backpack',
  [
    uirouter,
    costPerDay.name,
    weights.name
  ])
  .component('navigation', {
    restrict: 'E',
    template: navigation
  })
  .component('itemActionButtons', itemActionButtons)
  .config(['$urlRouterProvider', function($urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
  }]);
