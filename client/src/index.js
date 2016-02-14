import angular from 'angular';
import uirouter from 'angular-ui-router';
import 'angular-resource';

//import routes from './app/routes';
import navigation from './site-navigation.html';
import costPerDay from './components/CostPerDay';
import itemActionButtons from './item-action-buttons';

// Import bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';

import './main.less';

angular.module('backpack', [uirouter, costPerDay.name])
  .component('navigation', {
    restrict: 'E',
    template: navigation
  })
  .component('itemActionButtons', itemActionButtons)
  .config(['$urlRouterProvider', function($urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
  }]);
